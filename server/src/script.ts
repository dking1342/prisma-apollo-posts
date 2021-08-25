import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typedef';
import resolvers from './graphql/resolvers';

// dotenv invit
dotenv.config();

// A `main` function so that you can use async/await
const main = async () => {
  try {
    // express and middleware init
    const app = express();
    const PORT = process.env.PORT;
    const GRAPHQL_PORT = process.env.GRAPHQL_PORT;
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cors());

    // create a new apollo server object
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context:({req})=>({req,}),
    });

    // apollo server init
    server.listen({port:GRAPHQL_PORT})

    // express server init
    app.listen(PORT,()=>console.log(`server listening on port ${PORT}`));
  } catch (error) {
    console.log('--------- server error -------------',error.message);    
  }
}

main();
