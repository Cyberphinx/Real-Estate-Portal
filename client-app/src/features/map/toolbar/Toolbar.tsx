import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import Close from "./Close";
import Locate from "./Locate";
import NewTab from "./NewTab";
import './Toolbar.css';
import Watch from "./Watch";

export default function Toolbar() {
    const {listingStore} = useStore()
    const {selectedListing, cancelSelectListing} = listingStore;

    // const addedDate = new Date(selectedListing!.addedOn);
    // const title = `Added on ${addedDate.toLocaleDateString()}`

    return (
        <div className="toolbar-container" style={{gridTemplateColumns:"auto 30px 50px 50px 50px"}}>
            <section className="toolbar-title">{selectedListing?.company.displayName}</section>
            <section className="toolbar-button" style={{width:"10px"}}><Watch listing={selectedListing} /></section>
            <section className="toolbar-button"><Locate selectedItem={selectedListing} /></section>
            <section className="toolbar-button">
                <Link to={`/listing/${selectedListing?.id}`} target="_blank" > <NewTab /> </Link>
            </section>
            <section className="toolbar-button"><Close close={cancelSelectListing} /></section>
        </div>
    )
}