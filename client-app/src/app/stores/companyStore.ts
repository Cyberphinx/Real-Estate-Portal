import { Company, CompanyFormValues } from '../model/CompanyAggregate/Company';
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { history } from './../../index';
import { store } from './store';
import { Pagination, PagingParams } from '../model/Pagination';

export default class CompanyStore {
  companyRegistry = new Map<string, Company>();
  myCompany: Company | undefined = undefined;
  selectedCompany: Company | undefined = undefined;
  loadedCompany: Company | undefined = undefined;
  loadingCompanies = false;
  loadingCompany = false;
  editMode = false;

   // Pagination
   pagination: Pagination | null = null;
   pagingParams = new PagingParams();
   loadingNext = false;

    // Filtering
  predicate = new Map().set("mapBounds", "").set("serviceCategory", "17").set("orderBy", "_");
  loadingFilters = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        // restart from page 1
        this.pagingParams = new PagingParams(1, 100);
        this.companyRegistry.clear();
        // this.listings = [];
        this.loadCompanies();
      }
    )
  }

// PAGINATION START
setPagingParams = (pagingParams: PagingParams) => {
  this.pagingParams = pagingParams;
}

setPredicate = (predicate: string, value: string | string[]) => {
  switch (predicate) {
    case "serviceCategory":
      this.predicate.delete("serviceCategory");
      this.predicate.set("serviceCategory", value);
      break;
    case "searchTerm":
      this.predicate.delete("mapBounds");
      this.predicate.delete("searchTerm");
      this.predicate.set("searchTerm", value);
      break;
    case "mapBounds":
      this.predicate.delete("mapBounds");
      this.predicate.delete("searchTerm");
      this.predicate.set("mapBounds", value);
      break;
    case "orderBy":
      this.predicate.delete("orderBy");
      this.predicate.set("orderBy", value);
      break;
  }
}

get axiosParams() {
  const params = new URLSearchParams();
  params.append("pageNumber", this.pagingParams.pageNumber.toString());
  params.append("pageSize", this.pagingParams.pageSize.toString());
  this.predicate.forEach((value, key) => {
    params.append(key, value);
  })
  return params;
}

setLoadingNext = (value: boolean) => {
  this.loadingNext = value;
}

setPagination = (pagination: Pagination) => {
  this.pagination = pagination;
}
// PAGINATION END

  // loadCompanies = async () => {
  //   this.setLoadingCompanies(true);
  //   // Asynchronous code is inside Try Catch block
  //   try {
  //     const companies = await agent.Companies.list();
  //     companies.forEach(company => {
  //       this.companyRegistry.set(company.id, company);
  //     })
  //     this.setLoadingCompanies(false);
  //   } catch (error) {
  //     runInAction(() => this.setLoadingCompanies(false));
  //     console.log(error);
  //   }
  // };

  loadCompanies = async () => {
    this.setLoadingCompanies(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Companies.list(this.axiosParams);
      result.data.forEach(company => {
        this.setCompany(company);
      })
      this.setPagination(result.pagination);
      this.setLoadingCompanies(false);
    } catch (error) {
      console.log(error);
      this.setLoadingCompanies(false);
    }
  };

  loadCompany = async (id: string) => {
    this.setLoadingCompany(true);
    try {
      const company = await agent.Companies.details(id);
      this.loadedCompany = company;
      this.setLoadingCompany(false);
    } catch (error) {
      console.log(error);
      this.setLoadingCompany(false);
    }
  }

   // helper method to map the companies to company registry
   private setCompany = (company: Company) => {
    this.companyRegistry.set(company.id, company);
  };

  setLoadingCompanies = (state: boolean) => {
    this.loadingCompanies = state;
  }

  setLoadingCompany = (state: boolean) => {
    this.loadingCompany = state;
  }

  get companies() {
    return Array.from(this.companyRegistry.values());
  }

  selectCompany = (id: string) => {
    this.selectedCompany = this.companyRegistry.get(id);
  }

  cancelSelectCompany = () => {
    this.selectedCompany = undefined;
  }

  loadMyCompany = async () => {
    try {
      const myCompany = await agent.Companies.detailsmycompany();
        this.myCompany = myCompany;
    } catch (error) {
      console.log(error);
    }
  }

  setEditMode = (value: boolean) => { this.editMode = value };

  createCompany = async (value: CompanyFormValues) => {
    try {
      const company = await agent.Companies.create(value);
      this.selectedCompany = company;
      history.push("/");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  }

  updateCompany = async (value: CompanyFormValues) => {
    try {
      const company = await agent.Companies.update(value);
      runInAction(() => {
        this.selectedCompany = company;
        this.editMode = false;
      })
    } catch (error) {
      throw error;
    }
  }

  deleteCompany = async (id: string) => {
    try {
      await agent.Companies.delete(id);
    } catch (error) {
      console.log(error);
    };
  }
  
}


