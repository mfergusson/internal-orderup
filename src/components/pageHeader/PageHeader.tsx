import styled from 'styled-components';
import { Typography } from '@mui/material';

export const PageHeader = ({ title, description, actions }: { title: string, description?: string, actions?: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '24px', margin: '-24px -24px 0 -24px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 4px 0px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Typography style={{ fontWeight: '500' }} variant='h4'>{title}</Typography>
        {description && <Typography style={{ fontWeight: '400' }} variant='subtitle1'>{description}</Typography>}
      </div>
      {actions}
    </div>
  )
}

const PageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 8px;
  column-gap: 16px;
  backgound-color: white;
  padding: 24px;
  margin-bottom: 24px;
`