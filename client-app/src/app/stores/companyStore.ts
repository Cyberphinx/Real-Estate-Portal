import { Company, CompanyFormValues } from '../model/CompanyAggregate/Company';
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { history } from './../../index';
import { store } from './store';

export default class CompanyStore {
  myCompany: Company | undefined = undefined;
  editMode = false;
  selectedCompany: Company | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
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


