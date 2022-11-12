import { ReactElement, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '../sections/header';
import { Sidebar } from '../sections/sidebar';
import { RouteProgress, ScrollToTop } from '@/components';
import { useAppDispatch } from '@/redux/store';
import { fetchAccountData } from '@/redux/slices/accountSlice';
import { useAuth } from '@/contexts/AuthContext';

export const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function MainLayout(): ReactElement {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccountData(user?.id));
  }, [user?.id, dispatch]);
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
