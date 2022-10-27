import { Paper, Typography, Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectOpen, setOpen } from '../../redux/slices/counterSlice';
import { MobileMenu } from '../menu';

export default function Sidebar() {
  const open = useAppSelector(selectOpen);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(setOpen());
  };

  return (
    <Drawer anchor='left' open={open} onClose={handleToggle}>
      <Paper sx={{ p: 2, m: 1 }} variant='outlined'>
        <Typography>LOGO</Typography>
      </Paper>
      <MobileMenu />
    </Drawer>
  );
}
