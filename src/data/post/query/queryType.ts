import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat, GraphQLList } from 'graphql';
import { CommentType } from '../../comment';
import { GraphQLDate } from 'graphql-iso-date';

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    user_type: { type: GraphQLString },
    description: { type: GraphQLString },
    sponsor_id: { type: GraphQLInt },
    sponsor_type: { type: GraphQLString },
    sponsor_amount: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
    end_date: { type: GraphQLDate },
    created: { type: GraphQLDate },
    updated: { type: GraphQLDate },
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
  PostType,
};