import { TokenService } from '../../../infrastructure/auth/';
import { CommentService } from '../CommentService';

export function createCommentMutationResolver(
  mutationType: string,
  tokenService: TokenService,
  commentService: CommentService,
) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token, args.type);
    const client = await commentService.db.getClient();
    if (email) {
      let query;
      try {
        await client.query('BEGIN');
        query = await client.query(
          await commentService.setComment(
            mutationType,
            args.setParams,
            args.whereParams,
          ),
        );
        query = query.rows[0] || '';
        await client.query('COMMIT');
        return { code: 200, row: query };
      } catch (e) {
        await client.query('ROLLBACK');
        return { code: 400, row: '' };
      } finally {
        // Commit is placed here instead of in the try incase the return statements as errors
        await client.release();
      }
    }
  };
}
