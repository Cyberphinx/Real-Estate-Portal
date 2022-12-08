import React from "react";
import { Link } from "react-router-dom";
import { Company } from "../../model/CompanyAggregate/Company";
import { Listing } from "../../model/ListingAggregate/Listing";
import Close from "./Close";
import Locate from "./Locate";
import NewTab from "./NewTab";
import './Toolbar.css';

interface Props {
    selectedItem: Listing | Company | undefined;
    title: string | undefined;
    close: () => void;
}

export default function Toolbar({ close, selectedItem, title }: Props) {

    return (
        <div className="toolbar-container">
            <section className="toolbar-title"><p>{title}</p></section>
            <section className="toolbar-locate"><Locate selectedItem={selectedItem} /></section>
            <section className="toolbar-newtab">
                <Link to={`/listings/${selectedItem?.id}`} target="_blank" > <NewTab /> </Link>
            </section>
            <section className="toolbar-x"><Close close={close} /></section>
        </div>
    )
}