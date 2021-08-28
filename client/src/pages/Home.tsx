import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, LinearProgress, Typography } from '@material-ui/core';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import Buttons from '../components/Buttons';
import { useGetPostsQuery } from '../generated/graphql';
import useAlbumStyles from './../styles/useAlbumStyles';


// types ////////////////
interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    const classes = useAlbumStyles();
    const {data,loading} = useGetPostsQuery();

    return (
        <>
        {
            loading ? (
                <LinearProgress color="secondary" />
            ) : data && !loading && data.getPosts?.posts ? (
                <>
                    <div className={classes.container}>
                        <Container
                            maxWidth='sm'
                        >
                        <Typography
                            variant='h2'
                            align='center'
                            color='textPrimary'
                            gutterBottom
                        >
                            Reddit
                        </Typography>
                        <Typography
                            variant='h5'
                            align='center'
                            color='textSecondary'
                            paragraph
                        >
                            Read through posts made by users
                        </Typography>
                        </Container>
                    </div>
                    <Container
                        className={classes.cardGrid}
                        maxWidth='md'
                    >
                        <Grid
                        container
                        spacing={4}
                        >
                        {
                            data.getPosts.posts ? (
                                data.getPosts.posts.map((post)=>(
                                <Grid
                                    key={post!.uuid}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <Card
                                    className={classes.card}
                                    >
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image='https://source.unsplash.com/random'
                                        title='Image title'
                                    />
                                    <Grid container className={classes.cardLike}>
                                        <Grid item>
                                            <Button disableRipple>
                                                <AiFillHeart color="red" />
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            0 likes
                                        </Grid>
                                    </Grid>
                                    <CardContent
                                        className={classes.cardContent}
                                    >
                                    <Typography
                                    gutterBottom
                                    variant='h5'
                                    >
                                    {post!.title}
                                    </Typography>
                                    <Typography>
                                        {post!.body}
                                    </Typography>
                                    <CardActions>
                                        <Buttons post={post!} />
                                    </CardActions>
                                </CardContent>
                                </Card>
                            </Grid>
                            ))
                            ) : (null)
                            
                        }
                        </Grid>
                    </Container>
                </>
            ) : ( null )
        }
      </>
    )
}

export default Home