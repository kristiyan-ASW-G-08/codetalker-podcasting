import React from 'react';
//@ts-ignore
import { render, screen } from '@testing-library/react';
import Theme from '.';

describe('Theme', () => {
  it('Theme renders', () => {
    expect.assertions(2);
    const { container } = render(
      <Theme>
        <div>Themed App</div>
      </Theme>,
    );
    const themedApp = screen.getByText(/Themed App/i);
    expect(container).toBeTruthy();
    expect(themedApp).toBeInTheDocument();
  });
});
