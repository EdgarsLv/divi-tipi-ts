import { supabase } from '@/service';
import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from '../store';

interface UsersState {
  users: User[];
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
  isOpen: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadUsers: (state, action) => {
      state.users = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { loadUsers, setIsOpen } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users.users;
export const selectIsOpen = (state: RootState) => state.users.isOpen;

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
      .range(0, 39);

    dispatch(loadUsers(data));

    if (error) {
      throw error;
    }
  } catch (error) {
    //   dispatch(hasError(error.message));
  }
};

export default usersSlice.reducer;
