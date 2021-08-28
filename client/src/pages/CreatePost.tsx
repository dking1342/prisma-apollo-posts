import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FieldErrors, useCreatePostMutation } from '../generated/graphql';
import { useForm } from '../hooks/useForm';
import useSigninStyles from '../styles/useSigninStyles';


interface CreatePostProps {

}

const CreatePost: React.FC<CreatePostProps> = () => {
    const classes = useSigninStyles();
    const history = useHistory();
    const userId = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : '';

    const initialState = {title:'',body:''};
    let { values, handleChange } = useForm(initialState);
    const [fieldErrors,setFieldErrors]=useState<FieldErrors[] | null >([]);
    const [createPost] = useCreatePostMutation({
        variables:{
            title:values.title,
            body:values.body,
            userId:userId.uuid
        }
    })

    if(!Boolean(userId)){
        history.push('/login');
    };

    return (
        <section className={classes.sectionContainer}>
            <Container maxWidth='xl' >
                <Grid container alignItems='center' justifyContent='center' spacing={3} className={classes.gridContainer}>
                    <Grid item container alignItems='center' direction='column' justifyContent='center'>
                        <Typography variant='h5' component='h5' color='textPrimary' gutterBottom >
                            Create Post
                        </Typography>
                    </Grid>
                    <Grid container direction='column' spacing={2} alignItems='center' className={classes.inputContainer}>
                        <Grid item>
                            <TextField 
                                variant='standard' 
                                type="text" 
                                name="title" 
                                label='Title' 
                                value={values.title}
                                onChange={(e)=>handleChange(e)}
                                error={Boolean(fieldErrors?.filter(field=>field.field === 'title').length)}
                                helperText={fieldErrors?.filter(field=>field.field === 'title').length ? fieldErrors?.filter(field=>field.field === 'title')[0].message : ''}
                                required 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                variant='standard' 
                                type="text" 
                                name="body" 
                                label='Body' 
                                value={values.body}
                                onChange={(e)=>handleChange(e)}
                                error={Boolean(fieldErrors?.filter(field=>field.field === 'body').length)}
                                helperText={fieldErrors?.filter(field=>field.field === 'body').length ? fieldErrors?.filter(field=>field.field === 'body')[0].message : ''}
                                multiline 
                                maxRows={4} 
                                required 
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.rootContainer}>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={async()=>{
                                let response = await createPost();
                                
                                if(response.data?.createPost?.errors){
                                    setFieldErrors(response.data.createPost.errors as FieldErrors[]);
                                }
                                if(response.data?.createPost?.data){
                                    history.push('/');
                                    window.location.reload();
                                }

                            }}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}

export default CreatePost