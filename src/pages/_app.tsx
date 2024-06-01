import '../styles/globals.css'
import { useEffect, createContext, Suspense, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/theme';
import { CssBaseline } from '@mui/material';
import { useAppState } from '../utils/state';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import { Auth } from '@aws-amplify/auth';
import { Amplify, Hub } from '@aws-amplify/core';
import { ViewPortProvider } from '../components/ViewPortProvider';
import styled from 'styled-components';
import { AppLayout } from '../components/Layout';
import Head from 'next/head';
import { PageLoading } from '../components/PageLoading';
import { Inter } from 'next/font/google';
import Router, { useRouter } from 'next/router';
import { ConfigProvider, App } from 'antd';
import { AuthWrapper } from '../components/auth/AuthWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cognitoConfig } from '../constants/cognitoConfig';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

Amplify.configure(cognitoConfig);

const antdTheme = {
  components: {
    token: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
      fontSize: 16,
      width: '100%',
      paddingBlock: 14,
      colorPrimary: '#ff1616',
      colorPrimaryActive: '#ff1616',
      colorPrimaryHover: '#ff1616',
    },
    Switch: {
      colorPrimary: '#ff1616',
      colorPrimaryHover: '#ff4949'
    },
    Collapse: {
      fontSize: 16,
      headerBg: 'white',
    },
    Checkbox: {
      colorPrimary: '#ff1616',
      colorPrimaryActive: '#ff1616',
      colorPrimaryHover: '#ff1616',
    },
    Radio: {
      colorPrimary: '#ff1616',
      colorPrimaryActive: '#ff1616',
      colorPrimaryBorder: '#ffeeee',
      colorPrimaryHover: '#ff1616',
      controlOutline: '#ff1616',
    },
    Select: {
      borderRadius: 8,
      fontSize: 16,
      width: '100%',
      optionSelectedBg: '#ffeeee',
      optionLineHeight: 3,
      optionPadding: '0px 20px',
      controlHeightLG: 50,
    },
    Tabs: {
      inkBarColor: '#ff1616',
      itemSelectedColor: '#ff1616',
      itemHoverColor: '#ff4949',
      itemActiveColor: '#ff1616'
    },
    Pagination: {
      colorPrimary: '#ff1616',
      colorPrimaryHover: '#ff4949',
    },
    InputNumber: {
      borderRadius: 8,
      fontSize: 16,
      width: '100%',
      paddingBlock: 14,
      colorPrimaryHover: '#c0c0c0',
      colorPrimary: '#c0c0c0',
    },
    Button: {
      colorPrimary: '#FF1616',
      colorPrimaryHover: '#ee0000',
      colorPrimaryActive: '#FF1616',
      colorBgContainerDisabled: '#c0c0c0',
      colorTextDisabled: 'grey',
      fontWeight: 600,
      paddingContentHorizontal: 40,
    },
    Slider: {
      colorPrimaryBorderHover: '#ff1616',
      trackHoverBg: '#ff1616',
      handleActiveColor: '#ff1616',
      dotActiveBorderColor: '#ff4949',
      trackBg: '#ff4949',
      handleColor: '#ff1616'
    },
    Breadcrumb: {
      itemColor: '#FF1616',
      linkColor: '#FF1616',
      linkHoverColor: '#FF1616',
      colorBgTextHover: 'none'
    },
    Modal: {
      titleFontSize: 24,
    },
    Statistic: {
      colorTextDescription: 'black'
    },
    DatePicker: {
      colorPrimary: '#ff4949',
      hoverBorderColor: '#e6e6e6',
      cellHoverWithRangeBg: '#ff6363',
      cellActiveWithRangeBg: '#ffe3e3',
      fontSize: 16,
      controlHeight: 50,
      // colorBorder: '#ff4949',
      textHeight: 40,
      cellHeight: 24,
      cellWidth: 36,
      paddingBlock: 0,
      fontWeightStrong: 500,
    },
    RangePicker: {
      textHeight: 40,
      cellHeight: 24,
      cellWidth: 36,
      paddingBlock: 0,
      fontWeightStrong: 500,
    },
    Upload: {
      colorPrimary: '#ff1616',
      colorPrimaryBorder: '#ee0000',
      colorPrimaryHover: '#ee0000',
    }
  }
}

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'optional',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: any) => {
  const { state, actions } = useAppState();

  useEffect(() => {
    try {
      Auth.currentUserInfo().then((user) => {
        actions.setUser(user);
        console.log('user', user);
        Auth.currentCredentials().then((cred) => console.log('creds', cred));
      })
        .catch((error) => {
          actions.setUser({});
        });
    } catch (e) {
      console.log('e', e)
    }
  }, []);

  useEffect(() => {
    Hub.listen('auth', () => {
      try {
        Auth.currentUserInfo().then((user) => {
          actions.setUser(user);
          console.log('user', user);
        })
          .catch(() => {
            actions.setUser({});
          });
      } catch (e) {
        console.log('e', e)
      }
    });
  }, []);

  return (
    <>
      <main className={inter.className}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<PageLoading pageLoading />}>
            <ConfigProvider theme={antdTheme}>
              <App>
                <QueryClientProvider client={queryClient}>
                  <ViewPortProvider>
                    <CssBaseline />
                    <PageLoading pageLoading={state.pageLoading} />
                    <AuthWrapper state={state} actions={actions}>
                      <AppLayout>
                        <Component state={state} actions={actions} {...pageProps} />
                      </AppLayout>
                    </AuthWrapper>
                  </ViewPortProvider>
                </QueryClientProvider>
              </App>
            </ConfigProvider>
          </Suspense>
        </ThemeProvider>
      </main>
    </>
  );
}

export default MyApp
