import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { authCheck } from '../../utils/auth';
import { AuthResponse, PostResponse } from '../../types';


const prisma = new PrismaClient();

// types //////////////////////
type PostInput = {
    title:string
    body:string
    userId?:string
    postId?:string
}



const posts = {
    Query:{
        getPosts:async():Promise<PostResponse>=>{
            try {
                const posts = await prisma.post.findMany({
                    orderBy:{
                        createdAt:"desc"
                    }
                });

                if(posts){
                    return{
                        posts:posts
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'posts',
                                message:'no posts found'
                            }
                        ]
                    }
                }
            } catch (error) {
                return{
                    errors:[
                        {
                            field:'fetch',
                            message:error.message
                        }
                    ]
                }                
            }
        },
        getPost:async(
            _:undefined,
            {postId}:{postId:string},
        ):Promise<PostResponse>=>{
            try {
                const post = await prisma.post.findUnique({
                    where:{
                        uuid:postId
                    }
                });
                
                if(post){
                    return{
                        data:post
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'post',
                                message:'post not found'
                            }
                        ]
                    }
                }
            } catch (error) {
                return{
                    errors:[
                        {
                            field:'fetch',
                            message:error.message
                        }
                    ]
                }
            }
        },
    },
    Mutation:{
        createPost:async(
            _:undefined,
            {title,body,userId}:PostInput,
            context:AuthResponse
        ):Promise<PostResponse>=>{
            try {
                let user = await prisma.user.findUnique({where:{uuid:userId}});
                if(!user){
                    return{
                        errors:[
                            {
                                field:'user',
                                message:'User not found'
                            }
                        ]
                    }
                }
                let { valid, valErrors } = authCheck(user?.email,context);
                if(!valid){
                    return{
                        errors:valErrors
                    }
                }

                const post = await prisma.post.create({
                    data:{
                        title,
                        body: body ? body : '',
                        uuid:randomUUID(),
                        User:{
                            connect:{
                                uuid:userId
                            }
                        }
                    }
                });

                if(post){
                    return{
                        data:post
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'post',
                                message:'post was not created'
                            }
                        ]
                    }
                }
            } catch (error) {
                return{
                    errors:[
                        {
                            field:'fetch',
                            message:error.message
                        }
                    ]
                }
            }
        },
        updatePost:async(
            _:undefined,
            {title,body,postId,userId}:PostInput,
            context:AuthResponse
        ):Promise<PostResponse>=>{
            try {
                let user = await prisma.user.findUnique({where:{uuid:userId}});
                if(!user){
                    return{
                        errors:[
                            {
                                field:'user',
                                message:'User not found'
                            }
                        ]
                    }
                }
                let { valid, valErrors } = authCheck(user?.email,context);
                if(!valid){
                    return{
                        errors:valErrors
                    }
                }

                const currentPost = await prisma.post.findUnique({
                    where:{
                        uuid:postId
                    }
                });
                
                if(currentPost){
                    let postTitle = title ? title : currentPost.title;
                    let postBody = body ? body : currentPost.body;

                    let post = await prisma.post.update({
                        where:{
                            uuid:postId
                        },
                        data:{
                            title:postTitle,
                            body:postBody,
                        },
                    })
                    if(post){
                        return{
                            data:post
                        }
                    } else {
                        return{
                            errors:[
                                {
                                    field:'post',
                                    message:'post not updated'
                                }
                            ]
                        }
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'post',
                                message:'no post found to be updated'
                            }
                        ]
                    }
                }
            } catch (error) {
                return{
                    errors:[
                        {
                            field:'fetch',
                            message:error.message
                        }
                    ]
                }
            }
        },
        deletePost:async(
            _:undefined,
            {postId,userId}:{postId:string,userId:string},
            context:AuthResponse
        ):Promise<PostResponse> =>{
            try {
                let user = await prisma.user.findUnique({where:{uuid:userId}});
                if(!user){
                    return{
                        errors:[
                            {
                                field:'user',
                                message:'User not found'
                            }
                        ]
                    }
                }
                let { valid, valErrors } = authCheck(user?.email,context);
                if(!valid){
                    return{
                        errors:valErrors
                    }
                }


                const post = await prisma.post.delete({
                    where:{
                        uuid:postId
                    }
                });
                return{
                    data:post
                }        
            } catch (error) {
                return{
                    errors:[
                        {
                            field:'fetch',
                            message:error.message
                        }
                    ]
                }
            }
        }
    }
}

export default posts;