import { useEffect } from 'react';
import { UserAuth } from '../../components/UserAuth';
import { PageLoading } from '../../components/PageLoading';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AuthWrapper = ({ state, actions, children }: any) => {
  // const user = state.user;
  // // console.log('user@', user);

  // if (user === undefined) {
  //   return <PageLoading pageLoading={true} />
  // }

  // if (Object?.keys(user)?.length === 0) {
  //   return <UserAuth />
  // }

  return children;
}


const style = {
  position: 'absolute',
  top: '40%',
  left: '45%',
  p: 4,
};