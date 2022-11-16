/* eslint-disable camelcase */
import { useAuth } from '@/contexts/AuthContext';
import {
  loadAccountData,
  loadAccountImages,
  selectAccountImages,
} from '@/redux/slices/accountSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { supabase } from '@/service';
import { imageResizer } from '@/utils/imageResizer';
import { useState } from 'react';

const storageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL;

export default function useImageUpload() {
  const { user } = useAuth();
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useAppDispatch();
  const images = useAppSelector(selectAccountImages);

  const mimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const pickImage = async (event: any, path: 'cover' | 'avatar' | 'gallery') => {
    const selected = event.target.files[0];
    if (selected && mimeTypes.includes(selected.type)) {
      const image = (await imageResizer(selected, 70)) as File;

      handleImagePicked(image, path);
    }

    return null;
  };

  const handleImagePicked = (image: File, path: string) => {
    try {
      switch (path) {
        case 'cover':
          uploadCover(image);
          break;
        case 'avatar':
          uploadAvatar(image);
          break;
        case 'gallery':
          uploadGallery(image);
          break;
        default:
          console.error('wrongpath:', path);
          break;
      }
    } catch (e) {
      alert('Kļūda!');
    }
  };

  const uploadAvatar = async (image: File) => {
    const bust = new Date().toISOString();

    const fileExt = image.name.split('.').pop();
    const fileName = `avatarimage${bust}.${fileExt}`;
    const filePath = `${user?.id}/avatar/${fileName}`;

    setUploading(true);

    try {
      const { error } = await supabase.storage
        .from('user-images')
        .upload(filePath, image, { cacheControl: '10', upsert: true });

      if (error) {
        throw error;
      }

      const update = {
        avatar: filePath,
        updated_at: new Date(),
      };
      const { data } = await supabase
        .from('users')
        .update({ avatar_image: update, has_avatar: true })
        .eq('id', user?.id)
        .select()
        .maybeSingle();

      dispatch(loadAccountData(data));
    } catch (error) {
      console.error(error);
    } finally {
      setAvatarUrl(`${storageUrl}/${filePath}`);
      setUploading(false);
    }
  };

  const uploadCover = async (image: File) => {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user?.id}/cover/${fileName}`;

    setUploading(true);

    try {
      const { error } = await supabase.storage
        .from('user-images')
        .upload(filePath, image, { cacheControl: '10', upsert: true });

      if (error) {
        throw error;
      }

      const update = {
        cover: filePath,
        updated_at: new Date(),
      };
      const { data } = await supabase
        .from('users')
        .update({ cover_image: update })
        .eq('id', user?.id)
        .select()
        .maybeSingle();

      dispatch(loadAccountData(data));
    } catch (error) {
      console.error(error);
    } finally {
      setCoverUrl(`${storageUrl}/${filePath}`);
      setUploading(false);
    }
  };

  const uploadGallery = async (image: File) => {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user?.id}/gallery/${fileName}`;

    setUploading(true);
    try {
      const { error } = await supabase.storage.from('user-images').upload(filePath, image);

      dispatch(loadAccountImages([...images, filePath]));

      await supabase.from('user_images').upsert(
        {
          images: [...images, filePath],
          updated_at: new Date().toDateString(),
          user_id: user?.id,
        },
        { onConflict: 'user_id' },
      );

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return { coverUrl, avatarUrl, uploading, pickImage };
}
