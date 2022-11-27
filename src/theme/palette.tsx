import { PaletteOptions, PaletteColorOptions } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';

const PRIMARY_LIGHT: PaletteColorOptions = {
  light: cyan[400],
  main: cyan[700],
  dark: cyan[800],
};
const SECONDARY_LIGHT: PaletteColorOptions = {
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
};

const PRIMARY_DARK: PaletteColorOptions = {
  light: cyan[500],
  main: cyan[700],
  dark: cyan[800],
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
    text: { primary: '#1f5353', secondary: '#266666' },
    background: { paper: cyan[50], default: cyan[100] },
    action: { active: cyan[100], hover: '#cbf3f8', selected: '#9ce8f1' },
  } as PaletteOptions,

  dark: {
    ...COMMON_DARK,
    mode: 'dark',
    text: { primary: '#2ae1e1', secondary: '#8acdcd' },
    background: { paper: '#343744', default: '#2C2F3C' },
    action: { active: '#919EAB' },
  } as PaletteOptions,
};

export default palette;
