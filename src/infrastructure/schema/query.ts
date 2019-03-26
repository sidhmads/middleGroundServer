import { GraphQLObjectType } from 'graphql';
import { TokenService } from '../auth';
import { IndividualService, individualQuery, createIndividualQueryResolver } from '../../data/individual';

function createQueryType() {
return new GraphQLObjectType({
  name: 'Query',
  fields: {
    individual: individualQuery,
  },
});
}

function createQueryResolver(
  individualService: IndividualService,
  tokenService: TokenService,
) {
  return {
    individual: createIndividualQueryResolver(individualService, tokenService),
  };
}

export {
  createQueryType,
  createQueryResolver,
};
