import { Paper, Drawer, Typography } from '@mui/material';
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
      <Paper sx={{ pb: 1, pt: 2, px: 4, mb: 2 }}>
        <LogoWithText sx={{ pb: 0.5 }} />
      </Paper>
      <MobileMenu />
      <Paper elevation={5} sx={{ mt: 'auto', display: 'grid', p: 2 }}>
        <Typography variant='caption'>Ir jautājumi, ieteikumi, pamanīji kļūdu?</Typography>
        <Typography sx={{ color: 'text.primary' }} component='a' href='mailto: info@divitipi.lv'>
          info@divitipi.lv
        </Typography>
      </Paper>
    </Drawer>
  );
}
