import { useParams } from 'react-router-dom';
import { Box, Divider, Stack, Typography } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useAppSelector } from '@/redux/store';
import { selectConversations } from '@/redux/slices/messagesSlice';
import { getSelectedChat } from '../utils';

export default function ChatWindow() {
  const { chatId } = useParams();
  const conversations = useAppSelector(selectConversations);

  const selected = getSelectedChat(conversations, chatId);

  // const handleSendMessage = async (value) => {
  //   dispatch(onUpdateLastMessage(value));
  //   dispatch(onSendMessage(value));
  // };

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      {chatId ? (
        <ChatHeader selected={selected} />
      ) : (
        <Box p={1.8}>
          <Typography color='primary' variant='overline'>
            Izvēlies saraksti!
          </Typography>
        </Box>
      )}

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <Stack sx={{ flexGrow: 1 }}>
          <ChatMessages />

          <Divider />

          <ChatInput
            chatId={chatId}
            selected={selected}
            // onSend={handleSendMessage}
            disabled={chatId === undefined}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
