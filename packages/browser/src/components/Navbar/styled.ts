import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavbarWrapper = styled('nav')`
  width: 100vw;
  height: 5rem;
  display: grid;
  justify-content: space-between;
  align-content: center;
  grid-template-columns: repeat(2, auto);
  padding: 1rem 2rem 1rem 2rem;
  background: ${({ theme }) => theme.dark};
`;

export const Logo = styled('div')`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 0.5rem;
  img {
    width: 3rem;
    height: 3rem;
  }
  span {
    color: ${({ theme }) => theme.primary};
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
export const LinksList = styled('ul')`
  display: grid;
  grid-template-columns: repeat(3, auto);
  list-style: none;
  gap: 0.5rem;
  @media ${({ theme }) => theme.mediaQueries.mobile} {
    display: none;
  }
`;

export const NavIcon = styled('button')`
  display: none;
  @media ${({ theme }) => theme.mediaQueries.mobile} {
    display: block;
    background: none;
    color: ${({ theme }) => theme.white};
    border: none;
    font-size: 2.5rem;
  }
`;

export const NavLinkWrapper = styled(NavLink)`
  display: block;
  border: none;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 2px;
  background: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.white};
  :hover {
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.dark};
  }
  &.active {
    border: solid 1px ${({ theme }) => theme.white};
    border-radius: 2px;
  }
`;
