import { PAGIN_SIZE, PERSONALITIES } from '@/constants';
import { supabase } from '@/service';
import { FilterWithPagin, User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from '../store';

interface UsersState {
  users: User[];
  isLoading: boolean;
  isOpen: boolean;
  userCount: number;
  paginSize: number;
  filters: {
    minAge: number;
    maxAge: number;
    gender: string[];
    sociotypes: string[];
  };
}

const initialState: UsersState = {
  users: [],
  isLoading: true,
  isOpen: false,
  userCount: 0,
  paginSize: 1,
  filters: {
    minAge: 18,
    maxAge: 99,
    gender: ['vīrietis', 'sieviete'],
    sociotypes: [],
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    loadUsers: (state, action) => {
      state.users = action.payload.data;
      state.userCount = action.payload.count;
      state.paginSize = Math.ceil(action.payload.count / (PAGIN_SIZE + 1));
      state.isLoading = false;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { loadUsers, setIsOpen, setFilters, startLoading } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectIsOpen = (state: RootState) => state.users.isOpen;
export const selectFilters = (state: RootState) => state.users.filters;

export const fetchUsers = (values: FilterWithPagin) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const { start, end, minAge, maxAge, gender, sociotypes, id } = values;
  const personalities = sociotypes.length > 0 ? sociotypes : PERSONALITIES;

  try {
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .gte('age', minAge)
      .lte('age', maxAge)
      .in('gender', gender)
      .in('sociotype', personalities)
      .neq('id', id)
      .order('updated_at', { ascending: false })
      .range(start, end);

    dispatch(loadUsers({ data, count }));

    if (error) {
      throw error;
    }
  } catch (error) {
    //   dispatch(hasError(error.message));
  }
};

export async function updateUserStatus(focused: boolean, userId?: string) {
  const timeNow = new Date().toISOString();
  try {
    const { error } = await supabase
      .from('users')
      // eslint-disable-next-line camelcase
      .update({ updated_at: timeNow, online: focused })
      .eq('id', userId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
}

export default usersSlice.reducer;
