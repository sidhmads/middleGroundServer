import {
  GraphQLString,
  GraphQLFieldConfig,
} from 'graphql';
import { CharityService } from '../CharityService';
import { CharityType } from './';
import { TokenService } from '../../../infrastructure/auth';
import { PostService } from '../../post';
import { CommentService } from '../../comment';

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

function createCharityTypeResolver(postService: PostService, commentService: CommentService) {
  return {
    post: (charity) => {
      return postService.getAllPosts(charity.id, 'charity');
    },
    all_comments: (charity) => {
      return commentService.getAllUserComments(charity.id, 'charities', '');
    },
    pro_comments: (charity) => {
      return commentService.getAllUserComments(charity.id, 'charities', 'pro');
    },
    con_comments: (charity) => {
      return commentService.getAllUserComments(charity.id, 'charities', 'con');
    },
  };
}

export {
  charityQuery,
  createCharityQueryResolver,
  createCharityTypeResolver,
};
