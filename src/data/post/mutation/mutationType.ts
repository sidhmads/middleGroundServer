import { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType, GraphQLFloat } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { userType } from '../../Enum';

const SetPostType = new GraphQLInputObjectType({
  name: 'SetPost',
  fields:
  {
    user_id: { type: GraphQLInt },
    user_type: { type: userType },
    description: { type: GraphQLString },
    sponsor_id: { type: GraphQLInt },
    sponsor_type: { type: userType },
    sponsor_amount: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
    end_date: { type: GraphQLDate },
  },
});

const WherePostType = new GraphQLInputObjectType({
  name: 'WherePost',
  fields:
  {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    user_type: { type: userType },
    sponsor_id: { type: GraphQLInt },
    sponsor_type: { type: userType },
    is_active: { type: GraphQLBoolean },
  },
});

export {
  SetPostType,
  WherePostType,
};
