import Link from 'next/link';
import styled from 'styled-components';
import OrderUpLogo from '../../components/icons/OrderUpLogo';
import { Typography } from '@mui/material';

export const SideBarHeader = () => {
  return (
    <div>
      <StyledLink href='/'>
        <HeaderContainer>
          <OrderUpLogo color='#ff1616'></OrderUpLogo>
          <StyledTypography variant='h5'>Internal</StyledTypography>
        </HeaderContainer>
      </StyledLink>
    </div>
  )
};

const StyledTypography = styled(Typography)`
  font-weight: 600 !important;
  color: #e5e7eb !important;
`

const StyledLink = styled(Link)`
  &:hover {
    color: black;
  }
`

const HeaderContainer = styled.div`
 display: flex;
 flex-direction: column;
 column-gap: 6px;
 padding: 16px 24px 32px 24px
`