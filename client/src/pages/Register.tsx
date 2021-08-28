import { Button, Container, Grid, Icon, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { textfields } from '../data/register';
import { FieldErrors, useRegisterMutation } from '../generated/graphql';
import { useForm } from '../hooks/useForm';
import useSigninStyles from '../styles/useSigninStyles';


interface RegisterProps {

}

const Register: React.FC<RegisterProps> = () => {
    const classes = useSigninStyles();
    const history = useHistory();
    const initialState = {
        email:'',
        username:'',
        password:''
    };

    let { values, handleChange } = useForm(initialState);
    const [register] = useRegisterMutation({
        variables:{
            email:values.email,
            username:values.username!,
            password:values.password
        },
        
    });

    const [fieldErrors,setFieldErrors]=useState<FieldErrors[] | null >([]);

    return (
        <section className={classes.sectionContainer}>
            <Container maxWidth='xs' >
                <Grid container alignItems='center' justifyContent='center' spacing={3} className={classes.gridContainer}>
                    <Grid item container alignItems='center' direction='column' justifyContent='center'>
                        <Icon className={classes.iconContainer}>
                            <LockOutlinedIcon />
                        </Icon>
                        <Typography variant='h5' component='h5' color='textPrimary' gutterBottom >
                            Register
                        </Typography>
                    </Grid>
                    <Grid container direction='column' spacing={2} alignItems='center' className={classes.inputContainer}>
                        {
                            textfields.map(tf=>(
                                <Grid item key={tf.id}>
                                    <TextField 
                                        variant='outlined' 
                                        value={values[tf.name]} 
                                        onChange={(e)=>handleChange(e)} 
                                        type={tf.type} 
                                        name={tf.name} 
                                        label={tf.label} 
                                        error={Boolean(fieldErrors?.filter(field=>field.field === tf.name).length)}
                                        helperText={fieldErrors?.filter(field=>field.field === tf.name).length ? fieldErrors?.filter(field=>field.field === tf.name)[0].message : ''}
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
                                let response = await register();
                                
                                if(response.data?.register?.errors){
                                    setFieldErrors(response.data.register.errors as FieldErrors[]);
                                }
                                if(response.data?.register?.data){
                                    localStorage.removeItem('userInfo');
                                    localStorage.setItem('userInfo',JSON.stringify(response.data.register.data));
                                    history.push('/');
                                    window.location.reload();
                                }
                            }}
                        >
                            Register
                        </Button>
                    </Grid>
                    <Grid container alignItems='center' justifyContent='space-between' className={classes.linkContainer}>
                        <Grid item>
                            <Link to='/login' className={classes.links}>
                                <Typography
                                    variant='body2'
                                    color='primary'
                                >
                                    Already have an account? Sign In
                                </Typography>
                            </Link>
                        </Grid>    
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}

export default Register