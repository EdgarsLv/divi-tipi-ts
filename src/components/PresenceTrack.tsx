import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/service';

function PresenceTrack() {
  const { user } = useAuth();

  const channel = supabase.channel('online-users', {
    config: {
      presence: {
        key: user?.id,
      },
    },
  });

  channel
    .on('presence', { event: 'sync' }, () => presenceChanged())
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        channel.track({ user: user?.id });
      }
    });

  const presenceChanged = () => {
    const obj = channel.presenceState();
    console.log(obj);
  };

  return null;
}

export default PresenceTrack;
