import { GraphQLObjectType } from 'graphql';
import { TokenService } from '../auth';
import { IndividualService, individualQuery, createIndividualQueryResolver } from '../../data/individual';
import { CompanyService, companyQuery, createCompanyQueryResolver } from '../../data/company';
import { CharityService, charityQuery, createCharityQueryResolver } from '../../data/charity';

function createQueryType() {
  return new GraphQLObjectType({
    name: 'Query',
    fields: {
      individual: individualQuery,
      company: companyQuery,
      charity: charityQuery,
    },
  });
}

function createQueryResolver(
  tokenService: TokenService,
  individualService: IndividualService,
  companyService: CompanyService,
  charityService: CharityService,
) {
  return {
    individual: createIndividualQueryResolver(individualService, tokenService),
    company: createCompanyQueryResolver(companyService, tokenService),
    charity: createCharityQueryResolver(charityService, tokenService),
  };
}

export {
  createQueryType,
  createQueryResolver,
};
