import {
  GraphQLString,
  GraphQLFieldConfig,
} from 'graphql';
import { CompanyService } from '../CompanyService';
import { CompanyType } from './';
import { TokenService } from '../../../infrastructure/auth';

const companyQuery: GraphQLFieldConfig<any, any> = {
  type: CompanyType,
  args: {
    token: { type: GraphQLString }
  },
};

function createCompanyQueryResolver(companyService: CompanyService, tokenService: TokenService) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token, 'companies');
    return email ? await companyService.getCompany(email) : null;
  };
}

export {
  companyQuery,
  createCompanyQueryResolver,
};
