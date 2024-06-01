import { Auth } from 'aws-amplify';

const getCognitoHeaders = async () => {
  const idToken = await (await Auth.currentSession()).getIdToken().getJwtToken();

  return {
    Authorization: idToken,
  }
};

export default getCognitoHeaders;
