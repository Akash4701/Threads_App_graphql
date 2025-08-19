import express from 'express';

import { expressMiddleware } from '@as-integrations/express5';

import CreateApolloServer from './graphql/index';
async function init(){
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.json({message:"Server is runnning"})
})
  app.use(
  '/graphql',
  express.json(),
  expressMiddleware(await CreateApolloServer())
);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
}
init();


