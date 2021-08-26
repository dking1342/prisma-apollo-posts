import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { AuthResponse, UserInput, UserResponse } from '../../types';
import { authCheck, generateToken } from '../../utils/auth';
import { verification } from '../../utils/verification';

const prisma = new PrismaClient();

// types ///////////////////
type UserDetails = {
    username:string;
    userId?:string;
    email:string;
}

const users = {

    Query:{
        getUsers:async():Promise<UserResponse>=>{
            try {
                const user = await prisma.user.findMany({
                    include:{
                        posts:true
                    }
                });                
                
                if(user){
                    return{
                        users:user
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'user',
                                message:'no users found'
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
        getUser:async(
            _:undefined,
            {userId}:{userId:string},
        ):Promise<UserResponse>=>{
            try {
                let user = await prisma.user.findUnique({
                    where:{
                        uuid:userId
                    },
                    include:{
                        posts:true
                    }
                });

                if(user){
                    return{
                        data:user
                    }
                } else {
                    return {
                        errors:[{
                            field:'user',
                            message:'user not found'
                        }]
                    }
                }
            } catch (error) {
                return {
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
        register: async (
            _:undefined,
            {email,username,password}:UserInput,
        ):Promise<UserResponse> =>{
            try {
                const isExist = await prisma.user.findUnique({
                    where:{
                        email
                    }
                })

                let inputs = {email,username,password,isExist:Boolean(isExist)}
                let { valid, valErrors } = verification(inputs);

                if(!valid){
                    return{
                        errors:valErrors
                    }
                }

                const hash = await argon2.hash(password);
                const user = await prisma.user.create({
                    data:{
                        uuid:randomUUID().toString(),
                        email,
                        username:username!,
                        password:hash,
                        posts:{
                            create:[]
                        }
                    },
                });

                if(user){
                    let token = generateToken(user);
                    let registerUser = {...user,token}
                    return{
                        data:registerUser
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'user',
                                message:'user was not created'
                            }
                        ]
                    }
                }
            } catch (error) {
                return {
                    errors:[
                        {
                            field:'fetch',
                            message:error.message
                        }
                    ]
                }
            }
        },
        login:async(
            _:undefined,
            {email,password}:UserInput
        ):Promise<UserResponse>=>{
            try {
                let inputs = {email,password};
                let { valid, valErrors } = verification(inputs);

                if(!valid){
                    return{
                        errors:valErrors
                    }
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email
                    }
                });

                if(!user){
                    return{
                        errors:[
                            {
                                field:'email',
                                message:'user does not exist'
                            }
                        ]
                    }
                }

                const isValidPassword = await argon2.verify(user.password,password);
                if(!isValidPassword){
                    return{
                        errors:[
                            {
                                field:'password',
                                message:'password is incorrect'
                            }
                        ]
                    }
                }
                const token = generateToken(user);
                let loginUser = { ...user, token};
                return{
                    data:loginUser
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
        updateUser:async(
            _:undefined,
            args:UserDetails,
            context:AuthResponse
        ):Promise<UserResponse>=>{
            try {
                let { valid, valErrors } = authCheck(args.email,context);
                if(!valid){
                    return{
                        errors:valErrors
                    }
                }


                let currentUser = await prisma.user.findUnique({
                    where:{
                        email:args.email
                    }
                })
                if(currentUser){
                    let username = args.username ? args.username : currentUser.username;

                    let user = await prisma.user.update({
                        where:{
                            email:args.email
                        },
                        data:{
                            username
                        }
                    })

                    return{
                        data:user
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'user',
                                message:'user not found'
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
        deleteUser:async(
            _:undefined,
            { email }:UserDetails,
            context:AuthResponse
        ):Promise<UserResponse>=>{
            try {
                let { valid, valErrors } = authCheck(email,context);
                if(!valid){
                    return{
                        errors:valErrors
                    }
                }

                const user = await prisma.user.delete({
                    where:{
                        email
                    }
                });
                return {
                    data:user
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

    }
};

export default users;