import { API } from 'aws-amplify';
import getCognitoHeaders from '../../cognitoAuth/getCognitoHeaders';
import { cognitoConfig, setS3Config } from '@/constants/cognitoConfig';
import { Amplify } from '@aws-amplify/core';
import { Storage } from '@aws-amplify/storage';
import { Auth } from '@aws-amplify/auth';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@tanstack/react-query';

Amplify.configure(cognitoConfig);

const bucketEnum = {
  pending: 'test-orderup-uploaded-assets',
  approved: 'test-orderup-public-assets'
}

export const uploadImages = async ({ files, folder }) => {
  const user = await Auth.currentUserInfo();
  const userId = user.id;

  await Promise.all(files.map(async file => {
    return await Storage.put(`${userId}/${folder}/${uuid()}`, file.originFileObj, {
      customPrefix: {
        public: '',
      },
      contentType: file.originFileObj.type
    })
  }));
};

export const deleteImage = async ({ path }) => {
  const user = await Auth.currentUserInfo();
  const userId = user.id;

  await Storage.remove(path, {
    customPrefix: {
      public: '',
    },
    bucket: bucketEnum['approved']
  });

  // await Promise.all(files.map(async file => {
  //   return await Storage.put(`${userId}/${folder}/${uuid()}`, file.originFileObj, {
  //     customPrefix: {
  //       public: '',
  //     },
  //     contentType: file.originFileObj.type
  //   })
  // }));
};

export const listImages = ({ folder, bucket }) => {
  return useQuery({
    queryKey: ['images', 'list', folder, bucket],
    queryFn: async () => {
      console.log('came in')
      const user = await Auth.currentUserInfo();
      const prefix = bucket === 'approved' ? user.attributes.sub : user.id;

      const result = await Storage.list(`${prefix}/${folder}/`, {
        pageSize: 'ALL',
        bucket: bucketEnum[bucket],
        customPrefix: {
          public: ''
        },
      }).then(({ results }) => {
        return results
      });

      return result;
    },
    staleTime: Infinity,
  });
};