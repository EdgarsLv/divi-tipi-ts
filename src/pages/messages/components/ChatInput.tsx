/* eslint-disable camelcase */
import { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Input, Divider, IconButton, InputAdornment } from '@mui/material';
import { Iconify } from '@/components';
import { Conversation, SendMessage } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { onSendMessage } from '@/redux/slices/messagesSlice';
import { supabase } from '@/service';

const RootStyle = styled('form')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

type Props = {
  disabled: boolean;
  selected: Conversation;
  chatId?: string;
};

export default function ChatInput({ disabled, selected, chatId }: Props) {
  const { user } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const messageChannel = supabase
      .channel(`public:messages:conversation_id=eq.${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${chatId}`,
        },
        (payload) => handleInsert(payload),
      )
      .subscribe((status) => console.log(status));

    // .on('INSERT', (payload) => dispatch(getRealTimeMessages(payload.new)))

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [chatId]);

  const handleInsert = (payload: any) => {
    console.log(payload);
  };

  const handleSendMessage = () => {
    if (inputRef.current?.value.trim() === '') {
      return;
    }
    const content: SendMessage = {
      sender_id: user!.id,
      receiver_id: selected.user.userId,
      message: inputRef.current!.value,
      conversation_id: selected.id,
    };

    onSendMessage(content);
    inputRef.current!.focus();
    formRef.current!.reset();
  };

  return (
    <RootStyle ref={formRef}>
      <Input
        inputRef={inputRef}
        disabled={disabled || selected?.isDeleted}
        fullWidth
        disableUnderline
        multiline
        minRows={1}
        maxRows={3}
        placeholder='Rakstīt ziņu...'
        startAdornment={
          <InputAdornment position='start'>
            <Iconify icon='line-md:emoji-smile-twotone' />
          </InputAdornment>
        }
      />

      <Divider orientation='vertical' flexItem />

      <IconButton color='primary' onClick={handleSendMessage} sx={{ mx: 1 }}>
        <Iconify icon='ic:round-send' />
      </IconButton>
    </RootStyle>
  );
}
