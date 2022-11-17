import { styled } from '@mui/material/styles';
import { Link, SxProps, Theme } from '@mui/material';
import { keyframes } from '@emotion/react';

type Props = {
  personality: string;
  confirmed?: boolean;
  sx?: SxProps<Theme>;
};

const spin = keyframes`
  from {
    background-position: 200% center;
  }
`;

const style = {
  backgroundImage: 'linear-gradient(to right, black, #a07d1f 50%, #8e860f 30%, #7b540c   )',
  backgroundSize: '200% auto',

  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',

  animation: `${spin} 2.5s infinite ease`,
};

function LinkToPersonality({ personality, confirmed, sx }: Props) {
  const linkTo = `/personalities/${personality}`;

  const animate = confirmed ? style : {};

  return (
    <LinkStyle sx={{ ...sx, ...animate }} underline='always' variant='subtitle2' href={linkTo}>
      {personality}
    </LinkStyle>
  );
}

export default LinkToPersonality;

const LinkStyle = styled(Link)(() => ({
  overflow: 'hidden',
  marginRight: '10px',
}));
