import { makeStyles } from "@material-ui/core";

const useSigninStyles = makeStyles(theme=>({
    sectionContainer:{
        width:'100vw',
    },
    gridContainer:{
        margin:'24px 0px',
        width:'100%',
    },
    iconContainer:{
        padding:'20px',
        backgroundColor:theme.palette.secondary.main,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'50%',
        color:'#fff',
        marginBottom:theme.spacing(1),
    },
    rootContainer:{
        width:'100%',
        marginTop:'16px',
        display:'block',
        '& > *':{
            width:'100%'
        }
    },
    inputContainer:{
        width:'100%',
        '& .MuiGrid-item':{
            width:'100%'
        },
        '& .MuiFormControl-root':{
            width:'100%'
        }
    },
    linkContainer:{
        margin:'16px 0px'
    },
    links:{
        textDecoration:'none'
    }
}));

export default useSigninStyles;