const storageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL;
import { Comment, Discussion } from '@/types';
import fake from '../../../assets/images/unknown.png';

export const getAuthorData = (data: Partial<Discussion | Comment | null>, userId?: string) => {
  let author = data?.author;
  let isMe = false;
  let isDeleted = false;
  let avatar = null;

  if (!data?.author) {
    // eslint-disable-next-line camelcase
    author = { name: 'Dzēsts lietotājs', age: '', avatar_image: {} as any };
    isDeleted = true;
  }
  if (data?.author_id === userId) {
    isMe = true;
  }
  if (author?.avatar_image?.avatar) {
    avatar = `${storageUrl}/${author?.avatar_image.avatar}`;
  } else {
    avatar = fake;
  }

  return { author, isMe, isDeleted, avatar };
};
