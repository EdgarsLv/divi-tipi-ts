/* eslint-disable camelcase */
import { supabase } from '@/service';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import { SeenUser } from '@/types';

interface StatisticsState {
  isLoading: boolean;
  statistics: number;
  users: SeenUser[];
}

const initialState: StatisticsState = {
  isLoading: true,
  statistics: 0,
  users: [],
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getStatistics: (state, action) => {
      state.statistics = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getUsers, getStatistics, startLoading } = statisticsSlice.actions;

export const selectStatistics = (state: RootState) => state.statistics.statistics;
export const selectSeenUsers = (state: RootState) => state.statistics.users;

export const fetchStatistics = () => async (dispatch: AppDispatch) => {
  try {
    const { error, count } = await supabase
      .from('seen_statistics')
      .select('is_seen', { count: 'exact' })
      .eq('is_seen', false);

    dispatch(getStatistics(count));

    if (error) {
      throw error;
    }
  } catch (error) {
    //   dispatch(hasError(error.message));
  }
};

export const fetchSeenUsers = () => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase
      .from('seen_statistics')
      .select(
        'seen_user_id, created_at, is_seen, seen_user:seen_user_id(name, age, avatar_image, sociotype, confirmed_sociotype)',
      )
      .order('created_at', { ascending: false })
      .range(0, 19);

    dispatch(getUsers(data));

    if (error) {
      throw error;
    }
  } catch (error) {
    //   dispatch(hasError(error.message));
  }
};

export async function updateStatistics(userId?: string) {
  try {
    const { error } = await supabase
      .from('seen_statistics')
      .update({ is_seen: true })
      .match({ user_id: userId, is_seen: false });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
}

export default statisticsSlice.reducer;
