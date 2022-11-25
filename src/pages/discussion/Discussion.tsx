/* eslint-disable camelcase */
import { Page } from '@/components';
import { Box, Container, Pagination, Paper } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { CommentBlock, DiscussionHeader, MainInput } from './components';
import {
  resetDiscussion,
  fetchCommentsById,
  fetchParticipants,
  increaseDiscussionViewsCount,
} from '@/redux/slices/discussionsSlice';
import { supabase } from '@/service';
import { SkeletonComments } from '@/components/skeletons';
import { useAuth } from '@/contexts/AuthContext';

const PAGE_SIZE = 3;

function Discussion() {
  const { user } = useAuth();
  const { id } = useParams();

  const [params, setParams] = useSearchParams({ page: '1' });

  const dispatch = useAppDispatch();
  const { comments, commentsPaginSize, isLoading } = useAppSelector(
    (state: RootState) => state.discussions,
  );

  useEffect(() => {
    increaseDiscussionViewsCount(id);

    return () => {
      dispatch(fetchParticipants(user?.id));
      dispatch(resetDiscussion());
    };
  }, [dispatch, id, user?.id]);

  useEffect(() => {
    const page = Number(params.get('page'));

    dispatch(fetchCommentsById((page - 1) * PAGE_SIZE, page * PAGE_SIZE, id));
  }, [dispatch, id, params]);

  const handlePagination = (_: any, value: number) => {
    window.scrollTo(0, 0);
    setParams({ page: value.toString() });
  };

  return (
    <Page title='Diskusija'>
      <Container>
        <Paper sx={{ mt: 2 }}>
          <DiscussionHeader />
          {isLoading && <SkeletonComments />}
          {!isLoading &&
            comments &&
            comments?.map((comment) => (
              <Box key={`main-comment-${comment.id}`}>
                <CommentBlock comment={comment} />
                {Boolean(comment?.replies) &&
                  comment?.replies?.map((reply, i) => (
                    <CommentBlock key={`reply-${i}`} comment={reply} />
                  ))}
              </Box>
            ))}

          <MainInput />
        </Paper>

        <Box mt={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            onChange={handlePagination}
            page={Number(params.get('page'))}
            variant='text'
            shape='rounded'
            count={commentsPaginSize}
            color='primary'
          />
        </Box>
      </Container>
    </Page>
  );
}

export default Discussion;

export async function discussionLoader(id?: string) {
  const { data, error } = await supabase
    .from('discussions')
    .select('*, participants(*), author:author_id(name, age, avatar_image)')
    .eq('id', Number(id))
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}
