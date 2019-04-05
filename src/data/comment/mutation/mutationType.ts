import { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType, GraphQLFloat } from 'graphql';
import { userType, commentType } from '../../Enum';

const SetCommentType = new GraphQLInputObjectType({
  name: 'SetComment',
  fields:
  {
    user_id: { type: GraphQLInt },
    user_type: { type: userType },
    description: { type: GraphQLString },
    post_id: { type: GraphQLInt },
    comment_type: { type: commentType },
    sentiment: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
  },
});

const WhereCommentType = new GraphQLInputObjectType({
  name: 'WhereComment',
  fields:
  {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    user_type: { type: GraphQLString },
    post_id: { type: GraphQLInt },
    comment_type: { type: commentType },
    is_active: { type: GraphQLBoolean },
  },
});

export {
  SetCommentType,
  WhereCommentType,
};
