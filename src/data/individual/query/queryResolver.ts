import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import { IndividualService } from '../IndividualService';
import { IndividualType } from './'
import { TokenService } from '../../../infrastructure/auth';

const individualQuery: GraphQLFieldConfig<any, any> = {
  type: IndividualType,
  args: {
    token: { type: GraphQLString },
  },
};

function createIndividualQueryResolver(individualService: IndividualService, tokenService: TokenService) {
  return async (source, args) => {
    // const email = await tokenService.readTokenEmail(args.token);
    const email = 'siddharth@gmail.com';
    return email ? await individualService.getIndividual(email) : null;
  };
}

export {
  individualQuery,
  createIndividualQueryResolver,
};
