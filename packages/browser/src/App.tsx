import React, { FC } from 'react';
import Theme from 'components/Theme';
import Routes from 'components/Routes/index';
import { Normalize } from 'styled-normalize';
import GlobalStyle from 'styled/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import 'importFontAwesome';
const App: FC = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Normalize />
      <Theme>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Theme>
    </>
  );
};

export default App;
