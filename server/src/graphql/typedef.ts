import { gql } from 'graphql-tag';

const typeDefs = gql`
    type UserResponse{
        errors:[FieldErrors]
        data:User
        users:[User]
    }

    type PostResponse{
        errors:[FieldErrors]
        data:Post
        posts:[Post]
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
        user_id:String
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
        getUser(userId:String):UserResponse
        getPosts:PostResponse
        getPost(postId:String):PostResponse
    }

    type Mutation{
        createUser(email:String!,name:String!):UserResponse
        updateUser(name:String!,userId:String!):UserResponse
        deleteUser(userId:String!):UserResponse
        createPost(title:String!,userId:String!,body:String):PostResponse
        updatePost(title:String!,body:String!,postId:String!):PostResponse
        deletePost(postId:String!):PostResponse
    }
`;

export default typeDefs;