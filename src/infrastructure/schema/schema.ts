import { GraphQLSchema } from 'graphql';
import { addResolveFunctionsToSchema } from 'graphql-tools';
import { TokenService } from '../auth';
import { createQueryType, createQueryResolver } from './query';
import { Mutation, createMutationResolver } from './mutation';
import { IndividualService, createIndividualTypeResolver } from '../../data/individual';
import { CompanyService, createCompanyTypeResolver } from '../../data/company';
import { CharityService, createCharityTypeResolver } from '../../data/charity';
import { PostService, createPostTypeResolver } from '../../data/post';
import { CommentService } from '../../data/comment';

function createSchema(
    tokenService: TokenService,
    individualService: IndividualService,
    companyService: CompanyService,
    charityService: CharityService,
    postService: PostService,
    commentService: CommentService,
) {
  const schema = new GraphQLSchema({
    query: createQueryType(),
    mutation: Mutation,
  });

  addResolveFunctionsToSchema({
    schema,
    resolvers: {
      Query: createQueryResolver(tokenService, individualService, companyService, charityService),
      Mutation: createMutationResolver(
        tokenService, individualService, companyService, charityService, postService, commentService),
      Individual: createIndividualTypeResolver(postService, commentService),
      Company: createCompanyTypeResolver(postService, commentService),
      Charity: createCharityTypeResolver(postService, commentService),
      Post: createPostTypeResolver(commentService),
    },
  });
  return schema;
}

export default createSchema;
