import { GraphQLSchema } from 'graphql';
import { addResolveFunctionsToSchema } from 'graphql-tools';
import { TokenService } from '../auth';
import { createQueryType, createQueryResolver } from './query';
import { Mutation, createMutationResolver } from './mutation';
import { IndividualService, createIndividualQueryResolver } from '../../data/individual';

function createSchema(
    tokenService: TokenService,
    individualService: IndividualService,
) {
  const schema = new GraphQLSchema({
    query: createQueryType(),
    mutation: Mutation,
  });

  addResolveFunctionsToSchema({
    schema,
    resolvers: {
      Query: createQueryResolver(individualService, tokenService),
      Mutation: createMutationResolver(
        tokenService, individualService),
    },
  });
  return schema;
}

export default createSchema;
