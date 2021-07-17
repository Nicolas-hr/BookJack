import React, { useState } from "react";
import { useAuth } from "react-use-auth";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/styles";
import Navbar from "../components/Navbar";
import { useUser } from "../custom-hooks/useUser";
import { sizes, palette } from "../theme";
import { IFieldList, IFieldListError } from "../interfaces/Field";
import Hero from "../components/Hero";
import PrimaryButton from "../components/PrimaryButton";
import Footer from "../components/Footer";
import { asLoggedRequired } from "../hoc/useProtect";

const useStyles = makeStyles((theme) => ({
  accent: {
    color: palette.blue,
  },
  inputs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: sizes.app.padding,
    flexDirection: "column",
    paddingTop: "80px",
    gap: "80px",
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
  const { isAuthenticated, user } = useAuth();

  // Edge case handling
  if (!isAuthenticated()) {
    window.location.replace("/");
  }

  const classes = useStyles();
  const { createUser, userExists } = useUser();
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
  let fieldsError: IFieldListError = {};

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
   * Store the field error
   * @param fieldId Field id
   * @param reason Reason of the error
   */
  const storeFieldsError = (fieldId: string, reason: string): void => {
    if (!fieldsError.hasOwnProperty(fieldId)) {
      fieldsError[fieldId] = { reason };
    }
  };

  /**
   * Apply error message to field
   *
   * @param fieldName Field to apply error
   * @param message Error message
   * @returns Did errors happend during test suite
   */
  const applyFieldsErrorState = async (): Promise<boolean> => {
    const errorHappend = Object.keys(fieldsError).length !== 0;
    setFieldsErrorsState(fieldsError);

    // Throw error to break the `then()` chain before the creation of the new user
    if (errorHappend) {
      throw new Error("Error happend during test suite");
    }

    return errorHappend;
  };

  /**
   * Begin the test suite
   *
   * @returns All fields
   */
  const submitUser = async (): Promise<IFieldList> => {
    return fields;
  };

  /**
   * Make all the required checks
   *
   * @param fields Field list
   */
  const performRequireChecks = async (): Promise<boolean> => {
    for (let key in fields) {
      if (fields[key].required && fields[key].value === "") {
        storeFieldsError(key, "Field required");
      }
    }

    return true;
  };

  /**
   * Make regex checks on username
   *
   * @param fields Field list given by the previous promise
   * @returns
   */
  const performUsernameRegex = async (): Promise<boolean> => {
    if (!/^[a-zA-Z0-9_-]{3,15}$/.test(fields["username"].value)) {
      storeFieldsError(
        "username",
        "The username can only contains a-z, A-Z, 0-9, _, or -"
      );
    }

    return true;
  };

  /**
   * Chek if the user exists
   *
   * @returns
   */
  const performUserExistsCheck = async (): Promise<boolean> => {
    const exists = await userExists({ username: fields["username"].value });

    if (exists) {
      storeFieldsError("username", "This username is already taken.");
    }

    return true;
  };

  /**
   * Commit changes
   *
   * @param greenLight Do we have green light to commit
   * @returns
   */
  const commitUserCreation = async (errors: boolean): Promise<boolean> => {
    if (!errors) {
      createUser({
        id: user.sub,
        username: fields["username"].value,
      });
      window.location.replace("/");
    }

    return true;
  };

  return (
    <React.Fragment>
      <Navbar />

      <Hero waves={true}>
        Finish
        <br />
        <span className={classes.accent}>Account</span>
      </Hero>

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
            fieldsError = {};
            try {
              // Test suite, from least precise, to most precise
              // Must keep `applyFieldsErrorState` at the end of the chain
              submitUser()
                .then(() => performRequireChecks())
                .then(() => performUsernameRegex())
                .then(() => performUserExistsCheck())
                // Update state variable to show errors to user
                .then(() => applyFieldsErrorState())
                // If the chain asn't broke with an Error threw before
                .then((err) => commitUserCreation(err))
                // If the chain as broke
                .catch((e) => console.log(e));
            } catch (error) {}
          }}
        />
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default asLoggedRequired(Signup);
