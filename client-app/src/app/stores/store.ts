import { createContext, useContext } from "react";
import AvailabilityStore from "./availabilityStore";
import CalendarStore from "./calendarStore";
import CommonStore from "./commonStore";
import CompanyStore from "./companyStore";
import ModalStore from "./modalStore";
import OrderStore from "./orderStore";
import UserStore from "./userStore";
import ListingStore from "./listingStore";
import FeatureStore from "./featureStore";
import CityStore from "./cityStore";
import MapStore from "./mapStore";

interface Store {
    // class can also be used as types
    commonStore: CommonStore;
    listingStore: ListingStore;
    featureStore: FeatureStore;
    companyStore: CompanyStore;
    orderStore: OrderStore;
    userStore: UserStore;
    modalStore: ModalStore;
    calendarStore: CalendarStore;
    availabilityStore: AvailabilityStore;
    cityStore: CityStore;
    mapStore: MapStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    listingStore: new ListingStore(),
    featureStore: new FeatureStore(),
    companyStore: new CompanyStore(),
    orderStore: new OrderStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    calendarStore: new CalendarStore(),
    availabilityStore: new AvailabilityStore(),
    cityStore: new CityStore(),
    mapStore: new MapStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}