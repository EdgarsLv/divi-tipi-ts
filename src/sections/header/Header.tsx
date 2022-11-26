import React, { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Menu, MenuItem, Avatar, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeMode } from '../../contexts/ThemeContext';
import { Iconify } from '@/components';
import { NavLink as RouterLink } from 'react-router-dom';
import { useUserImages } from '@/hooks';
import { selectAccountData, setSidebarOpen } from '@/redux/slices/accountSlice';
import SmallNav from './SmallNav';

function Header(): ReactElement {
  const { logout } = useAuth();
  const { toggleTheme } = useThemeMode();
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccountData);
  const { avatar } = useUserImages(account);

  const handleOpen = (): void => {
    dispatch(setSidebarOpen());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  return (
    <Box>
      <AppBar elevation={3} color='inherit' position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            onClick={handleOpen}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <Iconify icon='bx:menu' />
          </IconButton>

          <Box>
            <SmallNav />

            <IconButton id='demo-positioned-button' size='large' onClick={handleClick}>
              <Avatar
                variant='rounded'
                alt={account.name}
                src={avatar}
                sx={{ width: 30, height: 30, bgcolor: (theme) => theme.palette.primary.main }}
              />
            </IconButton>
          </Box>

          <Menu
            id='demo-positioned-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem to='/account' component={RouterLink} onClick={handleClose}>
              <Iconify sx={{ mr: 2 }} icon='la:user-edit' />
              Profils
            </MenuItem>
            <MenuItem to='/settings' component={RouterLink} onClick={handleClose}>
              <Iconify sx={{ mr: 2 }} icon='mdi:mixer-settings' />
              Iestatījumi
            </MenuItem>

            <MenuItem onClick={toggleTheme}>
              <Iconify sx={{ mr: 2 }} icon='material-symbols:invert-colors' />
              Tēma
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Iconify sx={{ mr: 2 }} icon='bx:log-out-circle' />
              Iziet
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
