import { Page } from '../../components';
import { Card, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { fetchConversations } from '@/redux/slices/messagesSlice';
import { useAuth } from '@/contexts/AuthContext';
import { ChatSidebar, ChatWindow } from './components';

function Messages() {
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConversations(user?.id));
  }, [dispatch, user?.id]);

  return (
    <Page title='Vēstules'>
      <Container>
        <StyledCard>
          <ChatSidebar />
          <ChatWindow />
        </StyledCard>
      </Container>
    </Page>
  );
}

export default Messages;

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  top: 70,
  bottom: 10,
  right: 0,
  left: 0,
  zIndex: 1200,

  [theme.breakpoints.up('md')]: {
    position: 'relative',
    height: '80vh',
    top: 10,
  },
}));
