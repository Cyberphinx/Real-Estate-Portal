import { createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../../App";
import CompanyDetailsPage from "../../features/companies/newTab/CompanyDetailsPage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestError from "../../features/errors/TestError";
import ListingDetailsPage from "../../features/listings/newTab/ListingDetailsPage";
import CreateJob from "../../features/services/jobs/CreateJob";
import JobDetailsPage from "../../features/services/newTab/JobDetailsPage";
import CreateRemovalsJob from "../../features/services/removals/CreateRemovalsJob";
import RemovalsJobConfirmation from "../../features/services/removals/RemovalsJobConfirmation";
import ListingForm from "../../features/users/controlPanel/agency/listings/ListingForm";
import ListingFormPreview from "../../features/users/controlPanel/agency/listings/ListingFormPreview";
import ListingMediaForm from "../../features/users/controlPanel/agency/listings/ListingMediaForm";
import ControlPanel from "../../features/users/controlPanel/ControlPanel";
import CreateJobInvoice from "../../features/users/jobInvoice/CreateJobInvoice";
import ViewJobInvoice from "../../features/users/jobInvoice/ViewJobInvoice";
import LoginForm from "../../features/users/LoginForm";
import HomePage from "../layout/HomePage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'map', element: <HomePage/>},
            {path: 'services', element: <HomePage />},
            {path: 'listing/:id', element: <ListingDetailsPage />},
            {path: 'company/:id', element: <CompanyDetailsPage />},
            {path: 'job/:id', element: <JobDetailsPage />},
            {path: 'login', element: <LoginForm />},
            {path: 'errors', element: <TestError />},
            {path: 'server-error', element: <ServerError />},
            {path: 'account/registerSuccess', element: <HomePage />},
            {path: 'account/verifyEmail', element: <HomePage />},
            {path: 'control-panel', element: <ControlPanel />},
            {path: 'create-listing', element: <ListingForm />},
            {path: 'manage/:id', element: <ListingForm />},
            {path: 'add-listing-media/:id', element: <ListingMediaForm />},
            {path: 'preview/:id', element: <ListingFormPreview />},
            {path: 'create-removals-job', element: <CreateRemovalsJob />},
            {path: 'removals-job-confirmation/:id', element: <RemovalsJobConfirmation />},
            {path: 'create-job', element: <CreateJob />},
            {path: 'creat-invoice/job/:jobId', element: <CreateJobInvoice />},
            {path: 'view-job-invoice/:invoiceId', element: <ViewJobInvoice />},
            {path: '*', element: <NotFound />},
        ]
    }
]

export const router = createBrowserRouter(routes);
