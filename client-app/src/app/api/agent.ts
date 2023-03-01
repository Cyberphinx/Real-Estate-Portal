import { ListingMediaDto } from './../model/ListingAggregate/ListingObjects';
import { Profile, WatcherListingDto, UserJobDto, UserCompanyDto } from './../model/Profile';
import { MaxValue } from './../model/MaxValue';
import { User, RoleFormValues, LoginFormValues, RegisterFormValues } from './../model/User';
import axios, { AxiosResponse } from "axios";
import { Company, CompanyFormValues, Stock } from '../model/Company';
import { store } from '../stores/store';
import { history } from '../..';
import { PaginatedResult } from '../model/Pagination';
import { Listing, ListingFormValues } from '../model/ListingAggregate/Listing';
import { Job, JobFormValues, JobMediaDto } from '../model/Job';
import { CalendarEvent } from '../model/CalendarEvent';
import { JobInvoice, JobInvoiceFormValues, UserInvoice } from '../model/Invoice';

// adding fake delay
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`
  return config;
})

// adding fake delay for loading indicators, and handles api response errors
axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(response.data, JSON.parse(pagination));
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  }, (error: any) => {
    const { data, status, config, headers } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          store.featureStore.setToast("show warn", data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const validationStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              validationStateErrors.push(data.errors[key])
            }
          }
          throw validationStateErrors.flat();
        }
        break;
      case 401:
        if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
          store.userStore.logout();
          store.featureStore.setToast("show warn", "Session expired - please login again");
        }
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  });

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: LoginFormValues) => requests.post<User>("/account/login", user),
  register: (user: RegisterFormValues) => requests.post<User>("/account/register", user),
  list: () => requests.get<User[]>("/account/all"),
  assignrole: (role: RoleFormValues) => requests.put<RoleFormValues>("/account/assignrole", role),
  checkusername: (username: string) => requests.get<string>(`/account/username/${username}`),
  checkemail: (email: string) => requests.get<string>(`/account/email/${email}`),
  refreshToken: () => requests.post<User>('/account/refreshToken', {}),
  verifyEmail: (token: string, email: string) => requests.post<void>(`/account/verifyEmail?token=${token}&email=${email}`, {}),
  resendVerifyLink: (email: string) => requests.get(`/account/resendVerifyLink?email=${email}`)
}

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profile/${username}`),
  updateProfile: (profile: Partial<Profile>) => requests.put(`/profile`, profile),
  listUserListings: (username: string, predicate: string) =>
    requests.get<WatcherListingDto[]>(`/profile/listings/${username}?predicate=${predicate}`),
  listUserJobs: (username: string, predicate: string) =>
    requests.get<UserJobDto[]>(`/profile/jobs/${username}?predicate=${predicate}`),
  listUserCompanies: (username: string, predicate: string) =>
    requests.get<UserCompanyDto[]>(`/profile/companies/${username}?predicate=${predicate}`),
  getHeadquarter: (username: string) => requests.get<UserCompanyDto>(`profile/headquarter/${username}`),
}

const Listings = {
  listAll: () => requests.get<Listing[]>("/listing/all"),
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Listing[]>>("/listing", { params }).then(responseBody),
  details: (id: string) => requests.get<Listing>(`/listing/${id}`),
  getMax: () => requests.get<MaxValue[]>("/listing/max"),
  create: (companyId: string, listing: ListingFormValues) => requests.post<Listing>(`/listing/${companyId}`, listing),
  update: (listing: ListingFormValues) => requests.put<Listing>(`/listing/${listing.id}`, listing),
  delete: (id: string) => requests.del<void>(`/listing/${id}`),
  watchListing: (listingId: string) => requests.post(`/listing/watch/${listingId}`, {}),
  uploadMedia: (listingId: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post<ListingMediaDto>(`/listing/media/${listingId}`, formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
  },
  setMainImage: (listingId: string, listingMediaId: string) => requests.post(`/listing/${listingId}/setMainImage/${listingMediaId}`, {}),
  deleteMedia: (listingId: string, listingMediaId: string) => requests.del(`/listing/${listingId}/${listingMediaId}`),
};

const Companies = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Company[]>>("/company", { params }).then(responseBody),
  details: (id: string) => requests.get<Company>(`/company/${id}`),
  create: (company: CompanyFormValues) => requests.post<Company>('/company', company),
  update: (company: CompanyFormValues) => requests.put<Company>(`/company/${company.id}`, company),
  delete: (id: string) => requests.del<void>(`/company/${id}`),
  listListings: (params: URLSearchParams) =>
    axios.get<PaginatedResult<Stock[]>>("/company/listings/", { params }).then(responseBody),
  countListings: (companyId: string) => requests.get<number>(`/company/listings-count/${companyId}`)
};

const Jobs = {
  listAll: () => requests.get<Job[]>("/job/all"),
  listAllRemovals: () => requests.get<Job[]>("/job/allRemovals"),
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Job[]>>("/job", { params }).then(responseBody),
  listRemovals: (params: URLSearchParams) => axios.get<PaginatedResult<Job[]>>("/job/removals", { params }).then(responseBody),
  details: (id: string) => requests.get<Job>(`/job/${id}`),
  detailsLeads: (id: string) => requests.get<Job>(`/job/${id}/leads`),
  create: (job: JobFormValues) => requests.post<void>('/job', job),
  update: (job: JobFormValues) => requests.put<void>(`/job/${job.id}`, job),
  delete: (id: string) => requests.del<void>(`/job/${id}`),
  applyJob: (jobId: string) => requests.post(`/job/apply/${jobId}`, {}),
  shortlistJobApplicant: (jobId: string, username: string) => requests.post(`/job/shortlist/${jobId}/${username}`, {}),
  uploadMedia: (jobId: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post<JobMediaDto>(`/job/media/${jobId}`, formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
  },
  setMainImage: (jobId: string, jobMediaId: string) => requests.post(`/job/${jobId}/setMainImage/${jobMediaId}`, {}),
  deleteMedia: (jobId: string, jobMediaId: string) => requests.del(`/job/${jobId}/${jobMediaId}`)
}

const Calendar = {
  create: (event: CalendarEvent, username: string) => requests.post<void>(`/calendar/${username}`, event),
  list: (username: string) => requests.get<CalendarEvent[]>(`/calendar/${username}`),
  delete: (id: string, username: string) => requests.del<void>(`/calendar/${username}/${id}`)
}

const Invoices = {
  getFirstUserInvoice: () => requests.get<UserInvoice>("/invoice"),
  createJobInvoice: (invoice: JobInvoiceFormValues, jobId: string) => requests.post<void>(`/invoice/job/${jobId}`, invoice),
  list: () => requests.get<JobInvoice[]>("/invoice/seller"),
  detailsAsSeller: (invoiceId: string) => requests.get<JobInvoice>(`/invoice/seller/${invoiceId}`),
  detailsAsCustomer: (invoiceId: string) => requests.get<JobInvoice>(`/invoice/customer/${invoiceId}`),
}

const agent = {
  Account,
  Listings,
  Companies,
  Jobs,
  Profiles,
  Calendar,
  Invoices
};

export default agent;
