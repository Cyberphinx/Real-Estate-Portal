import { Company, CompanyFormValues } from '../model/Company';
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from './store';
import { Pagination, PagingParams } from '../model/Pagination';
import { router } from '../router/routes';

export default class CompanyStore {
  companyRegistry = new Map<string, Company>();
  myCompany: Company | undefined = undefined;
  selectedCompany: Company | undefined = undefined;
  company: Company | undefined = undefined;
  loadingCompanies = false;
  loadingCompany = false;
  editMode = false;

  // Pagination
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  loadingNext = false;

  // Filtering
  predicate = new Map().set("mapBounds", "").set("serviceCategory", "Estate Agent").set("orderBy", "_");
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
    let existingCompany = this.getCompany(id);
    if (existingCompany) {
      this.company = existingCompany;
      return existingCompany;
    }
    else {
      this.setLoadingCompany(true);
      try {
        existingCompany = await agent.Companies.details(id);
        this.setCompany(existingCompany);
        runInAction(() => this.company = existingCompany);
        this.setLoadingCompany(false);
        return existingCompany;
      } catch (error) {
        console.log(error);
        this.setLoadingCompany(false);
      }
    }
  }

  // helper method to map the companies to company registry
  private setCompany = (company: Company) => {
    this.companyRegistry.set(company.id, company);
  };

  private getCompany = (id: string) => {
    return this.companyRegistry.get(id);
  }

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

  setEditMode = (value: boolean) => { this.editMode = value };

  createCompany = async (value: CompanyFormValues) => {
    try {
      const company = await agent.Companies.create(value);
      this.selectedCompany = company;
      router.navigate("/");
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


