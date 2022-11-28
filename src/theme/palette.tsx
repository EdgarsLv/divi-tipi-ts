import { PaletteOptions, PaletteColorOptions } from '@mui/material/styles';

const PRIMARY_LIGHT: PaletteColorOptions = {
  light: '#4b9b75',
  main: '#16b978',
  dark: '#0d6a45',
};
const SECONDARY_LIGHT: PaletteColorOptions = {
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
};

const PRIMARY_DARK: PaletteColorOptions = {
  light: '#7fdbaf',
  main: '#00a160',
  dark: '#168056',
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
    text: { primary: '#084a30', secondary: '#105e3f' },
    background: { paper: '#fafffc', default: '#e3f3eb' },
    action: { active: '#d6f2e5', hover: '#e3f1eb', selected: '#d6f2e5' },
  } as PaletteOptions,

  dark: {
    ...COMMON_DARK,
    mode: 'dark',
    text: { primary: '#e9edf2', secondary: '#a5b2be' },
    background: { paper: '#131b25', default: '#161C24' },
    action: { active: '#171f28', hover: '#10141c', selected: '#0d1218' },
  } as PaletteOptions,
};

export default palette;
