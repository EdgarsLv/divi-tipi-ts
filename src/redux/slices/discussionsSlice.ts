/* eslint-disable @typescript-eslint/ban-ts-comment */
import { supabase } from '@/service';
import { Comment, Discussion, Participants } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

const COMMENTS_COUNT = 3;
const DISCUSSION_COUNT = 3;

type Root = {
  isLoading: boolean;
  error: string;
  discussions: Discussion[];
  discussion: Discussion | null;
  comments: Comment[];
  participants: Participants[];
  paginSize: number;
  commentsPaginSize: number;
};

const initialState: Root = {
  isLoading: true,
  error: '',
  discussions: [],
  discussion: null,
  comments: [],
  participants: [],
  paginSize: 0,
  commentsPaginSize: 0,
};

const discussionsSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },

    hasError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getDiscussions: (state, action) => {
      state.isLoading = false;

      state.discussions = action.payload.mappedData;
      state.paginSize = Math.ceil(action.payload.count / (DISCUSSION_COUNT + 1));
    },
    getDiscussionById: (state, action) => {
      state.isLoading = false;

      state.discussion = action.payload;
    },
    resetDiscussion: (state) => {
      state.discussion = null;
      state.comments = [];
    },
    insertDiscussion: (state, action) => {
      state.isLoading = false;
      const { discussions } = state;

      state.discussions = [action.payload, ...discussions];
    },

    getCommentsById: (state, action) => {
      state.isLoading = false;

      state.comments = action.payload.data;
      state.commentsPaginSize = Math.ceil(action.payload.count / (COMMENTS_COUNT + 1));
    },

    updateMainComments: (state, action) => {
      const { comments } = state;

      state.comments = [{ ...action.payload, replies: [] }, ...comments];
    },

    updateReplyComments: (state, action) => {
      const { comments } = state;
      const insert = action.payload;

      const result = comments?.map((comment) =>
        comment.id === insert.reply_to
          ? // @ts-ignore
            // eslint-disable-next-line no-unsafe-optional-chaining
            { ...comment, replies: [...comment?.replies, insert] }
          : comment,
      );

      state.comments = result;
    },

    getParticipants: (state, action) => {
      state.participants = action.payload;
    },
  },
});

// Reducer
export default discussionsSlice.reducer;

// Actions
export const {
  updateMainComments,
  updateReplyComments,
  getDiscussionById,
  getDiscussions,
  getCommentsById,
  getParticipants,
  resetDiscussion,
  startLoading,
  insertDiscussion,
  hasError,
} = discussionsSlice.actions;

export const selectParticipants = (state: RootState) => state.discussions.participants;
export const selectDiscussions = (state: RootState) => state.discussions.discussions;
export const selectDiscussion = (state: RootState) => state.discussions.discussion;
export const selectIsLoading = (state: RootState) => state.discussions.isLoading;

export const fetchDiscussions =
  (start: number, end: number, userId?: string) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());

    try {
      const { data, error, count } = await supabase
        .from('discussions')
        .select('*, participants(*), author:author_id(name, age, avatar_image)', { count: 'exact' })
        .order('updated_at', { ascending: false })
        .range(start, end);

      // prettier-ignore
      const mappedData = data?.map((res) => {
        return {
          ...res,
          isSeen: // @ts-ignore
            res?.participants?.filter((x) => {
              return (
                x.user_id === userId &&
                new Date(x.seen_at).getTime() < new Date(res.updated_at).getTime()
              );
            }).length > 0 ? false : true,
        };
      });

      dispatch(getDiscussions({ mappedData, count }));

      if (error) {
        throw new Error('Kļūme');
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  };

export const fetchDiscussionById = (id?: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const { data, error } = await supabase
      .from('discussions')
      .select('*, author:author_id(name, age, avatar_image)')
      .eq('id', Number(id))
      .maybeSingle();

    dispatch(getDiscussionById(data));

    if (error) {
      throw new Error('Kļūme');
    }
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const startDiscussion = (content: any, author: any) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase.from('discussions').insert([content]).select();
    // @ts-ignore
    const result = Object.assign(...data, { author });

    dispatch(insertDiscussion(result));
    if (error) {
      throw error;
    }
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const fetchCommentsById =
  (start: number, end: number, id?: string) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());

    try {
      const { data, error, count } = await supabase
        .from('comments')
        .select(
          '*, author:author_id(name, age, avatar_image), replies(*, author:author_id(name, age, avatar_image))',
          { count: 'exact' },
        )
        .eq('discussion_id', Number(id))
        .order('created_at', { ascending: false })
        .range(start, end);

      dispatch(getCommentsById({ data, count }));

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
      // dispatch(hasError(error));
    }
  };

export const postMainComment = (content: any, author: any) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase.from('comments').insert([content]).select();

    // @ts-ignore
    const result = Object.assign(...data, { author });

    dispatch(updateMainComments(result));
    if (error) {
      throw error;
    }
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const postReplyComment = (content: any, author: any) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase.from('replies').insert([content]).select();

    // @ts-ignore
    const result = Object.assign(...data, { author });

    dispatch(updateReplyComments(result));
    if (error) {
      throw error;
    }
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const fetchParticipants = (userId?: string) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase.from('participants').select('*').eq('user_id', userId);

    dispatch(getParticipants(data));
    if (error) {
      throw error;
    }
  } catch (error) {
    dispatch(hasError(error));
  }
};

export async function updateSeenTime(discussionId: string, userId: string) {
  try {
    const time = new Date().toISOString();
    const { error } = await supabase
      .from('participants')
      // eslint-disable-next-line camelcase
      .update({ seen_at: time })
      // eslint-disable-next-line camelcase
      .match({ user_id: userId, discussion_id: discussionId });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function increaseDiscussionViewsCount(id?: string) {
  try {
    const { error } = await supabase.rpc('increase_views_count', { discussion: Number(id) });

    if (error) {
      throw error;
    }
  } catch (error) {
    // console.log(error.message);
  }
}
