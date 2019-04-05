import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat, GraphQLList } from 'graphql';
import { PostType } from '../../post/';
import { CommentType } from '../../comment/';
import { GraphQLDate } from 'graphql-iso-date';

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
    total_amount: { type: GraphQLFloat },
    current_amount: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
    last_login: { type: GraphQLDate },
    post: {
      type: new GraphQLList(PostType),
    },
    all_comments: {
      type: new GraphQLList(CommentType),
    },
    pro_comments: {
      type: new GraphQLList(CommentType),
    },
    con_comments: {
      type: new GraphQLList(CommentType),
    },
  },
});

export {
  CompanyType,
};