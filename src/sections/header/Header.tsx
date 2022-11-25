import React, { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Menu, MenuItem, Avatar, Badge, BadgeProps } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setOpen } from '../../redux/slices/counterSlice';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeMode } from '../../contexts/ThemeContext';
import { Iconify } from '@/components';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { setListOpen } from '@/redux/slices/messagesSlice';
import { useCounters, useUserImages } from '@/hooks';
import { styled } from '@mui/material/styles';
import { selectAccountData } from '@/redux/slices/accountSlice';

export default function Header(): ReactElement {
  const { logout } = useAuth();
  const { toggleTheme } = useThemeMode();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { newMessages, statistics, newDiscussions } = useCounters();
  const account = useAppSelector(selectAccountData);
  const { avatar } = useUserImages(account);

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
            <IconButton onClick={() => navigate('/discussions')} color='primary'>
              <StyledBadge color='primary' badgeContent={newDiscussions}>
                <Iconify icon='bx:bx-chat' sx={{ width: 21, height: 21 }} />
              </StyledBadge>
            </IconButton>

            <IconButton onClick={() => navigate('/statistics')} color='primary'>
              <StyledBadge color='primary' badgeContent={statistics}>
                <Iconify icon='eva:eye-outline' sx={{ width: 21, height: 21 }} />
              </StyledBadge>
            </IconButton>

            <IconButton onClick={handleMessages} color='primary'>
              <StyledBadge color='primary' badgeContent={newMessages}>
                <Iconify icon='fluent:mail-28-regular' sx={{ width: 21, height: 21 }} />
              </StyledBadge>
            </IconButton>

            <IconButton onClick={toggleTheme} color='primary'>
              <Iconify icon='ic:baseline-invert-colors' />
            </IconButton>

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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
