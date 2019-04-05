import {
  GraphQLString,
  GraphQLFieldConfig,
} from 'graphql';
import { IndividualService } from '../IndividualService';
import { IndividualType } from './';
import { TokenService } from '../../../infrastructure/auth';
import { PostService } from '../../post';
import { CommentService } from '../../comment';

const individualQuery: GraphQLFieldConfig<any, any> = {
  type: IndividualType,
  args: {
    token: { type: GraphQLString },
  },
};

function createIndividualQueryResolver(individualService: IndividualService, tokenService: TokenService) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token, 'individuals');
    return email ? await individualService.getIndividual(email) : null;
  };
}

function createIndividualTypeResolver(postService: PostService, commentService: CommentService) {
  return {
    post: (individual) => {
      return postService.getAllPosts(individual.id, 'individuals');
    },
    all_comments: (individual) => {
      return commentService.getAllUserComments(individual.id, 'individuals', '');
    },
    pro_comments: (individual) => {
      return commentService.getAllUserComments(individual.id, 'individuals', 'pro');
    },
    con_comments: (individual) => {
      return commentService.getAllUserComments(individual.id, 'individuals', 'con');
    },
  };
}

export {
  individualQuery,
  createIndividualQueryResolver,
  createIndividualTypeResolver,
};
