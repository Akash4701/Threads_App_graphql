import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { prisma } from '../lib/db';
import { user } from './user/index';

const app=express();


async function CreateApolloServer(){ 
const gqlserver = new ApolloServer({
  typeDefs:`
  type Query {
  ${user.queries}
  }
  
  type Mutation{
    ${user.mutations}
  }
    `,

  
  
  resolvers:{
    Query:{
     ...user.resolvers.queries

        
        
      
    },
    Mutation:{
    ...user.resolvers.mutations
  },
}});
  await gqlserver.start();


}

export default CreateApolloServer