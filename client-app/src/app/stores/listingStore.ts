import { Company } from '../model/Company';
import { PagingParams } from '../model/Pagination';
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination } from '../model/Pagination';
import { Listing, ListingFormValues } from '../model/ListingAggregate/Listing';
import { MaxValue } from '../model/MaxValue';
import { store } from './store';

export default class ListingStore {
  listingRegistry = new Map<string, Listing>();
  allListingRegistry = new Map<string, Listing>();
  selectedListing: Listing | undefined = undefined;
  loading = false;
  loadingInitial = false;
  loadingAllListingsAtOnce = false;
  loadingListing = false;
  loadedListing: Listing | undefined = undefined;
  contacts = false;
  combinedListing: Listing[] = [];
  // listings: Listing[] = [];

  // Pagination
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  loadingNext = false;

  // Filtering
  // predicate = new Map().set("searchTerm", "London").set("channel", "sale");
  predicate = new Map().set("mapBounds", "").set("channel", "sale").set("orderBy", "_");
  loadingFilters = false;
  maxValueRegistry = new Map<string, number>();

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        // restart from page 1
        this.pagingParams = new PagingParams(1, 100);
        this.listingRegistry.clear();
        // this.listings = [];
        this.loadListings();
      }
    )
  }

  // PAGINATION START
  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  }

  setPredicate = (predicate: string, value: string | string[]) => {
    switch (predicate) {
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
  loadListings = async () => {
    this.setLoadingInitial(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Listings.list(this.axiosParams);
      result.data.forEach(listing => {
        this.setListing(listing);
        // this.listings.push(listing);
      })
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadAllListings = async () => {
    this.setLoadingAllAtOnce(true);
    // Asynchronous code is inside Try Catch block
    try {
      const listings = await agent.Listings.listAll();
      listings.forEach(listing => {
        this.setAllListing(listing);
      })
      this.setLoadingAllAtOnce(false);
    } catch (error) {
      console.log(error);
      this.setLoadingAllAtOnce(false);
    }
  };

  loadListing = async (id: string) => {
    this.setLoadingListing(true);
    try {
      const listing = await agent.Listings.details(id);
      this.loadedListing = listing;
      this.setLoadingListing(false);
    } catch (error) {
      console.log(error);
      this.setLoadingListing(false);
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  setLoadingAllAtOnce = (state: boolean) => {
    this.loadingAllListingsAtOnce = state;
  }

  setLoadingListing = (state: boolean) => {
    this.loadingListing = state;
  }

  // helper method to map the listings to listing registry
  private setListing = (listing: Listing) => {
    // listing.addedOn = new Date(listing.addedOn!);
    this.listingRegistry.set(listing.id, listing);
  };

  // helper method to map the listings to listing registry
  private setAllListing = (listing: Listing) => {
    // listing.addedOn = new Date(listing.addedOn!);
    this.allListingRegistry.set(listing.id, listing);
  };

  setCombinedListing = (listings: Listing[]) => {
    this.combinedListing = listings;
  }

  selectListing = (id: string) => {
    this.selectedListing = this.listingRegistry.get(id);
  }

  cancelSelectListing = () => {
    this.selectedListing = undefined;
  }

  // LOAD LISTINGS END


  // PREPARE LISTING MAP DATA FOR VIEW - START
  get listings() {
    return Array.from(this.listingRegistry.values());
  }

  private getListing = (id: string) => {
    return this.listingRegistry.get(id);
    // return this.listings.find(x => x.id === id);
  };

  get allListings() {
    return Array.from(this.allListingRegistry.values());
  }

  get maxValues() {
    return Array.from(this.maxValueRegistry.values());
  }
  // PREPARE LISTING MAP DATA FOR VIEW - END


  // GET MAXIMUM VALUES FOR FILTER - START
  loadMaxValues = async () => {
    this.setLoadingFilters(true);
    // Asynchronous code is inside Try Catch block
    try {
      const maximumValues = await agent.Listings.getMax();
      maximumValues.forEach(item => {
        this.setMaxValueRegistry(item);
      })
      this.setLoadingFilters(false);
    } catch (error) {
      console.log(error);
      this.setLoadingFilters(false);
    }
  };

  setLoadingFilters = (state: boolean) => {
    this.loadingFilters = state;
  }

  // helper method to map the listings to listing registry
  private setMaxValueRegistry = (item: MaxValue) => {
    this.maxValueRegistry.set(item.name, item.value);
  };
  // GET MAXIMUM VALUES FOR FILTER - END

  setContacts = (state: boolean) => {
    this.contacts = state;
  }

  // CRUD Listing - START
  createListing = async (listing: ListingFormValues) => {
    // const user = store.userStore.user;
    try {
      await agent.Listings.create(listing);
      const newListing = new Listing(listing);
      this.setListing(newListing);
      runInAction(() => {
        this.selectedListing = newListing;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  };

  updateListing = async (listing: ListingFormValues) => {
    try {
      await agent.Listings.update(listing);
      runInAction(() => {
        if (listing.id) {
          let updatedListing = { ...this.getListing(listing.id), ...listing }
          this.listingRegistry.set(listing.id, updatedListing as Listing);
          // this.listings.push(updatedListing as Listing);
          this.selectedListing = updatedListing as Listing;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteListing = async (id: string) => {
    this.loading = true;
    try {
      await agent.Listings.delete(id);
      runInAction(() => {
        this.listingRegistry.delete(id);
        // this.listings.splice(this.listings.indexOf(this.listings.find(x => x.id === id)!), 1);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  // CRUD listing - END

}
