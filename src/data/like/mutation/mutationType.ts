import { GraphQLInt, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';
import { userType, postOrCommentType } from '../../Enum';

const SetLikeType = new GraphQLInputObjectType({
  name: 'SetLike',
  fields:
  {
    user_id: { type: GraphQLInt },
    user_type: { type: userType },
    post_comment_id: { type: GraphQLInt },
    post_comment_type: { type: postOrCommentType },
    is_active: { type: GraphQLBoolean },
  },
});

const WhereLikeType = new GraphQLInputObjectType({
  name: 'WhereLike',
  fields:
  {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    user_type: { type: userType },
    post_comment_id: { type: GraphQLInt },
    post_comment_type: { type: postOrCommentType },
    is_active: { type: GraphQLBoolean },
  },
});

export {
  SetLikeType,
  WhereLikeType,
};
