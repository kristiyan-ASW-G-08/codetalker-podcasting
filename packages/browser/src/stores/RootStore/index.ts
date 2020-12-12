import { createContext } from 'react';
import { observable, action } from 'mobx';
import { create } from 'mobx-persist';
import AuthStore from 'stores/AuthStore';
import NotificationStore from 'stores/NotificationStore';

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});
export class RootStore {
  @observable public authStore = new AuthStore();

  @observable public notificationStore = new NotificationStore();

  public constructor() {
    hydrate('authStore', this.authStore);
  }
}

const RootStoreContext = createContext(new RootStore());
export default RootStoreContext;
