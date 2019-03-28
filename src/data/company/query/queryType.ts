import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
    total_amount: { type: GraphQLFloat },
    current_amount: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
    last_login: { type: GraphQLDate },
  },
});

export {
  CompanyType,
};