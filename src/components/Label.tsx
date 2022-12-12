import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from './Iconify';

type LabelProps = {
  icon?: string;
  label: string | number;
};

function Label({ icon, label }: LabelProps) {
  return (
    <StyledBox>
      {icon && <Iconify sx={{ mr: 0.8 }} icon={icon} />}
      <Typography sx={{ fontSize: '12px' }} component='span'>
        {label}
      </Typography>
    </StyledBox>
  );
}

export default Label;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0.8),
  borderRadius: '2px',
  fontSize: '12px',
}));
