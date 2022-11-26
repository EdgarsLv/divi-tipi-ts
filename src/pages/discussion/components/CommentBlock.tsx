/* eslint-disable camelcase */
import { Iconify, ReactTimeAgo } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { selectAccountData } from '@/redux/slices/accountSlice';
import { postReplyComment } from '@/redux/slices/discussionsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Comment, CommentAuthor, CommentContent } from '@/types';
import { Avatar, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuthorData } from '../utils/getAuthorData';
import { grey } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

export default function CommentBlock({ comment }: { comment: Comment }) {
  const { id } = useParams();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccountData);

  const inputRef = useRef<HTMLInputElement>(null);

  const { author, isMe, isDeleted, avatar } = getAuthorData(comment, user?.id);

  const postReply = async () => {
    const text = inputRef!.current!.value;
    const time = new Date().toISOString();
    if (text.trim() === '') {
      return;
    }

    const content: CommentContent = {
      text,
      reply_to: comment.id,
      discussion_id: id!,
      author_id: user!.id,
    };

    const author: CommentAuthor = {
      age: account.age,
      name: account.name,
      avatar_image: { avatar: account?.avatar_image?.avatar, updated_at: time },
    };

    try {
      dispatch(postReplyComment(content, author));
    } catch (e) {
      console.error(e);
    } finally {
      inputRef!.current!.value = '';
      //   dispatch(getDiscussionCommentsById(id));
      setOpen(false);
    }
  };

  const hasReply = Boolean(comment.reply_to);

  return (
    <Box sx={hasReply ? replyStyle : noReplyStyle}>
      <Stack direction='row'>
        <Box>
          <Avatar variant='rounded' src={avatar} sx={{ width: '30px', height: '30px' }} />
        </Box>
        <Stack sx={{ ml: 1, width: '100%' }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Link
              underline={isMe || isDeleted ? 'none' : 'always'}
              sx={isMe || isDeleted ? isMeStyle : { ml: 1 }}
              href={`/user/${comment?.author_id}`}
            >
              {author?.name}, {author?.age}
            </Link>
            <Typography variant='caption' color='text.secondary'>
              <ReactTimeAgo date={comment?.created_at} />
            </Typography>
          </Stack>
          <Box sx={{ p: 1 }}>
            {comment?.text?.split('\n').map((txt: any, i: number) => (
              <Typography
                sx={{ minHeight: '0.9rem', lineHeight: '1rem' }}
                variant='body2'
                color='text.secondary'
                key={`comment-${i}`}
              >
                {txt}
              </Typography>
            ))}
          </Box>
          <Stack
            sx={{ borderBottom: `1px solid ${alpha(grey[500], 0.1)}` }}
            direction='row'
            justifyContent='flex-end'
          >
            {!hasReply ? (
              <Typography
                onClick={() => setOpen(!open)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: 'primary.main',
                }}
              >
                <Iconify icon={'mdi:message-reply-text'} sx={{ width: '12px' }} />
                <Typography ml='5px' variant='caption'>
                  {open ? 'Atcelt' : 'Atbildēt'}
                </Typography>
              </Typography>
            ) : null}
          </Stack>
          {!hasReply && open ? (
            <Box>
              <TextField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                variant='filled'
                fullWidth
                size='small'
                multiline
                inputRef={inputRef}
                placeholder='rakstīt...'
              />
              <Button
                size='small'
                sx={{ mb: 0.5, mt: 0.5 }}
                variant='contained'
                onClick={postReply}
              >
                atbildēt
              </Button>
              <Button
                size='small'
                sx={{ mb: 0.5, ml: 1, mt: 0.5 }}
                variant='outlined'
                onClick={() => setOpen(!open)}
              >
                Atcelt
              </Button>
            </Box>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
}

// prettier-ignore
const replyStyle = {
  px: 1, py: 1, ml: 3.5, borderLeft: `1.5px solid ${alpha(grey[600], 0.5)}`, borderRadius: 0
};
// prettier-ignore
const noReplyStyle = {
  mt: 1, pt: 1, px: 1, pb: 0
};

const isMeStyle = {
  pointerEvents: 'none',
  color: 'text.primary',
  ml: 1,
};
