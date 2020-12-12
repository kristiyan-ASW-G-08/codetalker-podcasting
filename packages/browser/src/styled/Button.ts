import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { css } from 'styled-components';

export const Wrapper = styled('button')``;

interface ButtonProps {
  buttonType?: 'primary' | 'light' | 'dark' | 'transparent';
  color?: 'primary' | 'secondary' | 'white';
  active?: Boolean;
  size?: 'default' | 'small' | 'large';
}

export const Button = styled('button')<ButtonProps>`
  background: ${({ theme, buttonType }) =>
    theme.buttonVariants[buttonType!].background};
  color: ${({ theme, buttonType }) => theme.buttonVariants[buttonType!].color};
  :hover {
    background: ${({ theme, buttonType }) =>
      theme.buttonVariants[buttonType!].active.background};
    color: ${({ theme, buttonType }) =>
      theme.buttonVariants[buttonType!].active.color};
  }
  border: none;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 2px;
`;

export default Button;

Button.defaultProps = {
  buttonType: 'primary',
  size: 'default',
  active: false,
  color: 'white',
};
