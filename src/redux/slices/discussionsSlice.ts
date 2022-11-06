import { supabase } from '@/service';
import { Discussion } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

const COMMENTS_COUNT = 10;
const DISCUSSION_COUNT = 10;
type Comment = {
  id: number;
  created_at: string | null;
  text: string | null;
  author_id: string | null;
  discussion_id: number | null;
  replies: string[];
};

type Root = {
  isLoading: boolean;
  error: string;
  discussions: Discussion[];
  discussion: Discussion | null;
  comments: Comment[];
  discussionsPaginSize: number;
  commentsPaginSize: number;
};
// ----------------------------------------------------------------------
const initialState: Root = {
  isLoading: false,
  error: '',
  discussions: [],
  discussion: null,
  comments: [],
  discussionsPaginSize: 0,
  commentsPaginSize: 0,
};

const discussionsSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET ALL DISCUSSIONS
    getDiscussionsSuccess(state, action) {
      state.isLoading = false;
      const discussions = action.payload.data;

      state.discussions = discussions;
      state.discussionsPaginSize = Math.ceil(action.payload.count / (DISCUSSION_COUNT + 1));
    },

    insertDiscussion(state, action) {
      state.isLoading = false;
      const { discussions } = state;

      state.discussions = [action.payload, ...discussions];
    },
    // GET DISCUSSION BY ID
    getDiscussionByIdSuccess(state, action) {
      state.isLoading = false;
      const discussion = action.payload;

      state.discussion = discussion;
    },
    clearDiscussion(state) {
      state.discussion = null;
    },

    // GET DISCUSSION COMMENTS BY ID
    getDiscussionCommentsByIdSuccess(state, action) {
      state.isLoading = false;
      const comments = action.payload.data;

      state.comments = comments;
      state.commentsPaginSize = Math.ceil(action.payload.count / (COMMENTS_COUNT + 1));
    },

    clearComments(state) {
      state.comments = [];
    },

    postMainCommentSuccess(state, action) {
      const { comments } = state;

      state.comments = [...comments, { ...action.payload, replies: [] }];
    },

    postReplyCommentSuccess(state, action) {
      const { comments } = state;
      const insert = action.payload;

      const result = comments?.map((comment) =>
        comment.id === insert.reply_to
          ? { ...comment, replies: [...comment.replies, insert] }
          : comment,
      );

      state.comments = result;
    },
  },
});

// Reducer
export default discussionsSlice.reducer;

// Actions
export const {
  postMainCommentSuccess,
  postReplyCommentSuccess,
  getDiscussionByIdSuccess,
  getDiscussionsSuccess,
  getDiscussionCommentsByIdSuccess,
  clearDiscussion,
  clearComments,
  startLoading,
  insertDiscussion,
  hasError,
} = discussionsSlice.actions;

// ----------------------------------------------------------------------

export const startDiscussion = (content: any, author: any) => (dispatch: AppDispatch) => {
  return async () => {
    dispatch(startLoading());
    try {
      const { data, error } = await supabase.from('discussions').insert([content]).select();

      const result = Object.assign({ ...data }, { author });

      dispatch(insertDiscussion(result));
      if (error) {
        throw error;
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  };
};

export const postMainComment = (content: any, author: any) => (dispatch: AppDispatch) => {
  return async () => {
    // dispatch(slice.actions.startLoading());
    try {
      const { data, error } = await supabase.from('comments').insert([content]).select();

      const result = Object.assign({ ...data }, { ...author });

      dispatch(postMainCommentSuccess(result));
      if (error) {
        throw error;
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  };
};

export const postReplyComment = (content: any, author: any) => (dispatch: AppDispatch) => {
  return async () => {
    // dispatch(slice.actions.startLoading());
    try {
      const { data, error } = await supabase.from('replies').insert([content]).select();

      const result = Object.assign({ ...data }, { ...author });
      dispatch(postReplyCommentSuccess(result));
      if (error) {
        throw error;
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  };
};

export const getDiscussions = (start: number, end: number) => (dispatch: AppDispatch) => {
  return async () => {
    dispatch(startLoading());

    try {
      const { data, error, count } = await supabase
        .from('discussions')
        .select('*, author:author_id(name, age, avatar_image->avatar)', { count: 'exact' })
        .order('updated_at', { ascending: false })
        .range(start, end);

      dispatch(getDiscussionsSuccess({ data, count }));

      if (error) {
        throw new Error('Kļūme');
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  };
};

export const getDiscussionById = (id: string) => (dispatch: AppDispatch) => {
  return async () => {
    dispatch(startLoading());

    try {
      const { data, error } = await supabase
        .from('discussions')
        .select('*, author:author_id(name, age, avatar_image->avatar)')
        .eq('id', Number(id))
        .maybeSingle();
      // .order('created_at', { ascending: false });

      dispatch(getDiscussionByIdSuccess(data));

      if (error) {
        throw new Error('Kļūme');
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  };
};

export const getDiscussionCommentsById =
  (id: string, start: number, end: number) => (dispatch: AppDispatch) => {
    return async () => {
      dispatch(startLoading());

      try {
        const { data, error, count } = await supabase
          .from('comments')
          .select(
            '*, author:author_id(name, age, avatar_image->avatar), replies(*, author:author_id(name, age, avatar_image->avatar))',
            { count: 'exact' },
          )
          .eq('discussion_id', id)
          .order('created_at', { ascending: false })
          .range(start, end)
          .select();

        dispatch(getDiscussionCommentsByIdSuccess({ data, count }));

        if (error) {
          throw new Error('Kļūme');
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  };

export function increaseDiscussionViewsCount(id: number) {
  return async () => {
    try {
      const { error } = await supabase.rpc('increase_views_count', { discussion: id });

      if (error) {
        throw error;
      }
    } catch (error) {
      // console.log(error.message);
    }
  };
}
