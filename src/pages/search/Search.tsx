import { useEffect } from 'react';
import { PAGIN_SIZE } from '@/constants';
import { fetchUsers } from '@/redux/slices/usersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { EmptySearchAlert, Page, RequireSociotypeAlert } from '../../components';
import { FilterSidebar, UserCard } from './components';
import { useAuth } from '@/contexts/AuthContext';
import { SkeletonUserCard } from '@/components/skeletons';
import { selectAccountData } from '@/redux/slices/accountSlice';

function Search() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams({ page: '1' });
  const dispatch = useAppDispatch();

  const account = useAppSelector(selectAccountData);
  const { users, filters, paginSize, isLoading } = useAppSelector((state) => state.users);

  useEffect(() => {
    const page = Number(params.get('page'));

    dispatch(
      fetchUsers({
        start: (page - 1) * PAGIN_SIZE,
        end: page * PAGIN_SIZE,
        id: user?.id,
        ...filters,
      }),
    );
  }, [dispatch, params, filters, user?.id]);

  const handlePagination = (_: any, value: number) => {
    window.scrollTo(0, 0);
    setParams({ page: value.toString() });
  };

  const showRequireSociotype = !account.has_sociotype;
  const showNoSearchResult = account.has_sociotype && users?.length <= 0;

  return (
    <Page title='Search'>
      <Container>
        <Stack
          sx={{ my: 2 }}
          direction={{ sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent='flex-end'
        >
          <Stack direction='row' justifyContent='space-between'>
            <Box />
            <FilterSidebar setParams={setParams} />
          </Stack>
        </Stack>

        {!isLoading && showRequireSociotype && <RequireSociotypeAlert />}
        {!isLoading && showNoSearchResult && <EmptySearchAlert />}

        <Grid sx={{ minHeight: `${window.innerHeight}px` }} container columns={20} spacing={3}>
          {isLoading && [...Array(20)].map((_, i) => <SkeletonUserCard key={i} />)}
          {!isLoading && users?.map((user, i) => <UserCard user={user} key={i} />)}
        </Grid>
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

export default Search;
