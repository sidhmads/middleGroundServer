import { TokenService } from './infrastructure/auth/TokenService';
import { IndividualService } from './data/individual';
import { CompanyService } from './data/company';
import { CharityService } from './data/charity';
import { PostService } from './data/post';
import { CommentService } from './data/comment';
import { LikeService } from './data/like';
import { DbService } from './infrastructure/db';
import { ApolloServer } from 'apollo-server';
import { default as createSchema } from './infrastructure/schema/schema';
import { GraphQLSchema, graphql } from 'graphql';

interface ServiceConfig {
  tokenService: TokenService;
  individualService: IndividualService;
  companyService: CompanyService;
  charityService: CharityService;
  postService: PostService;
  commentService: CommentService;
  likeService: LikeService;
}

export default class Server {
  private server: ApolloServer;
  private schema: GraphQLSchema;
  constructor(config: Partial<ServiceConfig> = {}) {
    const dbService = new DbService;
    const tokenService = new TokenService(dbService);
    const individualService = new IndividualService(dbService);
    const companyService = new CompanyService(dbService);
    const charityService = new CharityService(dbService);
    const postService = new PostService(dbService);
    const commentService = new CommentService(dbService);
    const likeService = new LikeService(dbService);
    const schema = createSchema(
      tokenService,
      individualService,
      companyService,
      charityService,
      postService,
      commentService,
      likeService,
    );
    this.schema = schema;
    this.server = new ApolloServer({ schema, cors: true });
  }

  listen() {
    this.server.listen(4000, '0.0.0.0').then(({ url }: { url: String }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  }

  execute(gqlQuery: string, variables: any) {
    return graphql(this.schema, gqlQuery, null, null, variables);
  }
}
