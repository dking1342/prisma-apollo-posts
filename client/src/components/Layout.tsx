import { makeStyles, Container, Box } from '@material-ui/core';
import React from 'react'
import Navbar from './Navbar';

interface LayoutProps {

}

const useStyles = makeStyles(theme=>({
    section:{
        width:'100%',
        height:'100%',
        flexGrow:1,
        overflow:'auto',
        padding:0,
    },
    container:{
        width:'100%',
        height:'100%',
        flexWrap:'nowrap',
    },
    paperHeight:{
        height:300,
        padding:theme.spacing(2)
    }
}))

const Layout: React.FC<LayoutProps> = ({children}) => {
    const classes = useStyles();

    return(
        <Container maxWidth='lg' className={classes.section}>
            <Navbar />
            <Box className={classes.container}>
                {children}            
            </Box>            
        </Container>
    )
}

export default Layout