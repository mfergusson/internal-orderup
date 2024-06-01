import { Storage } from '@aws-amplify/storage';

export const cognitoConfig = {
  Auth: {
    identityPoolId: 'me-south-1:deb6308a-9d79-42f5-9fa8-285495b0ad55', // REQUIRED - Amazon Cognito Identity Pool ID
    region: 'me-south-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'me-south-1_rjD739mh5', // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '2v63nv80rjr0spd8se1r7ut096', // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  },
  API: {
    endpoints: [
      {
        name: 'apigateway',
        endpoint: `https://${process.env.APP_ENV}-middleware.orderup.ae`,
        service: 'execute-api',
        region: 'me-central-1',
      }
    ],
  },
  //other bucket, test-orderup-public-assets
  Storage: {
    bucket: `${process.env.APP_ENV}-orderup-uploaded-assets`, //REQUIRED -  Amazon S3 bucket
    region: 'me-central-1', //OPTIONAL -  Amazon service region
  }
};

export const setS3Config = async (bucket) => {
  const bucketEnum = {
    pending: `${process.env.APP_ENV}-orderup-uploaded-assets`,
    approved: `${process.env.APP_ENV}-orderup-public-assets`
  }
  await Storage.configure({
    bucket: bucketEnum[bucket],
    region: 'me-central-1',
    // identityPoolId: process.env.REACT_APP_identityPoolId
  });
}