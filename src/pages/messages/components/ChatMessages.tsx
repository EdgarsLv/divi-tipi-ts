import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { supabase } from '@/service';
import { Message } from '@/types';
import ChatMessageItem from './ChatMessageItem';

const MessagesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  transition: theme.transitions.create('all'),
  display: 'flex',
  flexDirection: 'column-reverse',
  height: '100%',
  overflowY: 'scroll',

  '&::-webkit-scrollbar': {
    width: '0.2rem',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
  },
}));

function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <MessagesContainer>
      {messages?.map((message, i) => (
        <ChatMessageItem key={i} message={message} />
      ))}
    </MessagesContainer>
  );
}

export default ChatMessages;

export async function messagesLoader(chatId?: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', chatId)
    .order('created_at', { ascending: false })
    .range(0, 20);

  if (error) {
    throw error;
  }
  return data;
}
