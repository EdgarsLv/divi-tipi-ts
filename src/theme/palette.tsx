import { PaletteOptions, PaletteColorOptions } from '@mui/material/styles';
import { amber, grey } from '@mui/material/colors';

const PRIMARY: PaletteColorOptions = {
  light: amber[200],
  main: amber[600],
  dark: amber[900],
};
const SECONDARY: PaletteColorOptions = {
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
};
const INFO: PaletteColorOptions = {
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
};
const SUCCESS: PaletteColorOptions = {
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
};
const WARNING: PaletteColorOptions = {
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
};
const ERROR: PaletteColorOptions = {
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
};

const COMMON_LIGHT: PaletteOptions = {
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  error: { ...ERROR, contrastText: '#fff' },
  warning: { ...WARNING, contrastText: '#212B36' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: '#212B36' },
};

const palette = {
  light: {
    ...COMMON_LIGHT,
    mode: 'light',
    text: { primary: grey[800], secondary: grey[600] },
    background: { paper: amber[100], default: amber[300] },
    action: { active: '#637381', hover: amber[200] },
  } as PaletteOptions,

  dark: {
    ...COMMON_LIGHT,
    mode: 'dark',
    text: { primary: amber[400], secondary: amber[300] },
    background: { paper: ' #343744', default: '#2C2F3C' },
    action: { active: '#919EAB' },
  } as PaletteOptions,
};

export default palette;
