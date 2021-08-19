import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 200,
  },
  label: {
    paddingLeft: 10,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

/**
 * Custom input field style
 */
const BootstrapInput = withStyles((theme) =>
  createStyles({
    input: {
      borderRadius: 14,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: "1rem",
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),

      "&:focus": {
        borderRadius: 14,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

/**
 * Multiple select component
 * @see https://material-ui.com/components/selects/#multiple-select
 * @param props Custom props
 * @returns MultiSelect component
 */
const MultiSelect: React.FC<{
  onChange?: (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => void;
  choices: string[];
  className?: string;
}> = (props) => {
  const classes = useStyles();
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);

  return (
    <FormControl className={`${classes.formControl} ${props.className}`}>
      <InputLabel id="multiselect-id"></InputLabel>

      <Select
        labelId="multiselect-id"
        id="mutiple-chip"
        multiple
        value={selectedChoices}
        onChange={(event) => {
          setSelectedChoices(event.target.value as string[]);
          props.onChange(event);
        }}
        input={<BootstrapInput id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
                size="small"
              />
            ))}
          </div>
        )}
      >
        {props.choices.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selectedChoices.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
