const storageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL;
import femaleAvatar from '../assets/images/womenavatar.jpg';
import maleAvatar from '../assets/images/manavatar.jpg';
import fakeCover from '../assets/images/profile.svg';
import { User } from '@/types';

function getFakeAvatar(user: Partial<User>) {
  if (user?.gender === 'vīrietis') {
    return maleAvatar;
  }
  return femaleAvatar;
}

export default function useUserImages(user: Partial<User>) {
  const fake = getFakeAvatar(user);

  let avatar: string | null = null;
  let cover: string | null = null;

  const hasCover = Boolean(user?.cover_image?.cover);
  const hasAvatar = Boolean(user?.avatar_image?.avatar);

  const coverImg = `${storageUrl}/${user?.cover_image?.cover}`;
  const avatarImg = `${storageUrl}/${user?.avatar_image?.avatar}`;

  if (hasAvatar) {
    avatar = avatarImg;
  } else {
    avatar = fake;
  }

  if (hasCover) {
    cover = coverImg;
  } else {
    cover = fakeCover;
  }

  return { avatar, cover, hasAvatar };
}
