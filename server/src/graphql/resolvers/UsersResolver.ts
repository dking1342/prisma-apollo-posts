import { PrismaClient, User } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();


type UserDetails = {
    name:string;
    uuid:string;
}

type FieldError = {
    field:string;
    message:string;
}

type UserResponse = {
    errors?:FieldError[] | [] | null;
    data?:User | null;
    users?: User[] | null;
}

const users = {

    Query:{
        getUsers:async():Promise<UserResponse>=>{
            try {
                const user = await prisma.user.findMany();                
                
                if(user){
                    return{
                        users:user
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'fetch',
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
            {uuid}:{uuid:string}
        ):Promise<UserResponse>=>{
            try {
                let user = await prisma.user.findUnique({
                    where:{
                        uuid
                    }
                });

                if(user){
                    return{
                        data:user
                    }
                } else {
                    return {
                        errors:[{
                            field:'fetch',
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
        createUser: async (
            _:undefined,
            {email,name}:{email:string,name:string},
        ):Promise<UserResponse> =>{
            try {
                const user = await prisma.user.create({
                    data:{
                        uuid:randomUUID().toString(),
                        email:email,
                        name:name,
                    },
                });

                if(user){
                    return{
                        data:user
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'fetch',
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
        updateUser:async(
            _:undefined,
            args:UserDetails
        ):Promise<UserResponse>=>{
            try {
                let currentUser = await prisma.user.findUnique({
                    where:{
                        uuid:args.uuid
                    }
                })
                if(currentUser){
                    let name = args.name ? args.name : currentUser.name;

                    let user = await prisma.user.update({
                        where:{
                            uuid:args.uuid
                        },
                        data:{
                            name
                        }
                    })

                    return{
                        data:user
                    }
                } else {
                    return{
                        errors:[
                            {
                                field:'fetch',
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
            { uuid }:{uuid:string}
        ):Promise<UserResponse>=>{
            try {
                const user = await prisma.user.delete({
                    where:{
                        uuid
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