import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useSigninStyles from '../styles/useSigninStyles';


interface CreatePostProps {

}

const CreatePost: React.FC<CreatePostProps> = () => {
    const classes = useSigninStyles();

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
                            <TextField variant='standard' type="text" name="title" label='Title' required />
                        </Grid>
                        <Grid item>
                            {/* <TextareaAutosize /> */}
                            <TextField variant='standard' type="text" name="body" label='Body' multiline maxRows={4} required />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.rootContainer}>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
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