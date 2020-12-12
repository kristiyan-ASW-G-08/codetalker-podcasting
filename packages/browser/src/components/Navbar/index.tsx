import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  NavbarWrapper,
  Logo,
  LinksList,
  NavIcon,
  NavLinkWrapper,
} from './styled';
import useStores from 'hooks/useStores';

import Button from 'styled/Button';
import logo from 'assets/logo.svg';
const Home: FC = (): JSX.Element => {
  const { authStore } = useStores();
  const { user } = authStore.authState;
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
  const toggleSidebar = () => setIsSidebarActive(!isSidebarActive);
  return (
    <NavbarWrapper>
      <Logo>
        {' '}
        <img src={logo} alt="logo" />
        <span>CodeTalker</span>
      </Logo>
      <LinksList>
        <li>
          <NavLinkWrapper to={`/podcasts`}>Podcasts</NavLinkWrapper>
        </li>
        {user ? (
          <li>
            <Button onClick={() => authStore.resetAuthState()}>Logout</Button>
          </li>
        ) : (
          <>
            <li>
              <NavLinkWrapper to={`/sign-up`}>Sign Up</NavLinkWrapper>
            </li>
            <li>
              <NavLinkWrapper to={`/login`}>Login</NavLinkWrapper>
            </li>
          </>
        )}
      </LinksList>
      <NavIcon onClick={toggleSidebar}>
        <FontAwesomeIcon icon="bars" />
      </NavIcon>
    </NavbarWrapper>
  );
};

export default Home;
