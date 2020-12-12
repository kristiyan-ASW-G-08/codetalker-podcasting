import React, { FC, useState } from 'react';
import AuthState from 'types/AuthState';
import {
  SidebarWrapper,
  Main,
  Backdrop,
  Logo,
  Links,
  NavLinkWrapper,
} from './styled';
import logo from 'assets/logo.svg';
import User from 'types/User';
import Button from 'styled/Button';

interface SidebarProps {
  isSidebarActive: boolean;
  user: User;
  toggleSidebar: () => void;
  resetAuthState: () => void;
}
const Sidebar: FC<SidebarProps> = ({
  isSidebarActive,
  toggleSidebar,
  user,
  resetAuthState,
}): JSX.Element => (
  <SidebarWrapper isSidebarActive={isSidebarActive}>
    <Main>
      <Logo>
        {' '}
        <img src={logo} alt="logo" />
      </Logo>
      <Links>
        <li>
          <NavLinkWrapper to="/podcasts">Podcasts</NavLinkWrapper>
        </li>
        {user ? (
          <Button onClick={resetAuthState}>Logout</Button>
        ) : (
          <>
            {' '}
            <li>
              <NavLinkWrapper to="/sign-up">Sign Up</NavLinkWrapper>
            </li>
            <li>
              <NavLinkWrapper to="/login">Login</NavLinkWrapper>
            </li>
          </>
        )}
      </Links>
    </Main>
    <Backdrop onClick={toggleSidebar} data-testid="backdrop" />
  </SidebarWrapper>
);

export default Sidebar;
