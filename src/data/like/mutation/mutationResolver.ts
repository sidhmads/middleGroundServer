import { TokenService } from '../../../infrastructure/auth/';
import { LikeService } from '../LikeService';

export function createLikeMutationResolver(
  mutationType: string,
  tokenService: TokenService,
  likeService: LikeService,
) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token, args.type);
    const client = await likeService.db.getClient();
    if (email) {
      let query;
      try {
        await client.query('BEGIN');
        query = await client.query(
          await likeService.setLike(
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
