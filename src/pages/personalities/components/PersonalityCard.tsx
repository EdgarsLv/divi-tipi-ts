import { Personalities } from '@/assets/personalities/sociotypes';
import { Label } from '@/components';
import { Box, Card, Grid, Stack, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

function PersonalityCard({ personality }: { personality: Personalities }) {
  const { name, description, tipsImg } = personality;

  const linkTo = `/personalities/${name}`;

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card
        sx={{
          position: 'relative',
          transition: 'ease .1s',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <Link sx={{ textDecoration: 'none' }} href={linkTo}>
          <StyledBox>
            <Label label={34} icon='akar-icons:eye-open' />
          </StyledBox>
          <img loading='lazy' style={{ marginTop: '8px' }} alt={name} src={tipsImg} />
          <Stack sx={{ p: 2 }}>
            <StyledText color='text.primary' variant='h6' noWrap>
              {name}
            </StyledText>

            <StyledText color='text.secondary' variant='subtitle2' noWrap>
              {description}
            </StyledText>
          </Stack>
        </Link>
      </Card>
    </Grid>
  );
}

export default PersonalityCard;

const StyledText = styled(Typography)(() => ({
  textTransform: 'capitalize',
}));

const StyledBox = styled(Box)(() => ({
  top: 16,
  right: 16,
  zIndex: 9,
  position: 'absolute',
}));
