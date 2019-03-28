import { GraphQLSchema } from 'graphql';
import { addResolveFunctionsToSchema } from 'graphql-tools';
import { TokenService } from '../auth';
import { createQueryType, createQueryResolver } from './query';
import { Mutation, createMutationResolver } from './mutation';
import { IndividualService, createIndividualQueryResolver } from '../../data/individual';
import { CompanyService, createCompanyQueryResolver } from '../../data/company';

function createSchema(
    tokenService: TokenService,
    individualService: IndividualService,
    companyService: CompanyService,
) {
  const schema = new GraphQLSchema({
    query: createQueryType(),
    mutation: Mutation,
  });

  addResolveFunctionsToSchema({
    schema,
    resolvers: {
      Query: createQueryResolver(tokenService, individualService, companyService),
      Mutation: createMutationResolver(
        tokenService, individualService, companyService),
    },
  });
  return schema;
}

export default createSchema;
