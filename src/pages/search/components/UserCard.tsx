/* eslint-disable camelcase */
import { Image, LinkToPersonality, LinkToRelations } from '@/components';
import { useUserImages } from '@/hooks';
import { User } from '@/types';
import { Box, Card, Grid, Link, Typography } from '@mui/material';

function UserCard({ user }: { user: User }) {
  const { name, age, sociotype, id, confirmed_sociotype, updated_at } = user;

  const { avatar } = useUserImages(user);

  const isOnline = () => {
    let color = 'lime';

    if (new Date().getTime() - new Date(updated_at).getTime() > 300000) {
      color = 'yellow';
    }

    if (new Date().getTime() - new Date(updated_at).getTime() > 600000) {
      color = 'transparent';
    }

    return color;
  };

  const color = isOnline();

  return (
    <Grid sx={{ position: 'relative' }} item xs={10} sm={5} md={4}>
      <Card sx={{ transition: 'ease .2s', '&:hover': { backgroundColor: 'action.hover' } }}>
        <Link sx={{ textDecoration: 'none' }} href={`/user/${id}`}>
          <Image ratio='1/1' src={avatar} />
        </Link>
        <Box sx={{ py: 0.5, px: 1, borderBottom: `1px solid ${color}` }}>
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
      </Card>
    </Grid>
  );
}

export default UserCard;
