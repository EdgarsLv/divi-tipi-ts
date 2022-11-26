import { styled } from '@mui/material/styles';
import { Link, SxProps, Theme, useTheme } from '@mui/material';
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
const common = {
  backgroundSize: '200% auto',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${spin} 2.5s infinite ease`,
};
const styleLight = {
  backgroundImage: 'linear-gradient(to right, black, #a07d1f 50%, #8e860f 30%, #7b540c   )',
  ...common,
};

const styleDark = {
  backgroundImage: 'linear-gradient(to right, white, #efdc30 50%, #e9c217 30%, #f7ca36   )',
  ...common,
};

function LinkToPersonality({ personality, confirmed, sx }: Props) {
  const theme = useTheme();
  const linkTo = `/personalities/${personality}`;

  const isLight = theme.palette.mode === 'light';
  const style = isLight ? styleLight : styleDark;
  const animate = confirmed ? style : { color: 'text.secondary' };

  return (
    <LinkStyle
      sx={{ textDecorationColor: 'grey', ...sx, ...animate }}
      variant='subtitle2'
      href={linkTo}
    >
      {personality}
    </LinkStyle>
  );
}

export default LinkToPersonality;

const LinkStyle = styled(Link)(() => ({
  overflow: 'hidden',
  marginRight: '10px',
}));
