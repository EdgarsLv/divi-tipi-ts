/* eslint-disable camelcase */
import { supabase } from '@/service';
import { User, UserInfo, UserInterests, UserPrefrences } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from '../store';

interface AccountState {
  account: User;
  images: string[];
  isSidebarOpen: boolean;
}

const initialState: AccountState = {
  account: {
    id: '',
    created_at: '',
    name: '',
    gender: '',
    age: '',
    interests: [],
    user: {} as any,
    search: {} as any,
    avatar_image: { avatar: '', updated_at: '' },
    cover_image: { cover: '', updated_at: '' },
    sociotype: '',
    has_sociotype: false,
    updated_at: '',
    has_avatar: false,
    confirmed_sociotype: false,
    user_images: undefined,
  },
  images: [],
  isSidebarOpen: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loadAccountData: (state, action) => {
      state.account = action.payload;
    },
    loadAccountImages: (state, action) => {
      if (action.payload) {
        state.images = action.payload;
      } else {
        state.images = [];
      }
    },
    setSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setSidebarOpen, loadAccountData, loadAccountImages } = accountSlice.actions;

export const selectAccountData = (state: RootState) => state.account.account;
export const selectAccountImages = (state: RootState) => state.account.images;
export const selectIsSidebarOpen = (state: RootState) => state.account.isSidebarOpen;

export const fetchAccountData = (id?: string) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();

    dispatch(loadAccountData(data));

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchAccountImages = (id?: string) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase
      .from('user_images')
      .select('images')
      .eq('user_id', id)
      .maybeSingle();

    dispatch(loadAccountImages(data?.images));

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updatePreferencesInfo =
  (values: UserPrefrences, id?: string) => async (dispatch: AppDispatch) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ search: { ...values } })
        .eq('id', id)
        .select()
        .maybeSingle();

      dispatch(loadAccountData(data));

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateGeneralInfo =
  (values: UserInfo, id?: string) => async (dispatch: AppDispatch) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: values.name,
          gender: values.gender,
          age: values.age.toString(),
          user: { ...values },
        })
        .eq('id', id)
        .select()
        .maybeSingle();

      dispatch(loadAccountData(data));

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateInterestsInfo =
  (values: UserInterests, id?: string) => async (dispatch: AppDispatch) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ ...values })
        .eq('id', id)
        .select()
        .maybeSingle();

      dispatch(loadAccountData(data));

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updatePersonality =
  (values: { sociotype: string; confirmed: boolean }, id?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data, error } = await supabase
        .from('users')
        // eslint-disable-next-line camelcase
        .update({
          sociotype: values.sociotype,
          has_sociotype: true,
          confirmed_sociotype: values.confirmed,
        })
        .eq('id', id)
        .select()
        .maybeSingle();

      dispatch(loadAccountData(data));

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

export const removeAccountImages =
  (images: string[], index: number, id?: string) => async (dispatch: AppDispatch) => {
    const newImages: string[] = images.filter((_x, i) => i !== index);
    try {
      await supabase.storage.from('user-images').remove([images[index]]);
      const { data, error } = await supabase
        .from('user_images')
        .update({ images: newImages })
        .eq('user_id', id)
        .select()
        .maybeSingle();

      dispatch(loadAccountImages(data?.images));

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

export const removeAccountAvatar = (id?: string) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase
      .from('users')
      // eslint-disable-next-line camelcase
      .update({ avatar_image: null, has_avatar: false })
      .eq('id', id)
      .select()
      .maybeSingle();

    dispatch(loadAccountData(data));

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
};

export default accountSlice.reducer;
