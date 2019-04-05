import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { userType } from '../../data/Enum';
import { createToken, createTokenResolver, TokenService } from '../auth';
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


function insertMutation(tableType: string) {
  return {
    type: new GraphQLObjectType({
      name: `insert${tableType}`,
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
  };

  const paramObject = paramMap[mutationType + tableType];

  return paramObject;
}

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createToken,
    insertIndividual: insertMutation('Individual'),
    updateIndividual: updateMutation('Individual'),
    deleteIndividual: deleteMutation('Individual'),
    insertCompany: insertMutation('Company'),
    updateCompany: updateMutation('Company'),
    deleteCompany: deleteMutation('Company'),
    insertCharity: insertMutation('Charity'),
    updateCharity: updateMutation('Charity'),
    deleteCharity: deleteMutation('Charity'),
    insertPost: insertMutation('Post'),
    updatePost: updateMutation('Post'),
    deletePost: deleteMutation('Post'),
    insertComment: insertMutation('Comment'),
    updateComment: updateMutation('Comment'),
    deleteComment: deleteMutation('Comment'),
  },
});

function createMutationResolver(
  tokenService: TokenService,
  individualService: IndividualService,
  companyService: CompanyService,
  charityService: CharityService,
  postService: PostService,
  commentService: CommentService,
) {
  return {
    createToken: createTokenResolver(tokenService),
    insertIndividual: createIndividualMutationResolver('insert', tokenService, individualService),
    updateIndividual: createIndividualMutationResolver('update', tokenService, individualService),
    deleteIndividual: createIndividualMutationResolver('delete', tokenService, individualService),
    insertCompany: createCompanyMutationResolver('insert', tokenService, companyService),
    updateCompany: createCompanyMutationResolver('update', tokenService, companyService),
    deleteCompany: createCompanyMutationResolver('delete', tokenService, companyService),
    insertCharity: createCharityMutationResolver('insert', tokenService, charityService),
    updateCharity: createCharityMutationResolver('update', tokenService, charityService),
    deleteCharity: createCharityMutationResolver('delete', tokenService, charityService),
    insertPost: createPostMutationResolver('insert', tokenService, postService),
    updatePost: createPostMutationResolver('update', tokenService, postService),
    deletePost: createPostMutationResolver('delete', tokenService, postService),
    insertComment: createCommentMutationResolver('insert', tokenService, commentService),
    updateComment: createCommentMutationResolver('update', tokenService, commentService),
    deleteComment: createCommentMutationResolver('delete', tokenService, commentService),
  };
}

export {
  createMutationResolver,
  Mutation,
};
