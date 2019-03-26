import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
} from 'graphql';
import { TokenService } from './TokenService';

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
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
};

function createTokenResolver(tokenService: TokenService) {
  return async (source, args) => {
    const token = await tokenService.createToken(args.username, args.password);
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
