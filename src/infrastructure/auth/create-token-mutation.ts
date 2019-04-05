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

const generateToken: GraphQLFieldConfig<any, any> = {
  type: TokenType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    type: { type: userType },
  },
};

function generateTokenResolver(tokenService: TokenService) {
  return async (source, args) => {
    const token = await tokenService.generateToken(args.email, args.password, args.type);
    return {
      token,
      error: token === null ? 'Could not create token' : null,
    };
  };
}

export {
  generateToken,
  generateTokenResolver};
