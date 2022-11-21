import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Drawer, Typography, Box } from '@mui/material';
import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Scrollbar } from '@/components';
import ChatsList from './ChatsList';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectIsListOpen, setListOpen } from '@/redux/slices/messagesSlice';

export default function ChatSidebar() {
  const theme = useTheme();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const isListOpen = useAppSelector(selectIsListOpen);

  const isDesktop = useResponsive(Responsive.Up, Size.Md);

  useEffect(() => {
    if (!pathname.includes('/messages/') && !isDesktop) {
      dispatch(setListOpen(true));
    }
  }, [dispatch, pathname, isDesktop]);

  const handleCloseList = () => {
    dispatch(setListOpen(false));
  };

  const renderContent = (
    <>
      <Box sx={{ py: 1.8, px: 3 }}>
        <Typography sx={{ textAlign: 'right' }} variant='subtitle1'>
          Sarakstes
        </Typography>
      </Box>

      <Scrollbar>
        <ChatsList />
      </Scrollbar>
      <Box sx={{ height: 10 }} />
    </>
  );

  return (
    <>
      {isDesktop ? (
        <Drawer
          open
          variant='persistent'
          sx={{
            width: 320,
            transition: theme.transitions.create('width'),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: 320,
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={isListOpen}
          onClose={handleCloseList}
          sx={{
            '& .MuiDrawer-paper': { width: 320 },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
