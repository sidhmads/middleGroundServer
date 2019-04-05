import {
  GraphQLString,
  GraphQLFieldConfig,
} from 'graphql';
import { CompanyService } from '../CompanyService';
import { CompanyType } from './';
import { TokenService } from '../../../infrastructure/auth';
import { PostService } from '../../post';
import { CommentService } from '../../comment';

const companyQuery: GraphQLFieldConfig<any, any> = {
  type: CompanyType,
  args: {
    token: { type: GraphQLString }
  },
};

function createCompanyQueryResolver(companyService: CompanyService, tokenService: TokenService) {
  return async (source, args) => {
    const email = await tokenService.readTokenEmail(args.token, 'companies');
    return email ? await companyService.getCompany(email) : null;
  };
}

function createCompanyTypeResolver(postService: PostService, commentService: CommentService) {
  return {
    post: (company) => {
      return postService.getAllPosts(company.id, 'company');
    },
    all_comments: (company) => {
      return commentService.getAllUserComments(company.id, 'companies', '');
    },
    pro_comments: (company) => {
      return commentService.getAllUserComments(company.id, 'companies', 'pro');
    },
    con_comments: (company) => {
      return commentService.getAllUserComments(company.id, 'companies', 'con');
    },
  };
}

export {
  companyQuery,
  createCompanyQueryResolver,
  createCompanyTypeResolver,
};
