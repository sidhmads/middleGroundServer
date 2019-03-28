import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

const CharityType = new GraphQLObjectType({
  name: 'Charity',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
    total_amount: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
    last_login: { type: GraphQLDate },
  },
});

export {
  CharityType,
};