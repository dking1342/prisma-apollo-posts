import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import { Post, useDeletePostMutation, useGetUserQuery } from '../generated/graphql'

interface ButtonsProps {
    post:Post
}

const Buttons: React.FC<ButtonsProps> = ({post}) => {
    const history = useHistory();
    const userId = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).uuid : '';
    const { data } = useGetUserQuery({
        variables:{
            userId
        }
    });

    const [deletePost]=useDeletePostMutation({
        variables:{
            postId:post.uuid,
            userId
        }
    })

    return(
        <>
            <Button
                size='small'
                color='primary'
                onClick={()=>history.replace(`/post/${post.uuid}`)}
            >
                View
            </Button>

            {
                data && post && data?.getUser?.data?.uuid === post.user_id ? (
                    <>
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
                            onClick={async()=>{
                                let response = await deletePost();
                                console.log('response',response)
                                if(!response.data?.deletePost?.errors){
                                    window.location.reload();
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </>                    
                ) : ( null )
            }
        </>
    )
}

export default Buttons