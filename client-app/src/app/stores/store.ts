import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import CompanyStore from "./companyStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import ListingStore from "./listingStore";
import FeatureStore from "./featureStore";
import MapStore from "./mapStore";
import JobStore from "./jobStore";
import ProfileStore from "./profileStore";
import AgentListingStore from "./agentListingStore";
import MessageStore from "./messageStore";
import RemovalistJobStore from "./removalistJobStore";
import CalendarStore from "./calendarStore";
import JobInvoiceStore from "./jobInvoiceStore";
import UserInvoiceStore from "./userInvoiceStore";

interface Store {
    // class can also be used as types
    commonStore: CommonStore;
    listingStore: ListingStore;
    featureStore: FeatureStore;
    companyStore: CompanyStore;
    jobStore: JobStore;
    userStore: UserStore;
    modalStore: ModalStore;
    mapStore: MapStore;
    profileStore: ProfileStore;
    agentListingStore: AgentListingStore;
    jobInvoiceStore: JobInvoiceStore;
    userInvoiceStore: UserInvoiceStore;
    messageStore: MessageStore;
    removalistJobStore: RemovalistJobStore;
    calendarStore: CalendarStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    listingStore: new ListingStore(),
    featureStore: new FeatureStore(),
    companyStore: new CompanyStore(),
    jobStore: new JobStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    mapStore: new MapStore(),
    profileStore: new ProfileStore(),
    agentListingStore: new AgentListingStore(),
    jobInvoiceStore: new JobInvoiceStore(),
    userInvoiceStore: new UserInvoiceStore(),
    messageStore: new MessageStore(),
    removalistJobStore: new RemovalistJobStore(),
    calendarStore: new CalendarStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}