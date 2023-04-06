import React, { useEffect } from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import Toast from './app/common/Toast';
import { useStore } from './app/stores/store';

function App() {
  const {commonStore, userStore} = useStore();

  // persisting the user login
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  return (
    <div>
      <Toast />
      <Outlet />
    </div>
  );
}

export default observer(App);
