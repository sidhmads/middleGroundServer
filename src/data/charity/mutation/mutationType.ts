import { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType, GraphQLFloat } from 'graphql';

const SetCharityType = new GraphQLInputObjectType({
  name: 'SetCharity',
  fields:
  {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
    total_amount: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
  },
});

const WhereCharityType = new GraphQLInputObjectType({
  name: 'WhereCharity',
  fields:
  {
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    is_active: { type: GraphQLBoolean },
  },
});

export {
  SetCharityType,
  WhereCharityType,
};
