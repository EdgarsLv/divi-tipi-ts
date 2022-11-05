import { supabase } from '@/service';
import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from '../store';

interface UsersState {
  users: User[];
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { loadUsers } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users.users;

export const fetchInitialUsers = () => async (dispatch: AppDispatch) => {
  // const { minAge, maxAge, gender, sociotypes } = filters;

  // dispatch(startLoading());
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .gte('age', 18)
      .lte('age', 99)

      .neq('id', 'cd1bd5b7-85b2-4187-83d4-996f3b4647bf')
      .order('updated_at', { ascending: false })
      .range(0, 19);

    dispatch(loadUsers(data));

    if (error) {
      throw error;
    }
  } catch (error) {
    //   dispatch(hasError(error.message));
  }
};

export default usersSlice.reducer;
