import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';

type AnyProps = {
  [key: string]: any;
};

type IconProps = {
  icon: string;
  sx?: SxProps<Theme>;
  other?: AnyProps;
};

export default function Iconify({ icon, sx, ...other }: IconProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
