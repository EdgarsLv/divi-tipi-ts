import { Grid, Card, Box, Stack, Typography, CardContent, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

function UserCard({ id }: { id: number }) {
  return (
    <Grid sx={{ position: 'relative' }} item xs={10} sm={5} md={4}>
      <InfoBoxStyle>
        <Link sx={{ mr: '10px', ml: '2px' }}>draizers</Link>
        <Link>D</Link>
      </InfoBoxStyle>
      <Link href={`/profile/${id}`}>
        <CardStyle>
          <CardMediaStyle sx={{ pt: 'calc(100% * 4 / 3.5)' }}>
            <CoverImgStyle
              alt='cover'
              src='https://www.buzzwebzine.fr/wp-content/uploads/2021/12/photo-portrait-femme-pose-naturelle-1024x649.jpg'
            />
          </CardMediaStyle>

          <CardContent
            sx={{
              p: 1,
              pt: 5,
              bottom: '-20px',

              width: '100%',
              position: 'absolute',
              background: 'linear-gradient(to bottom,rgba(0,0,0,0), rgba(0,0,0,.5), black)',
            }}
          >
            <TitleStyle direction='row'>
              <Typography variant='h5' noWrap component='span'>
                Edgars
              </Typography>
              <Typography component='span' variant='h5'>
                ,
              </Typography>
              <Typography variant='h5'>40</Typography>
            </TitleStyle>
          </CardContent>
        </CardStyle>
      </Link>
    </Grid>
  );
}

export default UserCard;

// STYLES ----------------------------------------------------------------------
const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[2],
}));

const CardMediaStyle = styled(Box)({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Stack)(({ theme }) => ({
  color: theme.palette.common.white,
  overflow: 'hidden',
  textDecoration: 'none',
  marginRight: '10px',
  padding: '0 0 20px',
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const InfoBoxStyle = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  position: 'absolute',
  bottom: 0,
  padding: '5px 0',
  marginLeft: '5px',
  zIndex: 1,
}));

// const IQStyle = styled(Box)(() => ({
//   display: 'inline-flex',
//   justifyContent: 'flex-start',
//   position: 'absolute',
//   top: 24,
//   padding: '0 5px',
//   margin: '5px 10px',
//   zIndex: 1,
//   mixBlendMode: 'difference',
// }));
