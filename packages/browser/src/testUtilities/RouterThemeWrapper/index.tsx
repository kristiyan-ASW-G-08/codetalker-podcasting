import React, { FC } from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history';
import Theme from 'components/Theme';

interface RouterTestWrapperProps {
  history: History;
}
const RouterTestWrapper: FC<RouterTestWrapperProps> = ({
  children,
  history,
}) => (
  <Theme>
    <Router history={history}>{children}</Router>
  </Theme>
);

export default RouterTestWrapper;
