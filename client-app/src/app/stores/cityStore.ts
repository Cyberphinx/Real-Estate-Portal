import { PagingParams } from '../model/Pagination';
import { makeAutoObservable, reaction } from "mobx";
import agent from "../api/agent";
import { Pagination } from '../model/Pagination';
import { City } from '../model/City';

export default class CityStore {
  cityRegistry = new Map<number, City>();
  loadingCities = false;
  selectedCity: City | undefined;

  // Pagination
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  loadingNext = false;

  // Filtering
  cityPredicate = new Map().set("searchTerm", "");

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.cityPredicate.keys(),
      () => {
        this.cityRegistry.clear();
        this.loadCities();
      }
    )
  }

  // PAGINATION START
  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  }

  setCityPredicate = (predicate: string, value: string) => {
    if (predicate === "searchTerm") {
      this.cityPredicate.delete("searchTerm");
      this.cityPredicate.set("searchTerm", value);
    }
  }

  get axiosParams() {
    const params = new URLSearchParams();
    this.cityPredicate.forEach((value, key) => {
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

  // LOAD LISTINGS START
  loadCities = async () => {
    this.setLoadingCities(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Cities.list(this.axiosParams);
      result.forEach(city => {
        this.setCity(city);
      })
      this.setLoadingCities(false);
    } catch (error) {
      console.log(error);
      this.setLoadingCities(false);
    }
  };

  setLoadingCities = (state: boolean) => {
    this.loadingCities = state;
  }

  // helper method to map the listings to listing registry
  private setCity = (city: City) => {
    this.cityRegistry.set(city.id, city);
  };

  selectCity = (id: number) => {
    this.selectedCity = this.cityRegistry.get(id);
  }

  cancelSelectCity = () => {
    this.selectedCity = undefined;
  }
  // LOAD LISTINGS END


  // PREPARE LISTING MAP DATA FOR VIEW - START
  get cities() {
    return Array.from(this.cityRegistry.values());
  }
  // PREPARE LISTING MAP DATA FOR VIEW - END

}
