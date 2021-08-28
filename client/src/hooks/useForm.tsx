import { useEffect, useState } from "react";


export const useForm = (initialState:any) => {
    const [values,setValues]=useState(initialState)
    
    useEffect(()=>{
        if(Object.values(initialState).filter(item=>item !== '').length){
            setValues(initialState)
        }
    },[initialState])

    const handleChange = (e:any) => {
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    return {
        values,
        handleChange,
    };
}