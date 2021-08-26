import { ErrorField, VerificationResponse } from "../types";

type UserInputs = {
    email:string;
    username?:string;
    password?:string;
    isExist?:boolean
}

export const verification = (inputs:UserInputs):VerificationResponse => {
    let valErrors:ErrorField[] | [] = [];
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if(!inputs.email.match(regEx)){
        valErrors = [
            ...valErrors,
            {
                field:"email",
                message:"Email must be a vaild email address"
            }
        ]
    }

    if(inputs.password && inputs.password.length <= 2){
        valErrors = [
            ...valErrors,
            {
                field:"password",
                message:"Password must be at least two characters long"
            }
        ]
    }

    if(inputs.username && inputs.username.length <= 2){
        valErrors = [
            ...valErrors,
            {
                field:"username",
                message:"Username must be at least two characters long"
            }
        ]
    }

    if(inputs.isExist && Boolean(inputs.isExist)){
        valErrors = [
            ...valErrors,
            {
                field:'email',
                message:'user already exists'
        }
        ]
    }

    return{
        valid:Object.keys(valErrors).length < 1,
        valErrors
    }

}