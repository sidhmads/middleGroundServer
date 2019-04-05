import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { userType } from '../../data/Enum';
import { generateToken, generateTokenResolver, TokenService } from '../auth';
import {
  IndividualService,
  SetIndividualType,
  WhereIndividualType,
  IndividualType,
  createIndividualMutationResolver,
} from '../../data/individual';
import {
  CompanyService,
  SetCompanyType,
  WhereCompanyType,
  CompanyType,
  createCompanyMutationResolver,
} from '../../data/company';
import {
  CharityService,
  SetCharityType,
  WhereCharityType,
  CharityType,
  createCharityMutationResolver,
} from '../../data/charity';
import {
  PostService,
  SetPostType,
  WherePostType,
  PostType,
  createPostMutationResolver,
} from '../../data/post';
import {
  CommentService,
  SetCommentType,
  WhereCommentType,
  CommentType,
  createCommentMutationResolver,
} from '../../data/comment';
import {
  LikeService,
  SetLikeType,
  WhereLikeType,
  LikeType,
  createLikeMutationResolver,
} from '../../data/like';

function createMutation(tableType: string) {
  return {
    type: new GraphQLObjectType({
      name: `create${tableType}`,
      fields: {
        code: { type: GraphQLInt },
        row: { type: returnObject(tableType) },
      },
    }),
    args: {
      token: { type: GraphQLString },
      type: { type: userType },
      setParams: { type: paramObject('set', tableType) },
    },
  };
}

function updateMutation(tableType: string) {
  return {
    type: new GraphQLObjectType({
      name: `update${tableType}`,
      fields: {
        code: { type: GraphQLInt },
        row: { type: returnObject(tableType) },
      },
    }),
    args: {
      token: { type: GraphQLString },
      type: { type: userType },
      setParams: { type: paramObject('set', tableType) },
      whereParams: { type: paramObject('where', tableType) },
    },
  };
}

function deleteMutation(tableType: string) {
  return {
    type: new GraphQLObjectType({
      name: `delete${tableType}`,
      fields: {
        code: { type: GraphQLInt },
        row: { type: returnObject(tableType) },
      },
    }),
    args: {
      token: { type: GraphQLString },
      type: { type: userType },
      whereParams: { type: paramObject('where', tableType) },
    },
  };
}

function returnObject(tableType: string) {
  const returnMap = {
    Individual: IndividualType,
    Company: CompanyType,
    Charity: CharityType,
    Post: PostType,
    Comment: CommentType,
    Like: LikeType,
  };
  const returnObject = returnMap[tableType];

  return returnObject;
}

function paramObject(mutationType: string, tableType: string) {
  const paramMap = {
    setIndividual: SetIndividualType,
    whereIndividual: WhereIndividualType,
    setCompany: SetCompanyType,
    whereCompany: WhereCompanyType,
    setCharity: SetCharityType,
    whereCharity: WhereCharityType,
    setPost: SetPostType,
    wherePost: WherePostType,
    setComment: SetCommentType,
    whereComment: WhereCommentType,
    setLike: SetLikeType,
    whereLike: WhereLikeType,
  };

  const paramObject = paramMap[mutationType + tableType];

  return paramObject;
}

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    generateToken,
    createIndividual: createMutation('Individual'),
    updateIndividual: updateMutation('Individual'),
    deleteIndividual: deleteMutation('Individual'),
    createCompany: createMutation('Company'),
    updateCompany: updateMutation('Company'),
    deleteCompany: deleteMutation('Company'),
    createCharity: createMutation('Charity'),
    updateCharity: updateMutation('Charity'),
    deleteCharity: deleteMutation('Charity'),
    createPost: createMutation('Post'),
    updatePost: updateMutation('Post'),
    deletePost: deleteMutation('Post'),
    createComment: createMutation('Comment'),
    updateComment: updateMutation('Comment'),
    deleteComment: deleteMutation('Comment'),
    createLike: createMutation('Like'),
    updateLike: updateMutation('Like'),
    deleteLike: deleteMutation('Like'),
  },
});

function createMutationResolver(
  tokenService: TokenService,
  individualService: IndividualService,
  companyService: CompanyService,
  charityService: CharityService,
  postService: PostService,
  commentService: CommentService,
  likeService: LikeService,
) {
  return {
    generateToken: generateTokenResolver(tokenService),
    createIndividual: createIndividualMutationResolver('insert', tokenService, individualService),
    updateIndividual: createIndividualMutationResolver('update', tokenService, individualService),
    deleteIndividual: createIndividualMutationResolver('delete', tokenService, individualService),
    createCompany: createCompanyMutationResolver('insert', tokenService, companyService),
    updateCompany: createCompanyMutationResolver('update', tokenService, companyService),
    deleteCompany: createCompanyMutationResolver('delete', tokenService, companyService),
    createCharity: createCharityMutationResolver('insert', tokenService, charityService),
    updateCharity: createCharityMutationResolver('update', tokenService, charityService),
    deleteCharity: createCharityMutationResolver('delete', tokenService, charityService),
    createPost: createPostMutationResolver('insert', tokenService, postService),
    updatePost: createPostMutationResolver('update', tokenService, postService),
    deletePost: createPostMutationResolver('delete', tokenService, postService),
    createComment: createCommentMutationResolver('insert', tokenService, commentService),
    updateComment: createCommentMutationResolver('update', tokenService, commentService),
    deleteComment: createCommentMutationResolver('delete', tokenService, commentService),
    createLike: createLikeMutationResolver('insert', tokenService, likeService),
    updateLike: createLikeMutationResolver('update', tokenService, likeService),
    deleteLike: createLikeMutationResolver('delete', tokenService, likeService),
  };
}

export {
  createMutationResolver,
  Mutation,
};
