import { makeStyles } from "@material-ui/core";

const useHeaderStyles = makeStyles(theme => ({
    container:{
        width:'100%',
    },
    toolbar:{
        display:'flex',
        justifyContent:'space-between',
      },
      navStart:{
        display:'flex',
        alignItems:'center',
        flexGrow:1,
      },
      navEnd:{
          display:'flex',
          alignItems:'center',
          justifyContent:'flex-end',
      },
      icon:{
        marginRight: theme.spacing(2.5),
      },    
      link:{
        backgroundColor:'transparent',
        color:theme.palette.getContrastText(theme.palette.primary.main),
        border:'none',
        outline:'none',
        cursor:'pointer',
        padding:'0px 16px',
        textAlign:'center',
    }
}))

export default useHeaderStyles;