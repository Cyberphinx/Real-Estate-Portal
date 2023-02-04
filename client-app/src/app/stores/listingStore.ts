import { ListingMediaDto } from './../model/ListingAggregate/ListingObjects';
import { PagingParams } from '../model/Pagination';
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination } from '../model/Pagination';
import { Listing, ListingFormValues } from '../model/ListingAggregate/Listing';
import { MaxValue } from '../model/MaxValue';
import { store } from './store';

export default class ListingStore {
  listingRegistry = new Map<string, Listing>();
  selectedListing: Listing | undefined = undefined;
  listingId: string | undefined = undefined;
  loading = false;
  uploading = false;
  loadingInitial = false;
  loadingListing = false;
  contacts = false;
  combinedListing: Listing[] = [];
  loadingWatching = false;


  // Pagination
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  loadingNext = false;

  // Filtering
  predicate = new Map().set("mapBounds", "").set("channel", "rent").set("orderBy", "_");
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

  loadListing = async (id: string) => {
    let listing = this.getListing(id);
    if (listing) {
      // this.selectedListing = listing;
      return listing;
    }
    else {
      this.setLoadingListing(true);
      try {
        listing = await agent.Listings.details(id);
        this.setListing(listing);
        // runInAction(() => this.selectedListing = listing);
        this.setLoadingListing(false);
        return listing;
      } catch (error) {
        console.log(error);
        this.setLoadingListing(false);
      }
    }

  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  setLoadingListing = (state: boolean) => {
    this.loadingListing = state;
  }

  // helper method to map the listings to listing registry
  private setListing = (listing: Listing) => {
    this.listingRegistry.set(listing.id, listing);
  };

  private getListing = (id: string) => {
    return this.listingRegistry.get(id);
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


  get listings() {
    return Array.from(this.listingRegistry.values());
  }

  get maxValues() {
    return Array.from(this.maxValueRegistry.values());
  }

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

  setContacts = (state: boolean) => {
    this.contacts = state;
  }

  watchListing = async (listingId: string) => {
    this.loadingWatching = true;
    try {
      await agent.Listings.watchListing(listingId);
      runInAction(() => {
        this.loadingWatching = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loadingWatching = false);
    }
  }

  setListingId = (value: string) => this.listingId = value;

  createListing = async (companyId: string, listing: ListingFormValues) => {
    // const user = store.userStore.user;
    try {
      await agent.Listings.create(companyId, listing);
      const newListing = new Listing(listing);
      this.setListing(newListing);
      runInAction(() => {
        this.selectedListing = newListing;
        this.listingId = newListing.id;
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
          // this.selectedListing = updatedListing as Listing;
          this.listingId = listing.id;
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
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  uploadListingMedia = async (listingId: string, file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Listings.uploadMedia(listingId, file);
      const media = response.data;
      runInAction(() => {
        console.log(media.url);
        this.uploading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.uploading = false);
    }
  };

  setMainImage = async (listingId: string, image: ListingMediaDto) => {
    this.loading = true;
    try {
      await agent.Listings.setMainImage(listingId, image.id);
      store.agentListingStore.setImage(image.url);
      runInAction(() => {
        console.log(image.isMain ? "isMain: true" : "isMain: false");
        this.loading = false;
      })
    } catch (error) {
      runInAction(() => this.loading = false);
      console.log(error);
    }
  };

  deleteMedia = async (listingId: string, media: ListingMediaDto) => {
    this.loading = true;
    try {
      await agent.Listings.deleteMedia(listingId, media.id);
      runInAction(() => {
        console.log("media deleted");
        this.loading = false;
      })
    } catch (error) {
      runInAction(() => this.loading = false);
      console.log(error);
    }
  };

}
