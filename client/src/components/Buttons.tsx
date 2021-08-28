import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import { Post } from '../generated/graphql'

interface ButtonsProps {
    post:Post
}

const Buttons: React.FC<ButtonsProps> = ({post}) => {
    const history = useHistory();

    return(
        <>
            <Button
                size='small'
                color='primary'
                onClick={()=>history.replace(`/post/${post.uuid}`)}
            >
                View
            </Button>
            <Button
                size='small'
                color='primary'
                onClick={()=>history.replace(`/update-post/${post.uuid}`)}                
            >
                Update
            </Button>
            <Button
                size='small'
                color='primary'
            >
                Delete
            </Button>
        </>
    )
}

export default Buttons