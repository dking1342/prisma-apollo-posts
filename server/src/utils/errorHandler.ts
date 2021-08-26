
type Errors = {
    field:string,
    message:string
}

type FieldErrors = {
    errors:Errors[]
}

type errorHandlerFn = (field:string,message:string) => FieldErrors

export const errorHandler:errorHandlerFn = (field,message) => {
    return{
        errors:[
            {
                field,
                message
            }
        ]
    }
}