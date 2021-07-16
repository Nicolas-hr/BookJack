/**
 * Input field interface to facilitate checks
 */
export interface IField {
  required: boolean;
  value: string;
}

/**
 * Dynamic list of IField with id as key.
 * e.g.; { username: { ...IField}, password: { ...IField } }
 */
export interface IFieldList {
  [fieldname: string]: IField;
}

/**
 * Field error interface to show message in view
 */
export interface IFieldError {
  reason: string;
}

/**
 * Dynamic list of IFieldError with if as key.
 * e.g.; { username: { ...IFieldError }, password: { ...IFieldError } }
 */
export interface IFieldListError {
  [fieldname: string]: IFieldError;
}
