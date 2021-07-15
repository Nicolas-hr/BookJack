import { makeStyles } from "@material-ui/core";
import { sizes, palette } from "../../theme";

const useStyles = makeStyles((theme) => ({
  drawerDelimiter: {
    padding: sizes.drawer.padding,
    paddingBottom: "0",
    backgroundColor: palette.darkBlue,
  },
  logged: {
    backgroundColor: palette.white,
  },
  notLogged: {
    backgroundColor: palette.darkBlue,
  },
}));

const DrawerDelimiter: React.FC<{
  logged: boolean;
}> = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.drawerDelimiter} ${
        props.logged ? classes.logged : classes.notLogged
      }`}
    >
      <hr />
    </div>
  );
};

export default DrawerDelimiter;
