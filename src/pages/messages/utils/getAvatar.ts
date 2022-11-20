const storageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL;
import { Conversation } from '@/types';
import fake from '../../../assets/images/unknown.png';

const getAvatar = (conversation: Conversation) => {
  let avatar: string | null = null;

  const hasAvatar = Boolean(conversation?.user?.avatar_image?.avatar);

  if (hasAvatar) {
    avatar = `${storageUrl}/${conversation?.user?.avatar_image?.avatar}`;
  } else {
    avatar = fake;
  }

  return avatar;
};

export default getAvatar;
