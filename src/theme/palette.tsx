import { PaletteOptions, PaletteColorOptions } from '@mui/material/styles';

const PRIMARY_LIGHT: PaletteColorOptions = {
  light: '#93c577',
  main: '#63944A',
  dark: '#35661f',
};
const SECONDARY_LIGHT: PaletteColorOptions = {
  light: '#e2406d',
  main: '#cc2054',
  dark: '#b71c4f',
};

const PRIMARY_DARK: PaletteColorOptions = {
  light: '#7fdbaf',
  main: '#63944a',
  dark: '#336A25',
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
    text: { primary: '#080b06', secondary: '#2e4422' },
    background: { paper: '#ffffff', default: '#f1f8e8' },
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
