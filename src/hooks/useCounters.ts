import { useAuth } from '@/contexts/AuthContext';
import { fetchConversations, selectConversations } from '@/redux/slices/messagesSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import usePageFocused from './usePageFocused';

function useCounters() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const focused = usePageFocused();

  const conversations = useAppSelector(selectConversations);

  const unreadMessagesCount = conversations?.filter(
    (x) => x.isSeen === false && x.senderId !== user?.id,
  ).length;

  useEffect(() => {
    if (focused) {
      dispatch(fetchConversations(user?.id));
    }
  }, [dispatch, focused, user?.id]);

  return { unreadMessagesCount };
}

export default useCounters;
