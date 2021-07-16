import React, { useState } from "react";
import { useAuth } from "react-use-auth";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Navbar from "../components/Navbar";
import { useUser } from "../custom-hooks/useUser";
import { sizes, palette } from "../theme";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  hero: {
    width: "100%",
    position: "relative",
    padding: sizes.app.padding,
    paddingTop: "20px",
    paddingBottom: "80px",
    backgroundColor: palette.darkBlue,
    fontSize: "48px",
    fontWeight: 700,
    color: "#fff",

    "& img": {
      position: "absolute",
      top: "100%",
      left: 0,
    },
  },
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
    borderRadius: sizes.button.borderRadius,
    backgroundColor: palette.blue,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "20px",

    "&:focus": {
      backgroundColor: palette.blue,
    },
  },
}));

interface IField {
  required: boolean;
  value: string;
  default?: string | number | boolean;
}

interface IFieldList {
  [fieldname: string]: IField;
}

interface IFieldError {
  reason: string;
}

interface IFieldListError {
  [fieldname: string]: IFieldError;
}

const Signup = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated()) {
    window.location.replace("/");
  }

  const classes = useStyles();
  const { createUser, userExists } = useUser();
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

    if (errorHappend) {
      throw new Error("Error happend during test suite");
    }

    return errorHappend;
  };

  /**
   * Submit new user
   * @returns All fields
   */
  const submitUser = async (): Promise<IFieldList> => {
    return fields;
  };

  /**
   * Make all the required checks
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

  return (
    <div>
      <Navbar />

      <div className={classes.hero}>
        Finish
        <br />
        <span className={classes.accent}>Account</span>
        <img src={"/wave.svg"} />
      </div>

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

        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.submit}
          onClick={() => {
            fieldsError = {};
            try {
              // Test suite, from least precise, to most precise
              // Must keep `applyFieldsErrorState` at the end of the chain
              submitUser()
                .then(() => performRequireChecks())
                .then(() => performUsernameRegex())
                .then(() => userExists({ username: fields["username"].value }))
                .then((exists) => {
                  if (exists) {
                    storeFieldsError(
                      "username",
                      "This username is already taken."
                    );
                  }
                })
                .then(() => applyFieldsErrorState())
                .then((errorHappend) => {
                  if (!errorHappend) {
                    createUser({
                      id: user.sub,
                      username: fields["username"].value,
                    });
                    window.location.replace("/");
                  }
                })
                .catch((e) => console.log(e));
            } catch (error) {}
          }}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default Signup;
