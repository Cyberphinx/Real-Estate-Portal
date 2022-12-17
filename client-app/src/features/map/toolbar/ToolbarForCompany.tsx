import React from "react";
import { Link } from "react-router-dom";
import { Company } from "../../../app/model/CompanyAggregate/Company";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import Close from "./Close";
import Locate from "./Locate";
import LocateForCompany from "./LocateForCompany";
import NewTab from "./NewTab";
import './Toolbar.css';

export default function ToolbarForCompany() {
    const {companyStore} = useStore()
    const {selectedCompany, cancelSelectCompany} = companyStore;

    const addedDate = new Date(selectedCompany!.addedOn);
    const title = `Added on ${addedDate.toLocaleDateString()}`

    return (
        <div className="toolbar-container">
            <section className="toolbar-title"><p># {selectedCompany?.companyReference}</p></section>
            <section className="toolbar-locate"><LocateForCompany selectedItem={selectedCompany} /></section>
            <section className="toolbar-newtab">
                <Link to={`/company/${selectedCompany?.id}`} target="_blank" > <NewTab /> </Link>
            </section>
            <section className="toolbar-x"><Close close={cancelSelectCompany} /></section>
        </div>
    )
}