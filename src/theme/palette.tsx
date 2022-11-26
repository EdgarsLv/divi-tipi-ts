import { PaletteOptions, PaletteColorOptions } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const PRIMARY_LIGHT: PaletteColorOptions = {
  light: teal[300],
  main: teal[500],
  dark: teal[700],
};
const SECONDARY_LIGHT: PaletteColorOptions = {
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
};

const PRIMARY_DARK: PaletteColorOptions = {
  light: '#37be40',
  main: '#1faa40',
  dark: '#1f8f26',
};
const SECONDARY_DARK: PaletteColorOptions = {
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
};

const COMMON_LIGHT: PaletteOptions = {
  primary: { ...PRIMARY_LIGHT, contrastText: '#fff' },
  secondary: { ...SECONDARY_LIGHT, contrastText: '#fff' },
};

const COMMON_DARK: PaletteOptions = {
  primary: { ...PRIMARY_DARK, contrastText: '#fff' },
  secondary: { ...SECONDARY_DARK, contrastText: '#fff' },
};

const palette = {
  light: {
    ...COMMON_LIGHT,
    mode: 'light',
    text: { primary: '#1c3443', secondary: '#395566' },
    background: { paper: teal[50], default: teal[100] },
    action: { active: '#ace1dd', hover: '#b2dfdb', selected: '#cbf0ed' },
  } as PaletteOptions,

  dark: {
    ...COMMON_DARK,
    mode: 'dark',
    text: { primary: '#e2eae0', secondary: '#bfc1bf' },
    background: { paper: '#343744', default: '#2C2F3C' },
    action: { active: '#919EAB' },
  } as PaletteOptions,
};

export default palette;
