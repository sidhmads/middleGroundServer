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

const postOrCommentType = new GraphQLEnumType({
  name: 'postOrCommentType',
  values: {
    post: {
      value: 'posts',
    },
    comment: {
      value: 'comments',
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

export { userType, postOrCommentType, commentType };
