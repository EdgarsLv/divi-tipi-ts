import * as React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Children, Items, navConfig } from './NavConfig';
import { useAppDispatch } from '../../redux/store';
import { useGetActiveLink } from '@/hooks';
import { SxProps, Theme } from '@mui/material/styles';
import { Iconify } from '@/components';
import { setSidebarOpen } from '@/redux/slices/accountSlice';

function MobileMenu() {
  return (
    <>
      {navConfig.map(({ subheader, items }, i) => (
        <List key={`list-${i}`} disablePadding sx={{ px: 2, width: 250 }} component='nav'>
          <ListSubheader sx={{ backgroundColor: 'transparent' }} component='div'>
            {subheader}
          </ListSubheader>

          {items.map((item, index) => (
            <NavItemRoot key={`root-${index}`} item={item} />
          ))}
        </List>
      ))}
    </>
  );
}

export default MobileMenu;

function NavItemRoot({ item }: { item: Items }) {
  const { title, path, children, icon } = item;
  const dispatch = useAppDispatch();

  const active = useGetActiveLink(path);

  const [open, setOpens] = React.useState(false);

  const handleClick = () => {
    setOpens(!open);
  };
  const handleMenu = () => {
    dispatch(setSidebarOpen());
  };

  const renderContent = (
    <>
      <ListItemIcon sx={{ color: active ? (theme) => theme.palette.primary.main : 'inherit' }}>
        <Iconify sx={{ width: 20, height: 20 }} icon={icon} />
      </ListItemIcon>
      <ListItemText sx={{ textTransform: 'capitalize' }} primary={title} />
      {children && <ExpandIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <>
        <ListItemButton onClick={handleClick}>{renderContent}</ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {(item.children || []).map((item, index) => (
              <ListSubItem key={`sub-item-${index}`} title={item.title} path={item.path} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton
      sx={{ '&.active': { color: (theme) => theme.palette.primary.main } }}
      onClick={handleMenu}
      component={RouterLink}
      to={path}
      end
    >
      {renderContent}
    </ListItemButton>
  );
}

function ListSubItem({ title, path }: Children) {
  const dispatch = useAppDispatch();
  const active = useGetActiveLink(path);

  const handleMenu = () => {
    dispatch(setSidebarOpen());
  };

  return (
    <ListItemButton
      sx={{ pl: 2, '&.active': { color: (theme) => theme.palette.primary.main } }}
      onClick={handleMenu}
      component={RouterLink}
      to={path}
      end
    >
      <DotIcon active={active} />
      <ListItemText sx={{ textTransform: 'capitalize' }} primary={title} />
    </ListItemButton>
  );
}

function ExpandIcon({ open }: { open: boolean }) {
  return open ? <Iconify icon='ic:sharp-expand-less' /> : <Iconify icon='ic:sharp-expand-more' />;
}

function DotIcon({ active }: { active: boolean }) {
  const activeStyle: SxProps<Theme> = { color: 'primary.main', width: '10px' };
  const inactiveStyle: SxProps<Theme> = { width: '8px' };
  return (
    <ListItemIcon sx={{ pl: 0.5 }}>
      {active ? (
        <Iconify icon='akar-icons:circle-fill' sx={activeStyle} />
      ) : (
        <Iconify icon='akar-icons:circle' sx={inactiveStyle} />
      )}
    </ListItemIcon>
  );
}
