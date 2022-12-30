import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import Close from "./Close";
import LocateForCompany from "./LocateForCompany";
import NewTab from "./NewTab";
import './Toolbar.css';

export default function ToolbarForCompany() {
    const {companyStore} = useStore()
    const {selectedCompany, cancelSelectCompany} = companyStore;

    return (
        <div className="toolbar-container" style={{gridTemplateColumns:"auto 50px 50px 50px"}}>
            <section className="toolbar-title">{selectedCompany?.displayName}</section>
            <section className="toolbar-button"><LocateForCompany selectedItem={selectedCompany} /></section>
            <section className="toolbar-button">
                <Link to={`/company/${selectedCompany?.id}`} target="_blank" > <NewTab /> </Link>
            </section>
            <section className="toolbar-button"><Close close={cancelSelectCompany} /></section>
        </div>
    )
}