import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div<any>`
  padding: ${({ padding }) => padding};
`;

export const LoadingSpinner = ({ size = 30, padding = '5px' }) => (
  <Container padding={padding}>
    <CircularProgress style={{ color: '#ff1616' }} size={size} />
  </Container>
);