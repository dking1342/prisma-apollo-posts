import { Button, Container, Grid, LinearProgress, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { posts } from '../data/posts';
import { FieldErrors, useGetPostQuery, useUpdatePostMutation } from '../generated/graphql';
import { useForm } from '../hooks/useForm';
import useSigninStyles from '../styles/useSigninStyles';


interface UpdatePostProps {

}

const UpdatePost: React.FC<UpdatePostProps> = () => {
    const classes = useSigninStyles();
    const history = useHistory();
    const postId = history.location.pathname.split('/')[2];
    const { data, loading } = useGetPostQuery({
        variables:{
            postId
        }
    })

    let [initState,setInitState]=useState({title:'',body:''})
    useEffect(()=>{
        if(data){
            setInitState({
                ...initState,
                title:data?.getPost?.data?.title ? data.getPost.data.title : '',
                body:data?.getPost?.data?.body ? data.getPost.data.body : '',
            })
        }
    },[data])
    let { values,handleChange } = useForm(initState);

    const [fieldErrors,setFieldErrors]=useState<FieldErrors[] | null >([]);
    const userId = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).uuid : '';
    const [updatePost] = useUpdatePostMutation({
        variables:{
            title:values.title,
            body:values.body,
            postId,
            userId
        }
    })

    return (
        <>
            {
                loading ? (
                    <LinearProgress color="secondary" />
                ) : !loading && data?.getPost?.errors ? (
                    <section className={classes.sectionContainer}>
                        <Container maxWidth="xl">
                            <Grid container alignItems="center" justifyContent="center" className={classes.gridContainer}>
                                Error when loading the post
                            </Grid>
                        </Container>
                    </section>
                ) : !loading && data?.getPost?.data ? (
                    <section className={classes.sectionContainer}>
                        <Container maxWidth='xl' >
                            <Grid container alignItems='center' justifyContent='center' spacing={3} className={classes.gridContainer}>
                                <Grid item container alignItems='center' direction='column' justifyContent='center'>
                                    <Typography variant='h5' component='h5' color='textPrimary' gutterBottom >
                                        Update Post
                                    </Typography>
                                </Grid>
                                <Grid container direction='column' spacing={2} alignItems='center' className={classes.inputContainer}>
                                    {
                                        posts.map(post=>(
                                            <Grid item key={post.id}>
                                                <TextField 
                                                    variant='standard' 
                                                    value={values[post.name]} 
                                                    onChange={(e)=> handleChange(e)}
                                                    type={post.type} 
                                                    name={post.name} 
                                                    label={post.label} 
                                                    error={Boolean(fieldErrors?.filter(field=>field.field === post.name).length)}
                                                    helperText={fieldErrors?.filter(field=>field.field === post.name).length ? fieldErrors?.filter(field=>field.field === post.name)[0].message : ''}
                                                    required 
                                                />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <Grid container className={classes.rootContainer}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disableElevation
                                        onClick={async()=>{
                                            let response = await updatePost();
                                            
                                            if(response.data?.updatePost?.errors){
                                                setFieldErrors(response.data.updatePost.errors as FieldErrors[]);
                                            }
                                            if(response.data?.updatePost?.data){
                                                history.push('/');
                                                window.location.reload();
                                            }
            

                                        }}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </section>
                ) : (null)
            }
        </>
    )
}

export default UpdatePost