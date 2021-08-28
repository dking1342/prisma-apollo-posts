import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useHeaderStyles from '../styles/useHeaderStyles';

// types ////////////////
interface NavbarProps {

}


const Navbar: React.FC<NavbarProps> = () => {
    const classes = useHeaderStyles();
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(false);
    const user = Boolean(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')!) : null;


    useEffect(()=>{
        if(Boolean(user)){
            setIsLogin(true);
        }
    },[user])

    return (
        <AppBar
            position='relative'
            className={classes.container}
        >
            <Toolbar
            variant='regular'
            classes={{root:classes.toolbar}}
            >
          <nav className={classes.navStart}>
            <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Link to='/'>
                <Typography
                    className={classes.link}
                    component='h6'
                >
                    Post
                </Typography>
            </Link>
          </nav>
          <nav className={classes.navEnd}>
              {
                  !isLogin ? (
                      <>
                        <Link to='/register'>
                            <Typography
                                className={classes.link}
                                component='button'
                            >
                                Register
                            </Typography>
                        </Link>
                        <Link to='/login'>
                            <Typography
                                className={classes.link}
                                component='button'
                            >
                                Login
                            </Typography>
                        </Link>
                      </>
                  ) : (
                      <>
                        <Link to='/create-post'>
                            <Typography
                                className={classes.link}
                                component='button'
                            >
                                Create
                            </Typography>
                        </Link>
                        <Link to='#'>
                            <Typography
                                className={classes.link}
                                component='p'
                            >
                                {user.username}
                            </Typography>
                        </Link>
                        <Button
                            variant='text'
                            color='inherit'
                            onClick={()=>{
                                localStorage.removeItem('userInfo');
                                window.location.reload();
                                history.push('/');
                            }}
                            >
                            Logout
                        </Button>
                        </>
                  )
              }
          </nav>
        </Toolbar>
      </AppBar>
    )
}

export default Navbar;