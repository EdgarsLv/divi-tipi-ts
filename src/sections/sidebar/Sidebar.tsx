import { Paper, Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { MobileMenu } from '../menu';
import { LogoWithText } from '@/components';
import { selectIsSidebarOpen, setSidebarOpen } from '@/redux/slices/accountSlice';

export default function Sidebar() {
  const open = useAppSelector(selectIsSidebarOpen);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(setSidebarOpen());
  };

  return (
    <Drawer anchor='left' open={open} onClose={handleToggle}>
      <Paper sx={{ p: 0.5, pt: 1, pl: 2, m: 1 }} variant='outlined'>
        <LogoWithText sx={{ pb: 0.5 }} />
      </Paper>
      <MobileMenu />
    </Drawer>
  );
}
