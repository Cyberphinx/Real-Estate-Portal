import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Toast from './app/common/Toast';
import Dashboard from './app/layout/Dashboard';
import { useStore } from './app/stores/store';
import NotFound from './features/errors/NotFound';
import ServerError from './features/errors/ServerError';
import TestErrors from './features/errors/TestError';
import LoginForm from './features/users/LoginForm';
import ListingDetailsPage from './features/listings/newTab/ListingDetailsPage';
import CompanyDetailsPage from './features/companies/newTab/CompanyDetailsPage';
import JobDetailsPage from './features/networks/newTab/JobDetailsPage';
import RegisterSuccess from './features/users/register/RegisterSuccess';
import ConfirmEmail from './features/users/register/ConfirmEmail';

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
    <div style={{overflow: "hidden"}}>
      <Toast />
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/listing/:id' element={<ListingDetailsPage />} />
        <Route path='/company/:id' element={<CompanyDetailsPage />} />
        <Route path='/job/:id' element={<JobDetailsPage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/errors' element={<TestErrors />}/>
        <Route path='/server-error' element={<ServerError />} />
        <Route path='/account/registerSuccess' element={<Dashboard />} />
        <Route path='/account/verifyEmail' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default observer(App);
