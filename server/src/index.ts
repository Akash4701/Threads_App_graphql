import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { prisma } from './lib/db';

async function init(){
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.json({message:"Server is runnning"})
})

const server = new ApolloServer({
  typeDefs:`
  type Query{
  hello:String
  say(Name:String):String
  },
  type Mutation{
  CreateUser(firstName:String!,lastName:String!,password:String!,salt:String,email:String!):Boolean}`,
  
  resolvers:{
    Query:{
      hello:()=>{
        return "Hello World"
      },
        say:({Name}:{Name:String})=>{

        `Hey ${Name},How are you?`
        }

        
        
      
    },
    Mutation:{
      CreateUser:async({firstName,lastName,email,password}:{firstName:String,lastName:String,email:String,password:String,salt:String})=>{
        await prisma.user.create({
          data:{
            firstName,
            lastName,
            email,
            password,
            salt:"jbfjbew"
          }
        })

        return true;
    }
  },
}});
  await server.start();

  app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server),
);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
}
init();


