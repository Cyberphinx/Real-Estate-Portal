import { MaxValue } from './../model/MaxValue';
import { Availability } from './../model/Availability';
import { User, UserFormValues, RoleFormValues } from './../model/User';
import axios, { AxiosResponse } from "axios";
import { Company, CompanyFormValues } from '../model/CompanyAggregate/Company';
import { Order, OrderFormValues } from '../model/OrderAggregate/Order';
import { store } from '../stores/store';
import { history } from '../..';
import { PaginatedResult } from '../model/Pagination';
import { Listing, ListingFormValues } from '../model/ListingAggregate/Listing';
import { City } from '../model/City';

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
  list: () => requests.get<Company[]>("/company"),
  details: (id: string) => requests.get<Company>(`/company/${id}`),
  detailsmycompany: () => requests.get<Company>(`/company/owner`),
  create: (company: CompanyFormValues) => requests.post<Company>('/company', company),
  update: (company: CompanyFormValues) => requests.put<Company>(`/company/${company.id}`, company),
  delete: (id: string) => requests.del<void>(`/company/${id}`),
};

const Orders = {
  list: () => requests.get<Order[]>("/order"),
  listMyOrdersAsBuyer: () => requests.get<Order[]>("/order/buyer"),
  listMyOrdersAsSeller: () => requests.get<Order[]>("/order/seller"),
  details: (id: string) => requests.get<Order>(`/order/${id}`),
  create: (order: OrderFormValues) => requests.post<void>('/order', order),
  update: (order: OrderFormValues) => requests.put<void>(`/order/${order.id}`, order),
  delete: (id: string) => requests.del<void>(`/order/${id}`),
}

const Availabilities = {
  create: (entry: Availability) => requests.post<void>("/availability", entry),
  delete: (id: number) => requests.del<void>(`/availability/${id}`)
}

const Cities = {
  // list: () => requests.get<City[]>("/city")
  list: (params: URLSearchParams) => axios.get<City[]>("/city", {params}).then(responseBody),
}

const agent = {
  Account,
  Listings,
  Companies,
  Orders,
  Availabilities,
  Cities
};

export default agent;
