import React, { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

import theme, { buttonVariants } from './theme';
import mediaQueries from './mediaQueries';

interface ThemeProps {
  children: JSX.Element;
}
const Theme: FunctionComponent<ThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={{ mediaQueries, ...theme, buttonVariants }}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
