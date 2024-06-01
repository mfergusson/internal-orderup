import { App, Layout, Alert, Button } from 'antd';
import { Sidebar } from './Sidebar/Sidebar';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const { Content, Footer } = Layout;

export const AppLayout = ({ children }) => {

  return (
    <Layout hasSider>
      <Sidebar />
      <Layout>
        <Content>
          <Wrapper>
            {children}
          </Wrapper>
        </Content>
        <Footer style={{ backgroundColor: 'white' }}>
          &copy; {new Date().getFullYear()} OrderUp
        </Footer>
      </Layout>
    </Layout>
  )
}

const Wrapper = styled.div`
  padding: 24px;
  height: 100%;
`