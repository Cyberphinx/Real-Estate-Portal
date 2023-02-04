import { PagingParams } from '../model/Pagination';
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination } from '../model/Pagination';
import { Listing, ListingFormValues } from '../model/ListingAggregate/Listing';
import { MaxValue } from '../model/MaxValue';
import { Stock } from '../model/Company';

export default class AgentListingStore {
  agentListingRegistry = new Map<string, Stock>();
  selectedAgentListing: Stock | undefined = undefined;
  loadingAgentListings = false;
  loadingNext = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("channel", "rent").set("orderBy", "_");

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        // restart from page 1
        this.pagingParams = new PagingParams(1, 12);
        this.agentListingRegistry.clear();
        this.loadAgentListings();
      }
    )
  }

  // PAGINATION START
  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  }

  setPredicate = (predicate: string, value: string | string[]) => {
    switch (predicate) {
      case "companyId":
        this.predicate.delete("minMaxPrice");
        this.predicate.delete("companyId");
        this.predicate.set("companyId", value);
        break;
      case "channel":
        this.predicate.delete("channel");
        this.predicate.delete("minMaxPrice");
        this.predicate.set("channel", value);
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
      case "minMaxPrice":
        this.predicate.delete("minMaxPrice");
        this.predicate.set("minMaxPrice", value);
        break;
      case "minMaxBeds":
        this.predicate.delete("minMaxBeds");
        this.predicate.set("minMaxBeds", value);
        break;
      case "propertyTypes":
        this.predicate.delete("propertyTypes");
        this.predicate.set("propertyTypes", value);
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

  // LOAD LISTINGS START
  loadAgentListings = async () => {
    this.setLoadingAgentListings(true);
    try {
      const result = await agent.Companies.listListings(this.axiosParams);
      result.data.forEach(listing => {
        this.setAgentListing(listing);
      })
      this.setPagination(result.pagination);
      this.setLoadingAgentListings(false);
    } catch (error) {
      console.log(error);
      this.setLoadingAgentListings(false);
    }
  }


  setLoadingAgentListings = (state: boolean) => {
    this.loadingAgentListings = state;
  }

  // helper method to map the listings to listing registry
  private setAgentListing = (listing: Stock) => {
    this.agentListingRegistry.set(listing.id, listing);
  };

  private getAgentListing = (id: string) => {
    return this.agentListingRegistry.get(id);
  };

  selectListing = (id: string) => {
    this.selectedAgentListing = this.agentListingRegistry.get(id);
  }

  cancelSelectListing = () => {
    this.selectedAgentListing = undefined;
  }

  get agentListings() {
    return Array.from(this.agentListingRegistry.values());
  }

  // helper method to set main image
  setImage = (image: string) => {
    if (this.selectedAgentListing) this.selectedAgentListing.image = image;
}

}
