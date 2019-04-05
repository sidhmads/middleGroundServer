import { GraphQLEnumType } from 'graphql';

const userType = new GraphQLEnumType({
  name: 'userType',
  values: {
    individual: {
      value: 'individuals',
    },
    company: {
      value: 'companies',
    },
    charity: {
      value: 'charities',
    },
  },
});

const commentType = new GraphQLEnumType({
  name: 'commentType',
  values: {
    pro: {
      value: 'pro',
    },
    con: {
      value: 'con',
    },
  },
});

export { userType, commentType };
