import { User } from ".prisma/client";
import { Request } from "express";
import jwt from 'jsonwebtoken';
import { AuthResponse, ErrorField, VerificationResponse } from "src/types";


export const isAuth = (context:Request):AuthResponse => {
    const authorization = context.headers.authorization;

    if(authorization){
        const token = authorization.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token,process.env.TOKEN_SECRET as jwt.Secret,)
                return{
                    user,
                }                
            } catch (error) {
                return{
                    errors:[
                        {
                            field:'token',
                            message:'Invalid/Expired token'
                        }
                    ]
                }
            }
        } else {
            return{
                errors:[
                    {
                        field:'token',
                        message:'Authentication token must be formatted properly'
                    }
                ]
            }
        }
    } else {
        return{
            errors:[
                {
                    field:'token',
                    message:'Correct header must be given'
                }
            ]
        }
    }
};

export const generateToken = (user:User) => {
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
            username:user.username,
        },
        process.env.TOKEN_SECRET as jwt.Secret,
        {
            expiresIn:'1hr'
        }
    )
}

export const authCheck = (id:string | undefined,context:AuthResponse):VerificationResponse => {
    let valErrors:ErrorField[] | [] = [];

    if(Boolean(context.errors)){
        valErrors = [
            ...valErrors,
            {
                field:'authorization',
                message:'Not authorized'
            }
        ]
    }

    let user = context.user;
    if(id && context.user && user.email && id !== user.email){
        valErrors = [
            ...valErrors,
            {
                field:'authorization',
                message:'Not authorized'
            }
        ]
    }

    if(context.user && context.user.exp && Date.now() >= context.user.exp * 1000){
        valErrors = [
            ...valErrors,
            {
                field:'authorization',
                message:'Token has expired'
            }
        ]
    } 

    return{
        valid:Object.keys(valErrors).length < 1,
        valErrors
    }
}