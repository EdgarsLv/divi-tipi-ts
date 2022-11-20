import { Conversation } from '@/types';

const getSelectedChat = (conversations: Conversation[], chatId?: string) => {
  const selected = conversations.filter((x) => x.id === Number(chatId));

  return selected[0];
};

export default getSelectedChat;
