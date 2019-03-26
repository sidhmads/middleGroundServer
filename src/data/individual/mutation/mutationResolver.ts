import { TokenService } from '../../../infrastructure/auth/';
import { IndividualService } from '../IndividualService';

function createIndividualMutationResolver(
    mutationType: string,
    tokenService: TokenService,
    individualService: IndividualService,
  ) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token);
    const client = await individualService.db.getClient();
    if (email) {
      let query;
      try {
        await client.query('BEGIN');
        query = await client.query(
          await individualService.setIndividual(mutationType, args.setParams, args.whereParams),
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
  createIndividualMutationResolver,
};
