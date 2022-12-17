import { observer } from "mobx-react-lite";
import React from "react";
import './UserDropdown.css';
import { useStore } from "../../app/stores/store";
import CreateCompany from "../companies/CreateCompany";

export default observer(function UserDropdown() {
    const { userStore, featureStore, companyStore, listingStore, modalStore } = useStore();
    const { logout, user } = userStore;
    const { setActiveFeature, setActiveAgencyPanel } = featureStore;
    const { myCompany, } = companyStore;
    const { cancelSelectListing } = listingStore;
    const { cancelSelectCompany } = companyStore;
    const { openModal } = modalStore;

    return (
        <div className="user-dropdown">
            <button className="user-drop-button"
                onClick={() => { cancelSelectListing(); cancelSelectCompany(); setActiveFeature(2); }}
            >Control Panel</button>

            {user?.role.includes("Company") &&
                <>
                    {myCompany?.displayName === ""
                        ? <button className="user-drop-button" onClick={() => openModal(<CreateCompany />)}>Create Company</button>
                        : null}
                </>}
            {user?.role.includes("Admin") &&
                <button className="user-drop-button"
                    onClick={() => {
                        setActiveFeature(3);
                        setActiveAgencyPanel(0);
                    }}>
                    Admin Panel
                </button>
            }
            <button className="user-drop-button" >Dark Mode</button>
            <button className="user-drop-button" onClick={() => { logout(); setActiveFeature(0) }}>Logout</button>
        </div>
    );
});