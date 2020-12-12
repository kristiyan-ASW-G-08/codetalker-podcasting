import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isSidebarActive: boolean;
}
export const SidebarWrapper = styled('aside')<SidebarProps>`
  display: grid;
  grid-template-columns: 3fr 1fr;
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  @keyframes slide {
    from {
      transform: translateX(-100vw);
    }
    to {
      transform: translateX(0);
    }
  }
  ${({ isSidebarActive }) =>
    isSidebarActive ? `animation: slide 200ms ease-in forwards` : ''};

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    grid-template-columns: 2fr 5fr;
  }
  @media ${({ theme }) => theme.mediaQueries.desktop} {
    display: none;
  }
`;

export const Main = styled('div')`
  background: ${({ theme }) => theme.dark};
  display: grid;
  grid-template-rows: 1fr 4fr;
`;

export const Backdrop = styled('div')`
  background: ${({ theme }) => theme.backdrop};
`;

export const NavLinkWrapper = styled(NavLink)`
  display: block;
  color: ${({ theme }) => theme.white};
  font-size: 1.5rem;
  font-weight: bold;
  &.active {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Links = styled('ul')`
  padding: 1rem;
  display: grid;
  align-content: start;
  grid-gap: 1rem;
`;
export const Logo = styled('div')`
  display: grid;
  place-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.backdrop};
`;
