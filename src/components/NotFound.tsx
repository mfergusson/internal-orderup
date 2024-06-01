import OrderUpLogo from '@/components/icons/OrderUpLogo';
import { Typography } from '@mui/material';

export const NotFound = ({ description }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>
    <OrderUpLogo color='rgba(0, 0, 0, 0.25)'></OrderUpLogo>
    {description}
  </div>
);