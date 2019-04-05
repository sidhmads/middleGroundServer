import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLEnumType,
} from 'graphql';
import { TokenService } from './TokenService';
import { userType } from '../../data/Enum';

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: {
    token: { type: GraphQLString },
    error: { type: GraphQLString },
  },
});

const createToken: GraphQLFieldConfig<any, any> = {
  type: TokenType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    type: { type: userType },
  },
};

function createTokenResolver(tokenService: TokenService) {
  return async (source, args) => {
    const token = await tokenService.createToken(args.email, args.password, args.type);
    return {
      token,
      error: token === null ? 'Could not create token' : null,
    };
  };
}

export {
  createToken,
  createTokenResolver,
};
