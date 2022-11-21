/* eslint-disable camelcase */
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Input, Divider, IconButton, InputAdornment } from '@mui/material';
import { Iconify } from '@/components';
import { Conversation, SendMessage } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { onSendMessage, onUpdateLastMessage } from '@/redux/slices/messagesSlice';

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

export default function ChatInput({ disabled, selected }: Props) {
  const { user } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
    onUpdateLastMessage(content);

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
        placeholder={selected?.isDeleted ? 'Ar šo lietotāju nevar sazināties!' : 'Rakstīt ziņu...'}
        startAdornment={
          <InputAdornment position='start'>
            <Iconify icon='line-md:emoji-smile-twotone' />
          </InputAdornment>
        }
      />

      <Divider orientation='vertical' flexItem />

      <IconButton
        disabled={selected?.isDeleted}
        color='primary'
        onClick={handleSendMessage}
        sx={{ mx: 1 }}
      >
        <Iconify icon='ic:round-send' />
      </IconButton>
    </RootStyle>
  );
}
