import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// ...
import usersSlice from './slices/usersSlice';
import discussionsSlice from './slices/discussionsSlice';
import accountSlice from './slices/accountSlice';
import messagesSlice from './slices/messagesSlice';
import statisticsSlice from './slices/statisticsSlice';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    users: usersSlice,
    discussions: discussionsSlice,
    messages: messagesSlice,
    statistics: statisticsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
