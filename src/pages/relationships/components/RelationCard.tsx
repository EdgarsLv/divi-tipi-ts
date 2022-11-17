import { Box, Card, Grid, Stack, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Label } from '@/components';
import { Relations } from '@/types';

function RelationCard({ relation }: { relation: Relations }) {
  const { id, views, caption, short } = relation;

  const linkTo = `/relationships/${id}`;
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
            <Label icon='akar-icons:eye-open' label={views} />
          </StyledBox>
          <Stack sx={{ p: 2 }}>
            <StyledText color='text.primary' variant='subtitle2' noWrap>
              {id} -
              <Typography
                variant='subtitle2'
                sx={{ textTransform: 'none', ml: 0.5 }}
                component='span'
              >
                {short}
              </Typography>
            </StyledText>
            <StyledText color='text.secondary' variant='subtitle2' noWrap>
              {caption}
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
