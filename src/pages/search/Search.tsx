import { fetchInitialUsers, selectUsers } from '@/redux/slices/usersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Box, Button, Container, Grid, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
import { Page } from '../../components';
import { UserCard } from './components';

function Search() {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitialUsers());
  }, [dispatch]);

  return (
    <Page title='Search'>
      <Container>
        <Stack
          sx={{ my: 2 }}
          direction={{ sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent='flex-end'
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            // width='100%'
            // spacing={1}
            // flexShrink={0}
          >
            <Box />
            <Button size='small' variant='contained'>
              filter
            </Button>
          </Stack>
        </Stack>

        <Grid container columns={20} spacing={3}>
          {users?.map((user, i) => (
            <UserCard user={user} key={i} />
          ))}
        </Grid>
        <Box mt={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            onChange={() => console.log('log')}
            page={1}
            variant='text'
            shape='rounded'
            count={10}
            color='primary'
          />
        </Box>
      </Container>
    </Page>
  );
}

export default Search;
