/* eslint-disable camelcase */
import { supabase } from '@/service';
import { Conversation, Message, SendMessage } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

type MessagesState = {
  isLoading: boolean;
  error: string | null;
  conversations: Conversation[];
  messages: Message[];
  isListOpen: boolean;
};

const initialState: MessagesState = {
  isLoading: true,
  error: null,
  conversations: [],
  messages: [],
  isListOpen: true,
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },

    hasError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getConversations: (state, action) => {
      state.isLoading = false;
      state.conversations = action.payload;
    },

    updateConversations: (state, action) => {
      const m = action.payload;
      const { conversations } = state;

      if (m) {
        const update = conversations.map((c) =>
          c.id === m.id
            ? { ...c, lastMessage: m.last_message, updated_at: m.updated_at, senderId: m.sender_id }
            : c,
        );
        state.conversations = update;
      }
    },

    getInitialMessages: (state, action) => {
      state.messages = action.payload;
    },

    getSubscribedMessages: (state, action) => {
      state.messages = [action.payload, ...state.messages];
    },

    clearMessages: (state) => {
      state.messages = [];
    },

    setListOpen: (state, action) => {
      state.isListOpen = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setListOpen,
  updateConversations,
  getConversations,
  getSubscribedMessages,
  getInitialMessages,
  clearMessages,
  startLoading,
  hasError,
} = slice.actions;

export const selectConversations = (state: RootState) => state.messages.conversations;
export const selectMessages = (state: RootState) => state.messages.messages;
export const selectIsListOpen = (state: RootState) => state.messages.isListOpen;

export const fetchConversations = (userId?: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select(
        '*, user1:user_one (name, age, avatar_image), user2:user_two (name, age, avatar_image)',
      )
      .or(`user_one.eq.${userId},user_two.eq.${userId}`)
      .order('updated_at', { ascending: false });

    const mappedData = data!.map((x) => {
      if (x.user_one === null || x.user_two === null) {
        return {
          id: x.id,
          isSeen: x.is_seen,
          lastMessage: x.last_message,
          updated_at: x.updated_at,
          senderId: x.sender_id,
          user: { name: 'Dzēsts lietotājs' },
          isDeleted: true,
        };
      }
      if (userId === x.user_one) {
        return {
          id: x.id,
          isSeen: x.is_seen,
          lastMessage: x.last_message,
          updated_at: x.updated_at,
          senderId: x.sender_id,
          user: { ...x.user2, userId: x.user_two },
          isDeleted: false,
        };
      }
      if (userId === x.user_two) {
        return {
          id: x.id,
          isSeen: x.is_seen,
          lastMessage: x.last_message,
          updated_at: x.updated_at,
          senderId: x.sender_id,
          user: { ...x.user1, userId: x.user_one },
          isDeleted: false,
        };
      }
    });

    dispatch(getConversations(mappedData));
    if (error) {
      throw error;
    }
  } catch (error) {
    dispatch(hasError(error));
  }
};

// SEND MESSAGE
export async function onSendMessage(value: SendMessage) {
  try {
    const { error } = await supabase.from('messages').upsert(value);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
}

// UPDATE LAST MESSAGE IN CONVERSATION
export async function onUpdateLastMessage(value: SendMessage) {
  const timeNow = new Date().toISOString();
  try {
    const { error } = await supabase
      .from('conversations')
      .update({
        last_message: value.message,
        sender_id: value.sender_id,
        is_seen: false,
        updated_at: timeNow,
      })
      .match({ id: value.conversation_id });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
}
