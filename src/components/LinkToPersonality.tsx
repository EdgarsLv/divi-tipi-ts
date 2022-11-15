import { styled } from '@mui/material/styles';
import { Link, SxProps, Theme } from '@mui/material';

type Props = {
  personality: string;
  sx?: SxProps<Theme>;
};

function LinkToPersonality({ personality, sx }: Props) {
  const linkTo = `/personalities/${personality}`;
  return (
    <LinkStyle sx={{ ...sx }} underline='always' variant='subtitle2' href={linkTo}>
      {personality}
    </LinkStyle>
  );
}

export default LinkToPersonality;

const LinkStyle = styled(Link)(() => ({
  overflow: 'hidden',
  marginRight: '10px',
}));
