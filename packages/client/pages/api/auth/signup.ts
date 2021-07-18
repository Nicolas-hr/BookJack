import { NextApiRequest, NextApiResponse } from "next";
import { IFieldListError, IFieldList } from "../../../interfaces/IField";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { getSession } from "next-auth/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(401).redirect("/");
    return null;
  }

  const fields: IFieldList = req.body["fields"];
  let fieldsError: IFieldListError = {};

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
   * Make all the required checks
   */
  const performRequireChecks = async (): Promise<any> => {
    for (let key in fields) {
      if (fields[key].required && fields[key].value === "") {
        storeFieldsError(key, "Field required");
      }
    }
  };

  /**
   * Make regex checks on username
   */
  const performUsernameRegex = async (): Promise<any> => {
    if (!/^[a-zA-Z0-9_-]{3,15}$/.test(fields["username"].value)) {
      storeFieldsError(
        "username",
        "The username can only contains a-z, A-Z, 0-9, _, or -"
      );
    }
  };

  /**
   * Chek if the user exists
   */
  const performUserExistsCheck = async (): Promise<any> => {
    const { data } = await client.query({
      query: gql`
        query ($username: String!) {
          searchUserByUsername(username: $username) {
            id
          }
        }
      `,
      variables: {
        username: fields["username"].value,
      },
    });

    if (data?.searchUserByUsername) {
      storeFieldsError("username", "This username is already taken.");
    }
  };

  /**
   * Commit changes
   */
  const commitUserCreation = async (): Promise<any> => {
    const session = await getSession({ req });

    await client.mutate({
      mutation: gql`
        mutation ($username: String!, $email: String!) {
          addUser(username: $username, email: $email) {
            id
            username
            email
          }
        }
      `,
      variables: {
        username: fields["username"].value,
        email: session.user.email,
      },
    });
  };

  // Execute the test suite
  await Promise.all([
    performRequireChecks(),
    performUsernameRegex(),
    performUserExistsCheck(),
  ]);

  if (Object.keys(fieldsError).length !== 0) {
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
    res.status(418).json({ errors: fieldsError });
    return;
  }

  await commitUserCreation();
  res.status(201).redirect("/home");
};
