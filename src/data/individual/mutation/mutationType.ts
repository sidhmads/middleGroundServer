import { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType, GraphQLFloat } from 'graphql';

const SetIndividualType = new GraphQLInputObjectType({
  name: 'SetIndividual',
  fields:
  {
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
    amount_earned: { type: GraphQLFloat },
    amount_left: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
  },
});

const WhereIndividualType = new GraphQLInputObjectType({
  name: 'WhereIndividual',
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
  SetIndividualType,
  WhereIndividualType,
};
