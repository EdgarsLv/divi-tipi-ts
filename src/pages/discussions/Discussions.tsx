import { Page } from '@/components';
import { SkeletonDiscussion } from '@/components/skeletons';
import { useAuth } from '@/contexts/AuthContext';
import { DISCUSSION_COUNT, fetchDiscussions } from '@/redux/slices/discussionsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Typography, Stack, Box, Pagination, Container } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DiscussionBlock, StartDiscussion } from './components';

function Discussions() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams({ page: '1' });

  const dispatch = useAppDispatch();

  const { discussions, paginSize, isLoading } = useAppSelector((state) => state.discussions);

  useEffect(() => {
    const page = Number(params.get('page'));

    dispatch(fetchDiscussions((page - 1) * DISCUSSION_COUNT, page * DISCUSSION_COUNT, user?.id));
  }, [dispatch, params, user?.id]);

  const handlePagination = (_: any, value: number) => {
    window.scrollTo(0, 0);
    setParams({ page: value.toString() });
  };

  return (
    <Page title='Diskusijas'>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='h3' sx={{ my: 2 }}>
            Diskusijas
          </Typography>

          <StartDiscussion />
        </Stack>
        {isLoading && [...Array(5)].map((_, i) => <SkeletonDiscussion key={i} />)}
        {!isLoading && discussions?.map((x, i) => <DiscussionBlock discussion={x} key={i} />)}

        <Box mt={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            onChange={handlePagination}
            page={Number(params.get('page'))}
            variant='text'
            shape='rounded'
            count={paginSize}
            color='primary'
          />
        </Box>
      </Container>
    </Page>
  );
}
export default Discussions;
