import { Auth } from 'aws-amplify';

const loginAWS = async ({ email, password}) => {
  await Auth.signIn(email, password);
};

export default loginAWS;
