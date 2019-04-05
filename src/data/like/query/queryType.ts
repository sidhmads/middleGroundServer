import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLFloat } from 'graphql';
import { userType, postOrCommentType } from '../../Enum';
import { GraphQLDate } from 'graphql-iso-date';

const LikeType = new GraphQLObjectType({
  name: 'Like',
  fields: {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    user_type: { type: userType },
    post_comment_id: { type: GraphQLInt },
    post_comment_type: { type: postOrCommentType },
    is_active: { type: GraphQLBoolean },
    created: { type: GraphQLDate },
    updated: { type: GraphQLDate },
  },
});

export {
  LikeType,
};