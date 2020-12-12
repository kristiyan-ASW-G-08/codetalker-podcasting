import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { defaultAuthState } from 'stores/AuthStore';
import authenticatedAuthState from 'testUtilities/authenticatedAuthState';
import useStores from 'hooks/useStores';
import Navbar from '.';
import RouterThemeWrapper from 'testUtilities/RouterThemeWrapper';

const history = createMemoryHistory();

jest.spyOn(history, 'push');

jest.mock('hooks/useStores');

const useStoresMock = useStores as jest.Mocked<any>;

describe('Navbar', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());
  const resetAuthState = jest.fn();
  it('render Navbar:logged out', async () => {
    expect.assertions(9);
    useStoresMock.mockReturnValue({
      authStore: {
        resetAuthState,
        authState: defaultAuthState,
      },
    });
    const { container, queryByText } = render(<Navbar />, {
      wrapper: ({ children }) => (
        <RouterThemeWrapper history={history}>{children}</RouterThemeWrapper>
      ),
    });

    const podcastsLink = screen.getByText(/Podcasts/i);
    const logInLink = screen.getByText(/Login/i);
    const signUpLink = screen.getByText(/Sign Up/i);
    const logOutLink = queryByText('Log Out');

    expect(container).toBeTruthy();
    expect(podcastsLink).toBeInTheDocument();
    expect(logInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
    expect(logOutLink).toBeFalsy();

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

  it('render Navbar:logged in', () => {
    expect.assertions(5);
    useStoresMock.mockReturnValue({
      authStore: {
        resetAuthState,
        authState: authenticatedAuthState,
      },
    });
    const { container, queryByText } = render(<Navbar />, {
      wrapper: ({ children }) => (
        <RouterThemeWrapper history={history}>{children}</RouterThemeWrapper>
      ),
    });
    const podcastsLink = screen.getByText(/Podcasts/i);
    const logInLink = queryByText(/Login/i);
    const signUpLink = queryByText(/Sign Up/i);
    const logOutLink = screen.getByText(/Logout/i);

    expect(container).toBeTruthy();
    expect(podcastsLink).toBeInTheDocument();
    expect(logInLink).toBeFalsy();
    expect(signUpLink).toBeFalsy();
    expect(logOutLink).toBeInTheDocument();

    userEvent.click(logOutLink);

    expect(resetAuthState).toHaveBeenCalledTimes(1);
  });
});
