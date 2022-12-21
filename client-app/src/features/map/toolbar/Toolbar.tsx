import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import Close from "./Close";
import Locate from "./Locate";
import NewTab from "./NewTab";
import './Toolbar.css';

export default function Toolbar() {
    const {listingStore} = useStore()
    const {selectedListing, cancelSelectListing} = listingStore;

    // const addedDate = new Date(selectedListing!.addedOn);
    // const title = `Added on ${addedDate.toLocaleDateString()}`

    return (
        <div className="toolbar-container">
            <section className="toolbar-title">#{selectedListing?.listingReference}</section>
            <section className="toolbar-locate"><Locate selectedItem={selectedListing} /></section>
            <section className="toolbar-newtab">
                <Link to={`/listing/${selectedListing?.id}`} target="_blank" > <NewTab /> </Link>
            </section>
            <section className="toolbar-x"><Close close={cancelSelectListing} /></section>
        </div>
    )
}