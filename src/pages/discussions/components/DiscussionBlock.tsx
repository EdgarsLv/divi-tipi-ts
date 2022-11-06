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
import { useTheme } from '@mui/material/styles';
import { Discussion } from '@/types';
import BlockFooter from './BlockFooter';

export const getAuthorData = (data: any, userId: any) => {
  let author = data?.author;
  let isMe = false;
  let isDeleted = false;
  let avatarImg = null;

  if (!data?.author) {
    author = { name: 'Dzēsts lietotājs', age: '', avatar: undefined };
    isDeleted = true;
  }
  if (data?.author_id === userId) {
    isMe = true;
  }
  if (author.avatar) {
    avatarImg = 'dd';
  }

  return { author, isMe, isDeleted, avatarImg };
};

export default function DiscussionBlock({ discussion }: { discussion: Discussion }) {
  //   const userId = 'id';

  const theme = useTheme();
  const navigate = useNavigate();

  //   const { author, isMe, isDeleted, avatarImg } = getAuthorData(data, userId);

  const linkToDiscussion = 'dd';
  //   const linkToUser = 'ee';

  //   const style = {
  //     pointerEvents: 'none',
  //     color: 'text.primary',
  //   };

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 1,
        mb: 1,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <CardHeader
        sx={{ py: 0.5, px: 2 }}
        avatar={<Avatar src='' variant='rounded' sx={{ width: '40px', height: '40px' }} />}
        title={
          <Link
            // sx={isMe || isDeleted ? style : { textDecoration: 'underline' }}
            href='/'
          >
            {discussion.author?.name}, {discussion.author?.age}
          </Link>
        }
        subheader={
          <Typography variant='caption' color='text.secondary'>
            2022.10.23
          </Typography>
        }
      />

      <CardActionArea onClick={() => navigate(linkToDiscussion)}>
        <CardContent sx={{ px: 2, py: 1 }}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
            gutterBottom
            variant='subtitle1'
          >
            {discussion.title}
          </Typography>

          {/* <TextMaxLine>{discussion.subtitle}</TextMaxLine> */}
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
            variant='body2'
            color='text.secondary'
          >
            {discussion.subtitle}
          </Typography>
        </CardContent>

        <Divider />

        {discussion?.last_comment && (
          <Stack
            sx={{ my: 1, mr: 2 }}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography
              sx={{
                ml: 2,
                mr: 1,
                maxWidth: '65%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
              variant='body2'
            >
              {discussion.last_comment ? discussion.last_comment : ''}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              2022.10.20
            </Typography>
          </Stack>
        )}
      </CardActionArea>

      <CardActions sx={{ px: 2 }}>
        <BlockFooter
          users={discussion.users_count}
          views={discussion.views_count}
          comments={discussion.comments_count}
        />
      </CardActions>
    </Card>
  );
}
