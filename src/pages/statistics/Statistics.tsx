import { Page } from '../../components';
import { Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { DeletedUserCard, SeenUserCard } from './components';
import { SeenUser } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { supabase } from '@/service';
import { useLoaderData } from 'react-router-dom';
import {
  getUsers,
  selectSeenUsers,
  selectStatistics,
  updateStatistics,
} from '@/redux/slices/statisticsSlice';
import { useAuth } from '@/contexts/AuthContext';

function Statistics() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const data = useLoaderData() as SeenUser[];
  const statistics = useAppSelector(selectStatistics);
  const users = useAppSelector(selectSeenUsers);

  useEffect(() => {
    dispatch(getUsers(data));

    return () => {
      if (statistics) {
        updateStatistics(user?.id);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, statistics, user?.id]);

  return (
    <Page title='Statistics'>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ my: 2 }}>
          Statistika
        </Typography>
        <Grid container columns={20} spacing={3}>
          {users?.map((x: SeenUser, i: number) => {
            if (x.seen_user_id === null) {
              return <DeletedUserCard isSeen={x.is_seen} date={x.created_at} key={i} />;
            }
            return <SeenUserCard key={i} user={x} />;
          })}
        </Grid>
      </Container>
    </Page>
  );
}

export default Statistics;

export async function statisticsLoader() {
  const { data, error } = await supabase
    .from('seen_statistics')
    .select(
      'seen_user_id, created_at, is_seen, seen_user:seen_user_id(name, age, avatar_image, sociotype, confirmed_sociotype)',
    )
    .order('created_at', { ascending: false })
    .range(0, 19);

  if (error) {
    throw error;
  }
  return data;
}
