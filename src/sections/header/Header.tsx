import React, { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Menu, MenuItem, Avatar } from '@mui/material';
import { useAppDispatch } from '../../redux/store';
import { setOpen } from '../../redux/slices/counterSlice';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeMode } from '../../contexts/ThemeContext';
import { Iconify } from '@/components';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { setListOpen } from '@/redux/slices/messagesSlice';

export default function Header(): ReactElement {
  const { logout } = useAuth();
  const { toggleTheme } = useThemeMode();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpen = (): void => {
    dispatch(setOpen());
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

  const handleMessages = () => {
    if (!pathname.includes('/messages/')) {
      navigate('/messages');
    }

    dispatch(setListOpen(true));
  };

  return (
    <Box>
      <AppBar elevation={1} color='inherit' position='fixed'>
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
            <IconButton onClick={handleMessages} color='primary'>
              <Iconify icon='fluent:mail-28-regular' />
            </IconButton>

            <IconButton onClick={toggleTheme} color='primary'>
              <Iconify icon='ic:baseline-invert-colors' />
            </IconButton>

            <IconButton id='demo-positioned-button' size='large' onClick={handleClick}>
              <Avatar
                variant='rounded'
                sx={{ width: 30, height: 30, bgcolor: (theme) => theme.palette.primary.main }}
              >
                E
              </Avatar>
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
              Profils
            </MenuItem>
            <MenuItem to='/settings' component={RouterLink} onClick={handleClose}>
              Iestatījumi
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
