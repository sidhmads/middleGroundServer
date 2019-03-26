import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
} from 'graphql';
import { createToken, createTokenResolver, TokenService } from '../auth';
import {
  IndividualService,
  SetIndividualType,
  WhereIndividualType,
  IndividualType,
  createIndividualMutationResolver,
} from '../../data/individual';


function insertMutation(tableType: string) {
  return {
    type: new GraphQLObjectType({
      name: `insert${tableType}`,
      fields: {
        code: { type: GraphQLInt },
        row: { type: returnObject(tableType) },
      },
    }),
    args: {
      token: { type: GraphQLString },
      setParams: { type: paramObject('set', tableType) },
    },
  };
}

function updateMutation(tableType: string) {
  return {
    type: new GraphQLObjectType({
      name: `update${tableType}`,
      fields: {
        code: { type: GraphQLInt },
        row: { type: returnObject(tableType) },
      },
    }),
    args: {
      token: { type: GraphQLString },
      setParams: { type: paramObject('set', tableType) },
      whereParams: { type: paramObject('where', tableType) },
    },
  };
}

function deleteMutation(tableType: string) {
  return {
    type: new GraphQLObjectType({
      name: `delete${tableType}`,
      fields: {
        code: { type: GraphQLInt },
        row: { type: returnObject(tableType) },
      },
    }),
    args: {
      token: { type: GraphQLString },
      whereParams: { type: paramObject('where', tableType) },
    },
  };
}

function returnObject(tableType: string) {
  const returnMap = {
    Individual: IndividualType,
  };
  const returnObject = returnMap[tableType];

  return returnObject;
}

function paramObject(mutationType: string, tableType: string) {
  const paramMap = {
    setIndividual: SetIndividualType,
    whereIndividual: WhereIndividualType,
  };

  const returnMap = {
    returnIndividual: IndividualType,
  };
  const paramObject = paramMap[mutationType + tableType];

  return paramObject;
}

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createToken,
    insertIndividual: insertMutation('Individual'),
    updateIndividual: updateMutation('Individual'),
    deleteIndividual: deleteMutation('Individual'),
  },
});

function createMutationResolver(
  tokenService: TokenService,
  individualService: IndividualService,
) {
  return {
    createToken: createTokenResolver(tokenService),
    insertIndividual: createIndividualMutationResolver('insert', tokenService, individualService),
    updateIndividual: createIndividualMutationResolver('update', tokenService, individualService),
    deleteIndividual: createIndividualMutationResolver('delete', tokenService, individualService),
  };
}

export {
  createMutationResolver,
  Mutation,
};