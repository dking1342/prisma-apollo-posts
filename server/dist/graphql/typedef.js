"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const typeDefs = graphql_tag_1.gql `
    type UserResponse{
        errors:[FieldErrors]
        data:User
        users:[User]
    }

    type FieldErrors{
        field:String!
        message:String!
    }

    type User{
        id:ID
        uuid:String
        email:String!
        name:String!
        role:String
        posts:[Post]
        createdAt:String
        updatedAt:String
    }

    type Post{
        id:Int!
        uuid:String!
        title:String!
        body:String
        user_id:Int
        createdAt:String!
        updatedAt:String!
    }

    input PostInput{
        title:String
        body:String
    }

    input UserDetails{
        name:String
        uuid:String!
    }

    type Query{
        getUsers:UserResponse
        getPosts:[Post]
        getUser(uuid:String):UserResponse
    }

    type Mutation{
        createUser(email:String!,name:String!):UserResponse
        deleteUser(uuid:String!):UserResponse
        updateUser(name:String!,uuid:String!):UserResponse
    }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedef.js.map