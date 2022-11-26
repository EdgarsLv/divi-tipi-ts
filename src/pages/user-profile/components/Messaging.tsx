/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { Box, Typography, Card, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  fetchConversationId,
  onSendMessage,
  upsertConversation,
  selectConversationId,
  onUpdateLastMessage,
} from '@/redux/slices/messagesSlice';
import { useSnackbar } from 'notistack';

function Messaging() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const conversationId = useAppSelector(selectConversationId);

  const [message, setMessage] = useState<string>('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    dispatch(fetchConversationId(user!.id, id!));
  }, [dispatch, id, user]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }
    setSending(true);
    const meta = {
      sender_id: user!.id,
      receiver_id: id,
      message,
    };
    if (conversationId) {
      const value = {
        ...meta,
        conversation_id: conversationId,
      };
      onSendMessage(value).then(() => {
        onUpdateLastMessage(value);
        enqueueSnackbar('Ziņa nosūtīta');
        setSending(false);
        setMessage('');
      });
    } else {
      upsertConversation(user!.id, id!)
        .then(({ data }) => {
          onUpdateLastMessage({ ...meta, conversation_id: data!.id });
          onSendMessage({ ...meta, conversation_id: data!.id });
        })
        .then(() => {
          enqueueSnackbar('Ziņa nosūtīta');
          setSending(false);
          setMessage('');
        });
    }
  };

  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Rakstīt ziņu
      </Typography>

      <Card sx={{ p: 3 }}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          fullWidth
          rows={4}
          placeholder='Rakstīt ziņu...'
        />

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex' }}></Box>

          <Button
            disabled={sending || message.trim() === ''}
            onClick={handleSendMessage}
            variant='contained'
          >
            {sending ? 'Sūta...' : 'Sūtīt ziņu'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Messaging;
