import { TokenService } from '../../../infrastructure/auth/';
import { CompanyService } from '../CompanyService';

function createCompanyMutationResolver(
    mutationType: string,
    tokenService: TokenService,
    companyService: CompanyService,
  ) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token, 'companies');
    const client = await companyService.db.getClient();
    if (email) {
      let query;
      try {
        await client.query('BEGIN');
        query = await client.query(
          await companyService.setIndividual(mutationType, args.setParams, args.whereParams),
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
  createCompanyMutationResolver,
};
