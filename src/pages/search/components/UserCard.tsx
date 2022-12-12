/* eslint-disable camelcase */
import { Image, LinkToPersonality, LinkToRelations } from '@/components';
import { useUserImages } from '@/hooks';
import { User } from '@/types';
import { Box, Card, Grid, Link, Typography, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

function UserCard({ user }: { user: User }) {
  const theme = useTheme();
  const { iq_public, iq_value, name, age, sociotype, id, confirmed_sociotype, updated_at } = user;

  const { avatar } = useUserImages(user);

  const isLight = theme.palette.mode === 'light';
  const height = isLight ? 1 : 0.5;

  const lastOnline = () => {
    let color = isLight ? '#44eb31' : '#87e283';

    if (new Date().getTime() - new Date(updated_at).getTime() > 1800000) {
      color = isLight ? '#ecf637' : '#e7eea3';
    }

    if (new Date().getTime() - new Date(updated_at).getTime() > 3600000) {
      color = 'transparent';
    }

    return color;
  };

  const color = lastOnline();

  return (
    <Grid sx={{ position: 'relative' }} item xs={10} sm={5} md={4}>
      <Card
        sx={{
          transition: 'ease .2s',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <Link sx={{ textDecoration: 'none' }} href={`/user/${id}`}>
          <Image ratio='1/1' src={avatar} />
        </Link>
        <Box sx={{ py: 0.5, px: 1, borderBottom: `${height}px solid ${color}` }}>
          <Box>
            <Typography mr={1} variant='subtitle1' component='span'>
              {name}
            </Typography>

            <Typography variant='subtitle1' component='span'>
              {age}
            </Typography>
          </Box>

          <Box>
            <LinkToPersonality confirmed={confirmed_sociotype} personality={sociotype} />
            <LinkToRelations personality={sociotype} />
          </Box>
        </Box>
        {iq_value && (
          <IQBox>
            <Typography sx={{ fontWeight: 'bold', px: 0.5, fontSize: '12px' }}>
              IQ:
              {iq_public ? <IQShow>{iq_value}</IQShow> : <IQHide>oIo</IQHide>}
            </Typography>
          </IQBox>
        )}
      </Card>
    </Grid>
  );
}

export default UserCard;

const IQBox = styled(Paper)(() => ({
  position: 'absolute',
  top: 0,
  margin: '4px',
}));

const IQShow = styled('span')(() => ({
  marginLeft: '4px',
  fontSize: '12px',
  fontWeight: 'bold',
}));

const IQHide = styled('span')(() => ({
  filter: 'blur(3px)',
  marginLeft: '4px',
  fontSize: '12px',
  fontWeight: 'bold',
}));
