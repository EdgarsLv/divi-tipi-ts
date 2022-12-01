import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Discussion } from '@/types';
import Counters from './Counters';
import { getAuthorData } from '@/pages/discussion/utils/getAuthorData';
import { useAuth } from '@/contexts/AuthContext';
import { ReactTimeAgo } from '@/components';
import { styled } from '@mui/material/styles';

export default function DiscussionBlock({ discussion }: { discussion: Discussion }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isMe, isDeleted, avatar } = getAuthorData(discussion, user?.id);

  const style = {
    pointerEvents: 'none',
    color: 'text.primary',
  };

  return (
    <Card
      sx={{
        ...(!discussion.isSeen ? { backgroundColor: 'action.selected' } : {}),
        borderRadius: 0,
        boxShadow: 1,
        mb: 1,
      }}
    >
      <CardHeader
        sx={{ py: 0.5, px: 2 }}
        avatar={<Avatar src={avatar} variant='rounded' sx={{ width: '40px', height: '40px' }} />}
        title={
          <Link
            variant='body1'
            underline={isMe || isDeleted ? 'none' : 'always'}
            sx={isMe || isDeleted ? style : {}}
            href={`/user/${discussion.author_id}`}
          >
            {discussion?.author?.name}, {discussion?.author?.age}
          </Link>
        }
        subheader={
          <Typography variant='caption' color='text.secondary'>
            <ReactTimeAgo date={discussion.created_at} />
          </Typography>
        }
      />

      <CardActionArea onClick={() => navigate(`/discussions/${discussion.id}`)}>
        <CardContent sx={{ px: 2, py: 1 }}>
          <TextOneLine gutterBottom variant='subtitle1'>
            {discussion.title}
          </TextOneLine>

          <TextOneLine variant='body2' color='text.secondary'>
            {discussion.subtitle}
          </TextOneLine>
        </CardContent>

        <Divider />

        {discussion?.last_comment && (
          <Stack
            sx={{ my: 1, mr: 2 }}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <TextOneLine sx={{ ml: 2, mr: 1, maxWidth: '65%' }} variant='body2'>
              {discussion?.last_comment ? discussion.last_comment : ''}
            </TextOneLine>
            <Typography variant='caption' color='text.secondary'>
              <ReactTimeAgo date={discussion.updated_at} />
            </Typography>
          </Stack>
        )}
      </CardActionArea>

      <CardActions sx={{ px: 2 }}>
        <Counters
          users={discussion.users_count}
          views={discussion.views_count}
          comments={discussion.comments_count}
        />
      </CardActions>
    </Card>
  );
}

const TextOneLine = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
}));
