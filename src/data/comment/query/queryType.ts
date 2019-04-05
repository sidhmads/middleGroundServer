import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLFloat } from 'graphql';
import { userType, commentType } from '../../Enum';
import { GraphQLDate } from 'graphql-iso-date';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    user_type: { type: userType },
    description: { type: GraphQLString },
    post_id: { type: GraphQLInt },
    comment_type: { type: commentType },
    sentiment: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
    created: { type: GraphQLDate },
    updated: { type: GraphQLDate },
  },
});

export {
  CommentType,
};