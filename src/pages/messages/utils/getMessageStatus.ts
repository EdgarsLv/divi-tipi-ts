import { Conversation } from '@/types';

const getMessageStatus = (conversation: Conversation, userId: string) => {
  const isNew = conversation.senderId !== userId && conversation.isSeen === false;
  const isSeen = conversation.senderId === userId && conversation.isSeen === true;
  const notSeen = conversation.senderId === userId && conversation.isSeen === false;

  return { isNew, isSeen, notSeen };
};

export default getMessageStatus;
