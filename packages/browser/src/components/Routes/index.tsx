import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
const Routes: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default Routes;
