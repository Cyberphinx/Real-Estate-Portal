import { MaxValue } from './../model/MaxValue';
import { User, UserFormValues, RoleFormValues } from './../model/User';
import axios, { AxiosResponse } from "axios";
import { Company, CompanyFormValues } from '../model/Company';
import { store } from '../stores/store';
import { history } from '../..';
import { PaginatedResult } from '../model/Pagination';
import { Listing, ListingFormValues } from '../model/ListingAggregate/Listing';
import { Job, JobFormValues } from '../model/Job';

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
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          store.featureStore.setToast("show", data);
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
        store.featureStore.setToast("show", "unauthorized");
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
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) => requests.post<User>("/account/register", user),
  list: () => requests.get<User[]>("/account/all"),
  assignrole: (role: RoleFormValues) => requests.put<RoleFormValues>("/account/assignrole", role),
}

const Listings = {
  listAll: () => requests.get<Listing[]>("/listing/all"),
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Listing[]>>("/listing", {params}).then(responseBody),
  details: (id: string) => requests.get<Listing>(`/listing/${id}`),
  getMax: () => requests.get<MaxValue[]>("/listing/max"),
  create: (listing: ListingFormValues) => requests.post<Listing>("/listing", listing),
  update: (listing: ListingFormValues) => requests.put<Listing>(`/listing/${listing.id}`, listing),
  delete: (id: string) => requests.del<void>(`/listing/${id}`),
};

const Companies = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Company[]>>("/company", {params}).then(responseBody),
  details: (id: string) => requests.get<Company>(`/company/${id}`),
  detailsmycompany: () => requests.get<Company>(`/company/owner`),
  create: (company: CompanyFormValues) => requests.post<Company>('/company', company),
  update: (company: CompanyFormValues) => requests.put<Company>(`/company/${company.id}`, company),
  delete: (id: string) => requests.del<void>(`/company/${id}`),
};

const Jobs = {
  list: () => requests.get<Job[]>("/job"),
  details: (id: string) => requests.get<Job>(`/job/${id}`),
  create: (job: JobFormValues) => requests.post<void>('/job', job),
  update: (job: JobFormValues) => requests.put<void>(`/job/${job.id}`, job),
  delete: (id: string) => requests.del<void>(`/job/${id}`),
}

const agent = {
  Account,
  Listings,
  Companies,
  Jobs
};

export default agent;
