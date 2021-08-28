import { makeStyles } from "@material-ui/core";

const useAlbumStyles = makeStyles(theme => ({
    container:{
        backgroundColor: theme.palette.background.paper,
        padding:theme.spacing(8, 0, 6),
      },
      buttons:{
        marginTop:theme.spacing(5)
      },
      cardGrid:{
          padding:`${theme.spacing(2.5)}px ${theme.spacing(4)}px`
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
      cardLike:{
        marginTop:`${theme.spacing(2)}px`,
        alignItems:"center",
      },
}));

export default useAlbumStyles;