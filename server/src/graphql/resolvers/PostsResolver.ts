import { Post, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';


const prisma = new PrismaClient();

// types //////////////////////
type PostResponse = {
    errors?:[FieldErrors] | [] | null
    data?:Post | null
    posts?:Post[] | null
}

type FieldErrors = {
    field:String
    message:String
}

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
                const posts = await prisma.post.findMany();

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
            {title,body,userId}:PostInput
        ):Promise<PostResponse>=>{
            try {
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
            args:PostInput
        ):Promise<PostResponse>=>{
            try {
                const currentPost = await prisma.post.findUnique({
                    where:{
                        uuid:args.postId
                    }
                });
                
                if(currentPost){
                    let title = args.title ? args.title : currentPost.title;
                    let body = args.body ? args.body : currentPost.body;

                    let post = await prisma.post.update({
                        where:{
                            uuid:args.postId
                        },
                        data:{
                            title,
                            body,
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
            {postId}:{postId:string}
        ):Promise<PostResponse> =>{
            try {
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