import { PaletteOptions, PaletteColorOptions } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const PRIMARY: PaletteColorOptions = {
  light: teal[200],
  main: teal[600],
  dark: teal[900],
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
    text: { primary: teal[900], secondary: teal[800] },
    background: { paper: teal[50], default: teal[200] },
    action: { active: '#637381', hover: teal[100] },
  } as PaletteOptions,

  dark: {
    ...COMMON_LIGHT,
    mode: 'dark',
    text: { primary: teal[400], secondary: teal[600] },
    background: { paper: ' #343744', default: '#2C2F3C' },
    action: { active: '#919EAB' },
  } as PaletteOptions,
};

export default palette;
