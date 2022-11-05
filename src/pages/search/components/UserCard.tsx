import { Image } from '@/components';
import { useUserImages } from '@/hooks/useUserImages';
import { User } from '@/types';
import { Box, Card, Grid, Link, Typography } from '@mui/material';

function UserCardV2({ user }: { user: User }) {
  const { name, age, sociotype, id } = user;

  const { avatar } = useUserImages(user);

  return (
    <Grid sx={{ position: 'relative' }} item xs={10} sm={5} md={4}>
      <Card sx={{ transition: 'ease .2s', '&:hover': { backgroundColor: 'action.hover' } }}>
        <Link sx={{ textDecoration: 'none' }} href={`/profile/${id}`}>
          <Image ratio='1/1' src={avatar} />
        </Link>
        <Box sx={{ py: 0.5, px: 1 }}>
          <Box>
            <Typography mr={1} variant='subtitle1' component='span'>
              {name}
            </Typography>

            <Typography variant='subtitle1' component='span'>
              {age}
            </Typography>
          </Box>
          <Box>
            <Link mr={1} variant='body2' href={`/personalities/${sociotype}`}>
              {sociotype}
            </Link>
            <Link px={1} variant='body2' href='/'>
              D
            </Link>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}

export default UserCardV2;
