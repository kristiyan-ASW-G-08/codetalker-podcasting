import React from 'react';
import { Link } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import RouterThemeWrapper from './';

const history = createMemoryHistory();

jest.spyOn(history, 'push');

describe('Navbar', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it('RouterThemeWrapper: renders', async () => {
    expect.assertions(2);
    const { container } = render(
      <RouterThemeWrapper history={history}>
        <div>Wrapped Component</div>
      </RouterThemeWrapper>,
    );
    const wrappedComponent = screen.getByText(/Wrapped Component/i);

    expect(container).toBeTruthy();
    expect(wrappedComponent).toBeInTheDocument();
  });

  it('RouterThemeWrapper: links work', async () => {
    // expect.assertions(4);
    const { container } = render(
      <RouterThemeWrapper history={history}>
        <Link to="/wrapped">Wrapped Link</Link>
      </RouterThemeWrapper>,
    );
    const wrappedLink = screen.getByText(/Wrapped Link/i);

    expect(container).toBeTruthy();
    expect(wrappedLink).toBeInTheDocument();

    userEvent.click(wrappedLink);

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenNthCalledWith(1, '/wrapped');
    });
  });
});
