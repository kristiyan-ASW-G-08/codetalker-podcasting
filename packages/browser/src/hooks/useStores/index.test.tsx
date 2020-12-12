import { renderHook } from '@testing-library/react-hooks';
import useStores from 'hooks/useStores';
describe('userStores', () => {
  it(`should return a root store`, () => {
    expect.assertions(2);
    const { result } = renderHook(() => useStores());
    expect(result.current.authStore).toBeTruthy();
    expect(result.current.notificationStore).toBeTruthy();
  });
});
