import { useParams } from 'react-router-dom';
import { Box, List } from '@mui/material';
import ChatsListItem from './ChatsListItem';
import { useAppSelector } from '@/redux/store';

export default function ChatsList() {
  const { chatId } = useParams();
  const conversations = useAppSelector((state) => state.messages.conversations);

  return (
    <List disablePadding>
      {(!conversations ? [...Array(12)] : conversations).map((conversation, index) =>
        conversation?.id ? (
          <ChatsListItem
            key={index}
            conversation={conversation}
            isSelected={chatId == conversation.id}
          />
        ) : (
          <Box key={index}>skeleton</Box>
        ),
      )}
    </List>
  );
}
