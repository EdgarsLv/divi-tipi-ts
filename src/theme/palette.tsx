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
  light: '#7ac952',
  main: '#63944a',
  dark: '#336A25',
};
const SECONDARY_DARK: PaletteColorOptions = {
  light: '#e2406d',
  main: '#cc2054',
  dark: '#b71c4f',
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
    action: { active: '#ddf3d2', hover: '#e5f3de', selected: '#e5f4de' },
  } as PaletteOptions,

  dark: {
    ...COMMON_DARK,
    mode: 'dark',
    text: { primary: '#5e9940', secondary: '#cee2c4' },
    background: { paper: '#131b25', default: '#161C24' },
    action: { active: '#171f28', hover: '#10141c', selected: '#0d1218' },
  } as PaletteOptions,
};

export default palette;
