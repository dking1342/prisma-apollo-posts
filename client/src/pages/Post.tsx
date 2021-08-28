import { Card, CardContent, CardMedia, Container, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router';
import { useGetPostQuery } from '../generated/graphql';

interface PostProps {

}

const useStyles = makeStyles(theme=>({
    container:{
        backgroundColor: theme.palette.background.paper,
        padding:theme.spacing(8, 0, 6),
        width:'100vw',
        height:'100vh',
    },
    card:{
        display:'flex',
        height:'100%',
        flexDirection:'column',
    },
    cardMedia:{
        paddingTop:'56.25%',
    },
    cardContent:{
        flexGrow:1,
    },
}))

const Post: React.FC<PostProps> = () => {
    const classes = useStyles();
    const history = useHistory();
    let postId = history.location.pathname.split('/')[2];
    const { data, loading } = useGetPostQuery({
        variables:{
            postId
        }
    });

    if(loading){
        return(
            <LinearProgress color="secondary" />
        )
    }

    if(!loading && data?.getPost?.errors){
        return(
            <div>
                <div>Error when loading post</div>
                <div>{data.getPost.errors.map(err=> err!.message)}</div>
            </div>
        )
    }

    if(Boolean(data)){
        return(
            <section className={classes.container}>
                <Container maxWidth="md">
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid 
                            item
                            xs={12}
                            sm={8}
                        >
                            <Card className={classes.card}>
                                <CardMedia
                                        className={classes.cardMedia}
                                        image='https://source.unsplash.com/random'
                                        title='Image title'
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        {data!.getPost!.data!.title || ''}
                                    </Typography>
                                    <Typography gutterBottom variant="body1">
                                        {data!.getPost!.data!.body || ''}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        )
    }
    return(
        <div></div>
    )
}

export default Post