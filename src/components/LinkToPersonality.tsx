import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

function LinkToPersonality({ personality }: { personality: string }) {
  const linkTo = `/personalities/${personality}`;
  return (
    <LinkStyle underline='always' variant='subtitle2' href={linkTo}>
      {personality}
    </LinkStyle>
  );
}

export default LinkToPersonality;

const LinkStyle = styled(Link)(() => ({
  overflow: 'hidden',
  marginRight: '10px',
}));
