const theme = {
  primary: '#F7BD02',
  dark: '#1C2938',
  white: '#FFFFFF',
  light: '#8899A6',
  border: '#99a8b3',
  transparent: 'transparent',
};

export const buttonVariants = {
  primary: {
    background: theme.primary,
    color: theme.white,
    active: {
      background: theme.white,
      color: theme.primary,
    },
  },
  dark: {
    background: theme.dark,
    color: theme.white,
    active: {
      background: theme.white,
      color: theme.dark,
    },
  },
};

export default theme;
