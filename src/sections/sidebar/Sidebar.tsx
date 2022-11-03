import { Paper, Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectOpen, setOpen } from '../../redux/slices/counterSlice';
import { MobileMenu } from '../menu';
import { LogoWithText } from '@/components';

export default function Sidebar() {
  const open = useAppSelector(selectOpen);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(setOpen());
  };

  return (
    <Drawer anchor='left' open={open} onClose={handleToggle}>
      <Paper sx={{ p: 0.5, pt: 1, pl: 2, m: 1 }} variant='outlined'>
        <LogoWithText sx={{ width: 25 }} />
      </Paper>
      <MobileMenu />
    </Drawer>
  );
}
