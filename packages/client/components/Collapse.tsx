import { makeStyles } from "@material-ui/core/styles";
import { ReactNode } from "react";
import { sizes } from "../theme";

const useStyles = makeStyles(() => ({
  collapse: {
    padding: sizes.root.padding,
    position: "absolute",
    width: "100%",
    left: 0,
    height: 0,
    visibility: "collapse",
    backgroundColor: "white",
    boxShadow: "0px 15px 10px rgba(0, 0, 0, 0.15)",
    paddingBottom: "24px",
  },
  open: {
    height: "auto",
    visibility: "visible",
  },
}));

/**
 * Collapse component
 * @param props Custom props
 * @returns Collapse component
 */
const Collapse: React.FC<{ children?: ReactNode; open: boolean }> = (props) => {
  const classes = useStyles();

  return (
    <div className={`${classes.collapse} ${props.open && classes.open}`}>
      {props.children}
    </div>
  );
};

export default Collapse;
