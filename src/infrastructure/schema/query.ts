import { GraphQLObjectType } from 'graphql';
import { TokenService } from '../auth';
import { IndividualService, individualQuery, createIndividualQueryResolver } from '../../data/individual';
import { CompanyService, companyQuery, createCompanyQueryResolver } from '../../data/company';

function createQueryType() {
  return new GraphQLObjectType({
    name: 'Query',
    fields: {
      individual: individualQuery,
      company: companyQuery,
    },
  });
}

function createQueryResolver(
  tokenService: TokenService,
  individualService: IndividualService,
  companyService: CompanyService,
) {
  return {
    individual: createIndividualQueryResolver(individualService, tokenService),
    company: createCompanyQueryResolver(companyService, tokenService),
  };
}

export {
  createQueryType,
  createQueryResolver,
};
