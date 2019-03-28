import { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType, GraphQLFloat } from 'graphql';

const SetCompanyType = new GraphQLInputObjectType({
  name: 'SetCompany',
  fields:
  {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
    total_amount: { type: GraphQLFloat },
    current_amount: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
  },
});

const WhereCompanyType = new GraphQLInputObjectType({
  name: 'WhereCompany',
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
  SetCompanyType,
  WhereCompanyType,
};
