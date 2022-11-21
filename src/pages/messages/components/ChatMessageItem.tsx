import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/types';
import { ReactTimeAgo } from '@/components';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 620,
  minWidth: 150,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.25),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  fontSize: '10px',
  marginBottom: theme.spacing(0.25),
  color: theme.palette.text.secondary,
}));

export default function ChatMessageItem({ message }: { message: Message }) {
  const { user } = useAuth();

  const isMe = message.sender_id === user!.id;

  return (
    <RootStyle>
      <Box sx={{ display: 'flex', ...(isMe && { ml: 'auto' }) }}>
        <div>
          <InfoStyle variant='caption' sx={{ ...(isMe && { justifyContent: 'flex-end' }) }}>
            <ReactTimeAgo date={message.created_at} />
          </InfoStyle>

          <ContentStyle sx={{ ...(isMe && { color: '#f1f1f1', bgcolor: 'primary.main' }) }}>
            {message.message?.split('\n').map((msg, i) => (
              <Typography variant='body2' sx={{ minHeight: '0.8rem' }} key={i}>
                {msg}
              </Typography>
            ))}
          </ContentStyle>
        </div>
      </Box>
    </RootStyle>
  );
}
