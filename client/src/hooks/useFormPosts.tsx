import { useState } from "react";


export const useFormPosts = (initialState:any) => {
    const [values,setValues]=useState(initialState)

    const handleChange = (e:any) => {
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = () => {
        console.log('click')
    }

    return {
        values,
        handleChange,
        handleSubmit
    };
}