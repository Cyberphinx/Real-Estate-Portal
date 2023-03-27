import React, { useEffect } from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Toast from './app/common/Toast';
import HomePage from './app/layout/HomePage';
import { useStore } from './app/stores/store';
import NotFound from './features/errors/NotFound';
import ServerError from './features/errors/ServerError';
import TestError from './features/errors/TestError';
import LoginForm from './features/users/LoginForm';
import ListingDetailsPage from './features/listings/newTab/ListingDetailsPage';
import CompanyDetailsPage from './features/companies/newTab/CompanyDetailsPage';
import JobDetailsPage from './features/services/newTab/JobDetailsPage';
import ListingForm from './features/users/controlPanel/agency/listings/ListingForm';
import ListingMediaForm from './features/users/controlPanel/agency/listings/ListingMediaForm';
import ControlPanel from './features/users/controlPanel/ControlPanel';
import ListingFormPreview from './features/users/controlPanel/agency/listings/ListingFormPreview';
import CreateRemovalsJob from './features/services/removals/CreateRemovalsJob';
import CreateJob from './features/services/jobs/CreateJob';
import RemovalsJobConfirmation from './features/services/removals/RemovalsJobConfirmation';
import CreateJobInvoice from './features/users/jobInvoice/CreateJobInvoice';
import ViewJobInvoice from './features/users/jobInvoice/ViewJobInvoice';

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
