import { useAuth } from '@/contexts/AuthContext';
import { fetchParticipants, selectParticipants } from '@/redux/slices/discussionsSlice';
import { fetchConversations, selectConversations } from '@/redux/slices/messagesSlice';
import { fetchStatistics, selectStatistics } from '@/redux/slices/statisticsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import usePageFocused from './usePageFocused';

function useCounters() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const focused = usePageFocused();

  const participants = useAppSelector(selectParticipants);
  const conversations = useAppSelector(selectConversations);
  const statistics = useAppSelector(selectStatistics);

  const newMessages = conversations?.filter(
    (x) => x.isSeen === false && x.senderId !== user?.id,
  ).length;

  const newDiscussions = participants.filter((x) => {
    return new Date(x.seen_at).getTime() < new Date(x.updated_at).getTime();
  }).length;

  useEffect(() => {
    if (focused) {
      dispatch(fetchConversations(user?.id));
      dispatch(fetchStatistics());
      dispatch(fetchParticipants(user?.id));
    }
  }, [dispatch, focused, user?.id]);

  return { newMessages, statistics, newDiscussions };
}

export default useCounters;
