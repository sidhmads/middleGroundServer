import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';


const IndividualType = new GraphQLObjectType({
  name: 'Individual',
  fields: {
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
    amount_earned: { type: GraphQLFloat },
    amount_left: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
    last_login: { type: GraphQLDate },
  },
});

export {
  IndividualType,
};