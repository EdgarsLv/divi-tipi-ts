import { Iconify } from '@/components';
import { useCounters } from '@/hooks';
import { setListOpen } from '@/redux/slices/messagesSlice';
import { useAppDispatch } from '@/redux/store';
import { IconButton, Badge, BadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

function SmallNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const { newMessages, statistics, newDiscussions } = useCounters();

  const handleMessages = () => {
    if (!pathname.includes('/messages/')) {
      navigate('/messages');
    }

    dispatch(setListOpen(true));
  };

  return (
    <>
      <IconButton onClick={() => navigate('/iq-test')}>
        <Iconify
          icon='icon-park-outline:thinking-problem'
          sx={{ color: 'text.primary', width: 20, height: 20 }}
        />
      </IconButton>

      <IconButton onClick={() => navigate('/')}>
        <Iconify
          icon='ic:baseline-people-outline'
          sx={{ color: 'text.primary', width: 21, height: 21 }}
        />
      </IconButton>

      <IconButton onClick={() => navigate('/discussions')}>
        <StyledBadge color='primary' badgeContent={newDiscussions}>
          <Iconify icon='bx:bx-chat' sx={{ color: 'text.primary', width: 21, height: 21 }} />
        </StyledBadge>
      </IconButton>

      <IconButton onClick={() => navigate('/statistics')}>
        <StyledBadge color='primary' badgeContent={statistics}>
          <Iconify icon='eva:eye-outline' sx={{ color: 'text.primary', width: 21, height: 21 }} />
        </StyledBadge>
      </IconButton>

      <IconButton sx={{ mr: 2 }} onClick={handleMessages}>
        <StyledBadge color='primary' badgeContent={newMessages}>
          <Iconify
            icon='ic:round-mail-outline'
            sx={{ color: 'text.primary', width: 21, height: 21 }}
          />
        </StyledBadge>
      </IconButton>
    </>
  );
}

export default SmallNav;

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
