import { TokenService } from '../../../infrastructure/auth/';
import { CharityService } from '../CharityService';

function createCharityMutationResolver(
    mutationType: string,
    tokenService: TokenService,
    charityService: CharityService,
  ) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token, 'charities');
    const client = await charityService.db.getClient();
    if (email) {
      let query;
      try {
        await client.query('BEGIN');
        query = await client.query(
          await charityService.setCharity(mutationType, args.setParams, args.whereParams),
        );
        query = query.rows[0] || '';
        return { code:200, row: query };
      } catch (e) {
        await client.query('ROLLBACK');
        return { code:400, row: '' };
      } finally {
        // Commit is placed here instead of in the try incase the return statements as errors
        await client.query('COMMIT');
        await client.release();
      }
    }
  };
}

export {
  createCharityMutationResolver,
};
