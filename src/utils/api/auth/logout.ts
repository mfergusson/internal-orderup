import { Auth } from 'aws-amplify';

const logoutAWS = async () => {
    await Auth.signOut();
};

export default logoutAWS;
