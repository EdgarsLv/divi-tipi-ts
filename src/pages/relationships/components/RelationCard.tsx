import { Relations } from '@/constants';
import { Box, Card, Grid, Stack, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Label } from '@/components';

function RelationCard({ relation }: { relation: Relations }) {
  const { key, name, description } = relation;

  const linkTo = `/relationships/${name}`;
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card
        sx={{
          position: 'relative',
          transition: 'ease .1s',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <Link sx={{ textDecoration: 'none' }} href={linkTo}>
          <StyledBox>
            <Label icon='akar-icons:eye-open' label={47} />
          </StyledBox>
          <Stack sx={{ p: 2 }}>
            <StyledText color='text.primary' variant='subtitle2' noWrap>
              {name} -
              <Typography
                variant='subtitle2'
                sx={{ textTransform: 'none', ml: 0.5 }}
                component='span'
              >
                {key}
              </Typography>
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

export default RelationCard;

const StyledText = styled(Typography)(() => ({
  textTransform: 'capitalize',
}));

const StyledBox = styled(Box)(() => ({
  top: 16,
  right: 16,
  zIndex: 9,
  position: 'absolute',
}));
