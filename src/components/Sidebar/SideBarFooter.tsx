import Link from 'next/link';
import { Layout, Divider, App } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation } from '@tanstack/react-query';
import logout from '../../utils/api/auth/logout';

const { Footer } = Layout;

const StyledPersonOutlineIcon = styled(PersonOutlineIcon)`
  cursor: pointer;
  color: #e5e7eb !important;
  &:hover {
      color: white !important;
  }
`

const StyledLogoutIcon = styled(LogoutIcon)`
  cursor: pointer;
  color: #e5e7eb !important;
  &:hover {
      color: white !important;
  }
`

const footerMenuItems = [
  {
    key: '/account',
    icon: <StyledPersonOutlineIcon />
  },
  {
    key: '#logout',
    icon: <StyledLogoutIcon />
  },
];

export const SideBarFooter = () => {
  const router = useRouter();
  const { modal } = App.useApp();
  const { notification } = App.useApp();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'You have sucessfully logged out',
      });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Logout failed',
        description: error?.message
      });
    }
  });

  const handleLogoutClick = () => {
    modal.confirm({
      title: 'Are you sure you want to logout?',
      icon: null,
      centered: true,
      okText: 'Yes',
      onOk() {
        logoutMutation.mutate();
      }
    })
  }

  const onFooterMenuItemClick = (key) => {
    if (key === '#logout') handleLogoutClick();
    else router.push(key);
  }

  return (
    <div>
      <Divider style={{ backgroundColor: '#e5e7eb' }} />
      <StyledFooter>
        {footerMenuItems.map((menuItem) => (
          <div key={menuItem.key} onClick={() => onFooterMenuItemClick(menuItem.key)}>
            {menuItem.icon}
          </div>
        ))}
      </StyledFooter>
    </div>
  )
}

const StyledFooter = styled(Footer)`
  display: flex;
  background-color: #3b3b3b;
  justify-content: end;
  align-items: center;
  column-gap: 12px;
  padding: 12px 24px;
`