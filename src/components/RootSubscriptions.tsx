import { useAuth } from '@/contexts/AuthContext';
import { fetchConversations, updateConversations } from '@/redux/slices/messagesSlice';
import { fetchSeenUsers, fetchStatistics } from '@/redux/slices/statisticsSlice';
import { useAppDispatch } from '@/redux/store';
import { supabase } from '@/service';
import { useEffect } from 'react';

function RootSubscriptions() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const conversations = supabase
      .channel('public:conversations')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'conversations' },
        (payload) => dispatch(updateConversations(payload.new)),
      )
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversations' }, () => {
        dispatch(fetchConversations(user?.id));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'conversations' }, () => {
        dispatch(fetchConversations(user?.id));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(conversations);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const statistics = supabase
      .channel('public:seen_statistics')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'seen_statistics' }, () =>
        dispatch(fetchStatistics()),
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'seen_statistics' },
        () => {
          dispatch(fetchSeenUsers());
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'seen_statistics' },
        () => {
          dispatch(fetchSeenUsers());
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(statistics);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default RootSubscriptions;
