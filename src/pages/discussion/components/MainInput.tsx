/* eslint-disable camelcase */
import { useRef } from 'react';
import { selectAccountData } from '@/redux/slices/accountSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Button, Paper, Stack, TextField } from '@mui/material';
import { CommentAuthor, CommentContent } from '@/types';
import { useParams } from 'react-router-dom';
import { postMainComment } from '@/redux/slices/discussionsSlice';

function MainInput() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const account = useAppSelector(selectAccountData);

  const inputRef = useRef<HTMLInputElement>(null);

  const postComment = async () => {
    const text = inputRef!.current!.value;
    const time = new Date().toISOString();
    if (text.trim() === '') {
      return;
    }
    const content: CommentContent = {
      text,
      discussion_id: id!,
      author_id: account!.id,
    };
    const author: CommentAuthor = {
      age: account.age,
      name: account.name,
      avatar_image: { avatar: account?.avatar_image?.avatar, updated_at: time },
    };

    try {
      dispatch(postMainComment(content, author));
    } catch (e) {
      console.error(e);
    } finally {
      window.scrollTo(0, 0);
      inputRef!.current!.value = '';
    }
  };

  return (
    <Paper elevation={1} sx={{ px: 1, pt: 2, mt: 1 }}>
      <TextField inputRef={inputRef} size='small' label='atbilde' fullWidth multiline rows={3} />
      <Stack>
        <Button onClick={postComment} sx={{ ml: 'auto', my: 1 }} variant='contained'>
          atbildēt
        </Button>
      </Stack>
    </Paper>
  );
}

export default MainInput;
