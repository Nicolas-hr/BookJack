/**
 * Disconnect the all the third party provider including standard auth0 account from auth0
 *
 * @see https://github.com/nextauthjs/next-auth/issues/638#issuecomment-717535481
 * @param req Reqest
 * @param res Response
 */
export default function handler(req, res) {
  const returnTo = encodeURI("http://localhost:3000");
  res.redirect(
    `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${returnTo}&federated`
  );
}
