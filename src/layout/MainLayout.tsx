import { ReactElement, useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '../sections/header';
import { Sidebar } from '../sections/sidebar';
import { RootSubscriptions, RouteProgress } from '@/components';
import { useAppDispatch } from '@/redux/store';
import { fetchAccountData } from '@/redux/slices/accountSlice';
import { useAuth } from '@/contexts/AuthContext';
import { setFilters } from '@/redux/slices/usersSlice';

export const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function MainLayout(): ReactElement {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const value = localStorage.getItem('filters');

    dispatch(fetchAccountData(user?.id));

    if (value != null) {
      dispatch(setFilters(JSON.parse(value)));
    }
  }, [user?.id, dispatch]);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Sidebar />
      <Offset />

      <Outlet />

      <Offset />

      <ScrollRestoration />

      <RootSubscriptions />
      <RouteProgress />
    </Box>
  );
}

export default MainLayout;
