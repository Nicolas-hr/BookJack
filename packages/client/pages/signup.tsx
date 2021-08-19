import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { LambdaNavbar } from "../components/Navbar";
import PrimaryButton from "../components/PrimaryButton";
import { withProtect } from "../hoc/RouteProtection";
import { IFieldList, IFieldListError } from "../interfaces/IField";
import { palette, sizes } from "../theme";

const useStyles = makeStyles((theme) => ({
  accent: {
    color: palette.blue,
  },
  title: {
    color: palette.title,
    width: "100%",
    paddingLeft: sizes.app.paddingLeft,
    marginBottom: 0,
    marginTop: "65px",
    fontSize: "1.875rem",

    "& + small": {
      color: palette.darkBlue,
      width: "100%",
      fontStyle: "italic",
      fontSize: "1.563rem",
      paddingLeft: sizes.app.paddingLeft,
    },
  },
  inputs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: sizes.app.padding,
    flexDirection: "column",
    marginTop: "50px",
    marginBottom: "80px",
    gap: "30px",
  },
  textField: {
    width: "100%",
  },
  textFieldAdornment: {
    borderRadius: sizes.input.borderRadius,
  },
  submit: {
    width: "100%",
  },
}));

const Signup = () => {
  const classes = useStyles();
  // List of all present fields in the page.
  // !!! DO NOT FORGET TO ADD NEW FIELDS IN THIS LIST !!!
  const [fields, setFields] = useState<IFieldList>({
    username: {
      required: true,
      value: "",
    },
  });
  const [fieldsErrorState, setFieldsErrorsState] = useState<IFieldListError>(
    {}
  );

  /**
   * Update the field value
   * (The first arrow is to grab the props given in the function itself
   * the second one is for the event that trigger the function. OnChange here.)
   *
   * @param field Field name to update
   * @returns
   */
  const handleFieldsChange = (field) => (event) => {
    setFields({
      ...fields,
      [field]: { ...fields[field], value: event.target.value },
    });
  };

  /**
   * Apply error message to field
   *
   * @param fieldName Field to apply error
   * @param message Error message
   * @returns Did errors happend during test suite
   */
  const applyFieldsErrorState = async (
    fieldsError: IFieldListError
  ): Promise<boolean> => {
    const errorHappend = Object.keys(fieldsError).length !== 0;
    setFieldsErrorsState(fieldsError);

    return errorHappend;
  };

  return (
    <React.Fragment>
      <LambdaNavbar />

      <Hero waves={true}>
        Finish your
        <br />
        <span className={classes.accent}>Account</span>
      </Hero>

      <h3 className={classes.title}>Pick your name</h3>
      <small>Identify yourself</small>

      <div className={classes.inputs}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          className={classes.textField}
          onChange={handleFieldsChange("username")}
          helperText={
            fieldsErrorState.hasOwnProperty("username")
              ? fieldsErrorState["username"].reason
              : ""
          }
          error={fieldsErrorState.hasOwnProperty("username")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon></PersonIcon>
              </InputAdornment>
            ),
            classes: {
              adornedEnd: classes.textFieldAdornment,
            },
          }}
        ></TextField>

        <PrimaryButton
          title="Sign up"
          className={classes.submit}
          onClick={() => {
            fetch("/api/auth/signup", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fields,
              }),
            })
              .then(async (res: Response) => {
                if (!res.ok) {
                  applyFieldsErrorState((await res.json())["errors"]);
                  return;
                }

                window.location.replace(res.url);
              })
              .catch((err) => {});
          }}
        />
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default withProtect(Signup);
