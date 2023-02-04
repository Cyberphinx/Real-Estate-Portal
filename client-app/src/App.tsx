import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Toast from './app/common/Toast';
import HomePage from './app/layout/HomePage';
import { useStore } from './app/stores/store';
import NotFound from './features/errors/NotFound';
import ServerError from './features/errors/ServerError';
import TestErrors from './features/errors/TestError';
import LoginForm from './features/users/LoginForm';
import ListingDetailsPage from './features/listings/newTab/ListingDetailsPage';
import CompanyDetailsPage from './features/companies/newTab/CompanyDetailsPage';
import JobDetailsPage from './features/networks/newTab/JobDetailsPage';
import ListingForm from './features/users/controlPanel/agency/listings/ListingForm';
import ListingMediaForm from './features/users/controlPanel/agency/listings/ListingMediaForm';
import Agency from './features/users/controlPanel/agency/Agency';
import ControlPanel from './features/users/controlPanel/ControlPanel';
import ListingFormPreview from './features/users/controlPanel/agency/listings/ListingFormPreview';

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
        <Route path="/" element={<Navigate replace to="/homepage" />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path='/listing/:id' element={<ListingDetailsPage />} />
        <Route path='/company/:id' element={<CompanyDetailsPage />} />
        <Route path='/job/:id' element={<JobDetailsPage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/errors' element={<TestErrors />}/>
        <Route path='/server-error' element={<ServerError />} />
        <Route path='/account/registerSuccess' element={<HomePage />} />
        <Route path='/account/verifyEmail' element={<HomePage />} />
        <Route path='/control-panel' element={<ControlPanel />} />
        <Route path='/create-listing' element={<ListingForm />} />
        <Route path='/manage/:id' element={<ListingForm />} />
        <Route path='/add-listing-media/:id' element={<ListingMediaForm />} />
        <Route path='/preview/:id' element={<ListingFormPreview />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default observer(App);
