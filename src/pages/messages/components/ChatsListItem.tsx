/* eslint-disable camelcase */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Avatar, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { Iconify, ReactTimeAgo } from '@/components';
import { Conversation } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectAccountData } from '@/redux/slices/accountSlice';
import { getAvatar, getMessageStatus } from '../utils';
import { setListOpen, updateConversationStatus } from '@/redux/slices/messagesSlice';

type Props = {
  chatId?: string;
  isSelected: boolean;
  conversation: Conversation;
};

export default function ChatsListItem({ chatId, isSelected, conversation }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { has_sociotype } = useAppSelector(selectAccountData);

  const status = getMessageStatus(conversation, user!.id);
  const avatar = getAvatar(conversation);

  useEffect(() => {
    if (Number(chatId) === conversation.id && status.isNew) {
      updateConversationStatus(user!.id, conversation.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.id, chatId, status.isNew, user?.id]);

  const handleSelect = () => {
    dispatch(setListOpen(false));
    navigate(`/messages/${conversation.id}`);
  };
  return (
    <RootStyle
      disabled={!has_sociotype}
      onClick={handleSelect}
      sx={{ ...(isSelected && { bgcolor: 'action.selected' }) }}
    >
      <ListItemAvatar>
        <Avatar variant='rounded' alt='avatar' src={avatar} />
      </ListItemAvatar>

      <>
        <ListItemText
          sx={{ '&.MuiListItemText-root': { margin: 0 } }}
          primary={`${conversation.user.name || 'Aizpildiet testu'}, ${
            conversation.user.age || ''
          }`}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'subtitle2',
          }}
          secondary={conversation.lastMessage}
          secondaryTypographyProps={{
            noWrap: true,
          }}
        />

        <StatusBox>
          <TimeBox>
            <ReactTimeAgo date={conversation.updated_at} />
          </TimeBox>

          {status.notSeen && <Iconify icon='ic:sharp-done' />}
          {status.isSeen && <Iconify icon='ic:sharp-done-all' sx={{ color: 'green' }} />}
          {status.isNew && (
            <Iconify icon='ic:outline-notifications-active' sx={{ color: 'primary.main' }} />
          )}
        </StatusBox>
      </>
    </RootStyle>
  );
}

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  transition: theme.transitions.create('all'),
  borderBottom: '1px solid #e0dddd',
}));

const StatusBox = styled(Box)(() => ({
  marginLeft: '16px',
  height: '44px',
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
}));

const TimeBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: 10,
  lineHeight: '22px',
  whiteSpace: 'nowrap',
  color: theme.palette.text.disabled,
}));
