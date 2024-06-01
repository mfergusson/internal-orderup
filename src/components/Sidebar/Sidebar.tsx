import { Affix, Layout, Menu, ConfigProvider, Divider, Badge } from 'antd';
import Link from 'next/link';
import { SideBarHeader } from './SideBarHeader';
import { SideBarFooter } from './SideBarFooter';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { useRouter } from 'next/router';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import HistoryIcon from '@mui/icons-material/History';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const { Content, Sider, Footer } = Layout;

const theme = {
  components: {
    Menu: {
      darkItemBg: '#3b3b3b',
      darkItemSelectedBg: '#767676',
      itemBorderRadius: 0,
      fontSize: 16,
      itemHeight: 56,
      itemMarginInline: 0,
      activeBarWidth: 3,
    }
  }
};

export const Sidebar = () => {
  const router = useRouter();
  const routerBasePath = router.pathname.split('/')[1];
  const queryClient = useQueryClient();

  const menuItems = [
    {
      key: '/image-approval',
      label: 'Image approval',
      icon: <HomeOutlinedIcon />
    },
    {
      key: '/refund-disputes',
      label: 'Refund disputes',
      icon: <DisplaySettingsIcon />
    }
  ];

  return (
    <ConfigProvider theme={theme}>
      <Affix>
        <Sider
          breakpoint='md'
          collapsedWidth={0}
        >
          <Layout style={{ backgroundColor: '#3b3b3b', height: '100vh' }}>
            <SideBarHeader />
            <Content>
              <Menu
                selectedKeys={[`/${routerBasePath}`]}
                theme='dark'
                mode='inline'
                items={menuItems}
                onClick={async ({ key }) => router.push(key)}
              />
            </Content>
            <SideBarFooter />
          </Layout>
        </Sider>
      </Affix>
    </ConfigProvider>
  )
}