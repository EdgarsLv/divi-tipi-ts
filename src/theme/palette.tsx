import { PaletteOptions, PaletteColorOptions } from '@mui/material/styles';

const PRIMARY_LIGHT: PaletteColorOptions = {
  light: '#37be40',
  main: '#1c9530',
  dark: '#1f8f26',
};
const SECONDARY_LIGHT: PaletteColorOptions = {
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
};

const PRIMARY_DARK: PaletteColorOptions = {
  light: '#37be40',
  main: '#2bc945',
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
    background: { paper: '#f1f2f5', default: '#eaecf5' },
    action: { active: '#b5c4d1', hover: '#eaeef9', selected: '#dfeaef' },
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
