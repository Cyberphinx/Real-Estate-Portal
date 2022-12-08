import React from "react";
import './CompanyTab.css';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import CompanyDetails from "./CompanyDetails";
import BookingCalendarIsLoggedIn from "./BookingCalendarIsLoggedIn";
import BookingCalendarTab from "./BookingCalendarTab";
import Toolbar from "../../../app/common/toolbar/Toolbar";

export default observer(function CompanyTab() {
    const { listingStore, userStore } = useStore();
    const { selectedCompany, cancelSelectCompany } = listingStore;
    const { isLoggedIn } = userStore;
    
    return (
        <div className="company-details-container" >
            <Toolbar selectedItem={selectedCompany} title={undefined} close={cancelSelectCompany} />
            <CompanyDetails company={selectedCompany} />
            {isLoggedIn 
            ? <BookingCalendarIsLoggedIn company={selectedCompany} />
            : <BookingCalendarTab company={selectedCompany} />
            }
        </div>
    );
})