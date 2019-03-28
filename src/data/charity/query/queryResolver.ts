import {
  GraphQLString,
  GraphQLFieldConfig,
} from 'graphql';
import { CharityService } from '../CharityService';
import { CharityType } from './';
import { TokenService } from '../../../infrastructure/auth';

const charityQuery: GraphQLFieldConfig<any, any> = {
  type: CharityType,
  args: {
    token: { type: GraphQLString },
  },
};

function createCharityQueryResolver(charityService: CharityService, tokenService: TokenService) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token, 'charities');
    return email ? await charityService.getCharity(email) : null;
  };
}

export {
  charityQuery,
  createCharityQueryResolver,
};
