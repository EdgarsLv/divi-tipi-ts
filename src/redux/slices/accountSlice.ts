/* eslint-disable camelcase */
import { supabase } from '@/service';
import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from '../store';

interface AccountState {
  account: User;
}

const initialState: AccountState = {
  account: {
    id: '',
    created_at: '',
    name: '',
    gender: '',
    age: '',
    interests: [],
    user: {
      about: '',
      age: 18,
      alcohol: '',
      body: '',
      city: '',
      education: '',
      gender: '',
      goals: [],
      horoscope: '',
      kids: '',
      length: '',
      name: '',
      smoke: '',
      sociotips: '',
    },
    search: {} as any,
    avatar_image: { avatar: '', updated_at: '' },
    cover_image: { cover: '', updated_at: '' },
    sociotype: '',
    has_sociotype: false,
    updated_at: '',
    has_avatar: false,
    user_images: [],
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loadAccountData: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { loadAccountData } = accountSlice.actions;

export const selectAccountData = (state: RootState) => state.account.account;

export const fetchAccountData = (id?: string) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();

    dispatch(loadAccountData(data));

    if (error) {
      throw error;
    }
  } catch (error) {
    //   dispatch(hasError(error.message));
  }
};

export default accountSlice.reducer;
