import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LoadingSpinner } from './LoadingSpinner';
import styled from 'styled-components';

export const PageLoading = ({ pageLoading }) => {
  if (!pageLoading) {
    return null;
  }

  return (
    <Modal
      open
      aria-labelledby='loading'
      aria-describedby='page-loading'
    >
      <StyledBox sx={style}>
        <LoadingSpinner size={60}></LoadingSpinner>
      </StyledBox>
    </Modal>
  )
}

const StyledBox = styled(Box)`
  &:focus-visible {
    outline: none;
  }
`

const style = {
  position: 'absolute',
  top: '40%',
  left: '45%',
  p: 4,
};