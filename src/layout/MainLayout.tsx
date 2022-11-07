import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '../sections/header';
import { Sidebar } from '../sections/sidebar';
import { RouteProgress, ScrollToTop } from '@/components';

export const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function MainLayout(): ReactElement {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Sidebar />
      <Offset />

      <Outlet />

      <Offset />

      <ScrollToTop />

      <RouteProgress />
    </Box>
  );
}

export default MainLayout;
