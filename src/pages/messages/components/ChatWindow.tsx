import { useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Box, Divider, Stack, Typography } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  getInitialMessages,
  getSubscribedMessages,
  selectConversations,
  selectMessages,
} from '@/redux/slices/messagesSlice';
import { getSelectedChat } from '../utils';
import { Message } from '@/types';
import { supabase } from '@/service';

export default function ChatWindow() {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();

  const messages = useAppSelector(selectMessages);
  const conversations = useAppSelector(selectConversations);
  const selected = getSelectedChat(conversations, chatId);

  const data = useLoaderData() as Message[];

  useEffect(() => {
    if (!chatId) {
      return;
    }
    dispatch(getInitialMessages(data));

    const messageChannel = supabase
      .channel(`public:messages:conversation_id=eq.${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${chatId}`,
        },
        (payload) => dispatch(getSubscribedMessages(payload.new)),
      )
      .subscribe((status) => console.log(status, 'messages'));

    return () => {
      supabase.removeChannel(messageChannel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

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
          <ChatMessages messages={messages} />

          <Divider />

          <ChatInput chatId={chatId} selected={selected} disabled={chatId === undefined} />
        </Stack>
      </Box>
    </Stack>
  );
}
