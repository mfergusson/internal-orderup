import { Typography } from '@mui/material';
import styled from 'styled-components';
import { Form, App, Input, Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import login from '../utils/api/auth/login';
import { Amplify } from '@aws-amplify/core';
import { cognitoConfig } from '../constants/cognitoConfig';
import { Auth } from '@aws-amplify/auth';
import OrderUpLogo from './icons/OrderUpLogo';
import { mobile } from '../constants/breakpoints';

Amplify.configure(cognitoConfig);

export const UserAuth = () => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'You have sucessfully logged in',
      });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Login failed',
        description: error?.message
      })
    }
  });

  const { isPending } = loginMutation;

  return (
    <AuthContainer>
      <OrderUpLogo color='#ff1616'></OrderUpLogo>
      <Wrapper>
        <Typography style={{ fontWeight: '500', textAlign: 'center' }} component='h1' variant='h4'>Welcome to OrderUp Restaurant Hub</Typography>
        <Form form={form} onFinish={loginMutation.mutate} layout='vertical'>
          <Form.Item name='email' rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item name='password' rules={[
            { required: true, message: 'Please enter your password' },
          ]}>
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item>
            <Button style={{ width: '100%' }} size='large' type='primary' htmlType='submit' loading={isPending}>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </AuthContainer>
  )
}

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  @media ${mobile} {
    width: 400px;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  row-gap: 24px;
`