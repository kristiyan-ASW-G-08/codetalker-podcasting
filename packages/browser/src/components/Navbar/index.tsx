import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavbarWrapper, Logo, Links, NavIcon, NavLinkWrapper } from './styled';
import useStores from 'hooks/useStores';
import Sidebar from 'components/Sidebar';
import Portal from 'components/Portal';
import Button from 'styled/Button';
import logo from 'assets/logo.svg';

const Navbar: FC = (): JSX.Element => {
  const { authStore } = useStores();
  const { user } = authStore.authState;
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(true);
  const toggleSidebar = () => setIsSidebarActive(!isSidebarActive);
  return (
    <>
      <NavbarWrapper>
        <Logo>
          {' '}
          <img src={logo} alt="logo" />
          <span>CodeTalker</span>
        </Logo>
        <Links>
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
        </Links>
        <NavIcon onClick={toggleSidebar}>
          <FontAwesomeIcon icon="bars" />
        </NavIcon>
      </NavbarWrapper>

      {isSidebarActive ? (
        <Portal portalId="sidebar">
          <Sidebar
            toggleSidebar={toggleSidebar}
            isSidebarActive={isSidebarActive}
            resetAuthState={() => authStore.resetAuthState()}
            user={user!}
          />
        </Portal>
      ) : (
        ''
      )}
    </>
  );
};

export default Navbar;
