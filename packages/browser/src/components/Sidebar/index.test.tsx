import React from 'react';
import { render, waitFor, screen, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { defaultAuthState } from 'stores/AuthStore';
import authenticatedAuthState from 'testUtilities/authenticatedAuthState';
import Sidebar from '.';
import RouterThemeWrapper from 'testUtilities/RouterThemeWrapper';

const history = createMemoryHistory();

jest.spyOn(history, 'push');

jest.mock('hooks/useStores');

describe('Sidebar', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());
  const resetAuthState = jest.fn();
  const toggleSidebar = jest.fn();
  it('render Sidebar:logged out', async () => {
    expect.assertions(9);

    const { container, queryByText } = render(
      <Sidebar
        resetAuthState={resetAuthState}
        toggleSidebar={toggleSidebar}
        user={defaultAuthState.user!}
        isSidebarActive={false}
      />,
      {
        wrapper: ({ children }) => (
          <RouterThemeWrapper history={history}>{children}</RouterThemeWrapper>
        ),
      },
    );

    const podcastsLink = screen.getByText(/Podcasts/i);
    const logInLink = screen.getByText(/Login/i);
    const signUpLink = screen.getByText(/Sign Up/i);
    const logOutButton = queryByText('Log Out');

    expect(container).toBeTruthy();
    expect(podcastsLink).toBeInTheDocument();
    expect(logInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
    expect(logOutButton).toBeFalsy();

    userEvent.click(podcastsLink);
    userEvent.click(signUpLink);
    userEvent.click(logInLink);

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledTimes(3);
      expect(history.push).toHaveBeenNthCalledWith(1, {
        hash: '',
        pathname: '/podcasts',
        search: '',
        state: null,
      });
      expect(history.push).toHaveBeenNthCalledWith(2, {
        hash: '',
        pathname: '/sign-up',
        search: '',
        state: null,
      });
      expect(history.push).toHaveBeenNthCalledWith(3, {
        hash: '',
        pathname: '/login',
        search: '',
        state: null,
      });
    });
  });

  it('render Navbar: toggle', () => {
    expect.assertions(2);
    const { getByTestId } = render(
      <Sidebar
        resetAuthState={resetAuthState}
        toggleSidebar={toggleSidebar}
        user={authenticatedAuthState.user}
        isSidebarActive={false}
      />,
      {
        wrapper: ({ children }) => (
          <RouterThemeWrapper history={history}>{children}</RouterThemeWrapper>
        ),
      },
    );
    const backdrop = getByTestId('backdrop');
    expect(backdrop).toBeInTheDocument();
    userEvent.click(backdrop);

    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });
});
