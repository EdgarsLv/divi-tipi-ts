import { ReactTimeAgo } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { updateSeenTime } from '@/redux/slices/discussionsSlice';
import { Discussion } from '@/types';
import { Avatar, Box, Paper, Stack, Link, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { getAuthorData } from '../utils/getAuthorData';
import Counters from './Counters';

export default function DiscussionHeader() {
  const { user } = useAuth();
  const { id } = useParams();
  const discussion = useLoaderData() as Discussion;

  const { author, isMe, isDeleted, avatar } = getAuthorData(discussion, user?.id);

  useEffect(() => {
    const isIncluded = discussion.participants.filter((x) => x.user_id === user!.id).length > 0;

    if (isIncluded) {
      updateSeenTime(id!, user!.id);
    }
  }, [discussion.participants, id, user]);

  const isMeStyle = {
    pointerEvents: 'none',
    color: 'text.primary',
    ml: 2,
  };

  return (
    <Paper sx={{ p: 1 }}>
      <Stack sx={{ p: 1 }} direction='row' justifyContent='space-between'>
        <Box sx={{ display: 'flex' }}>
          <Avatar variant='rounded' src={avatar} sx={{ width: '40px', height: '40px' }} />

          <Link
            underline={isMe || isDeleted ? 'none' : 'always'}
            sx={isMe || isDeleted ? isMeStyle : { ml: 2 }}
            href={`/user/${discussion?.author_id}`}
          >
            {author?.name}, {author?.age}
          </Link>
        </Box>
        <Typography variant='caption' color='text.secondary'>
          {discussion?.created_at && <ReactTimeAgo date={discussion!.created_at} />}
        </Typography>
      </Stack>
      <Typography variant='h6' sx={{ mx: 1 }}>
        {discussion?.title}
      </Typography>

      {discussion?.subtitle?.split('\n').map((txt, i) => (
        <Typography px={1} variant='body2' color='text.secondary' key={`subtitle-${i}`}>
          {txt}
        </Typography>
      ))}
      <Counters discussion={discussion} />
    </Paper>
  );
}
