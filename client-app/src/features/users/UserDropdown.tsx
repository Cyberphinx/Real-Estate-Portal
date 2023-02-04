import { observer } from "mobx-react-lite";
import React from "react";
import './UserDropdown.css';
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";

export default observer(function UserDropdown() {
    const { userStore, featureStore, companyStore, listingStore, modalStore, profileStore } = useStore();
    const { logout, user } = userStore;
    const { setActiveFeature, setActiveAgencyPanel } = featureStore;
    const { myCompany, } = companyStore;
    const { cancelSelectListing } = listingStore;
    const { cancelSelectCompany } = companyStore;
    const { setActiveTab } = profileStore;

    return (
        <div className="user-dropdown">
            <button className="user-drop-button" style={{fontWeight:"600"}}
                onClick={() => { cancelSelectListing(); cancelSelectCompany(); setActiveFeature(2); setActiveTab(2); }}
            ><Link className="user-drop-link" to={"/control-panel"} >Control Panel</Link></button>

            {user?.role.includes("Admin") &&
                <button className="user-drop-button"
                    onClick={() => {
                        setActiveFeature(3);
                    }}>
                    Admin Panel
                </button>
            }
            <button className="user-drop-button" >Dark Mode</button>
            <button className="user-drop-button" onClick={() => { logout(); setActiveFeature(0) }}>Logout</button>
        </div>
    );
});