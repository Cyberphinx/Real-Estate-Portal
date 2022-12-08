import { observer } from "mobx-react-lite";
import React from "react";
import './Companies.css';

export default observer(function Companies() {

    const trades = [
        "Architectural Services",
        "Bathroom Fitting",
        "Bricklaying",
        "Building",
        "Carpentry",
        "Carpets &  Lino",
        "Central Heating",
        "Chimney & Fireplaces",
        "Conservatories",
        "Conversions General",
        "Cleaning",
        "Damp Proofing",
        "Decking",
        "Demolition & Clearing",
        "Driveways",
        "Electrical",
        "Extensions",
        "Fascias & Soffits",
        "Fencing",
        "Fireplaces & Flues",
        "Garden Maintenance",
        "Gas Work",
        "Groundwork & Foundations",
        "Guttering",
        "Handyman",
        "Hard Flooring",
        "Insulation",
        "Kitchen Fitting",
        "Landscape & Gardening",
        "Locksmiths",
        "Loft Conversions",
        "New Builds",
        "Painting & Decorating",
        "Plastering",
        "Pluming",
        "Removals",
        "Repointing",
        "Restoration & Refurbishment",
        "Roofing Flat",
        "Roofing Pitched",
        "Security Systems",
        "Stonemasonry",
        "Storage",
        "Tiling",
        "Tree Surgery",
        "Waste Clearance",
        "Windows & Doors",
    ]

    return (
        <div className="companies-container">
            <section className="service-container">
                <article className="service-index" style={{ marginBottom: "0px" }}>
                    <div className="service-icon"></div>
                    <p className="service-title">Direct Messages</p>
                </article>
                <hr style={{ margin: "5px 5px", width: "80%" }} />
                <article className="service-index">
                    <div className="service-icon"></div>
                    <p className="service-title">Estate Agents</p>
                </article>
                <article className="service-index">
                    <div className="service-icon"></div>
                    <p className="service-title">Builders</p>
                </article>
                <article className="service-index">
                    <div className="service-icon"></div>
                    <p className="service-title">Logistics</p>
                </article>
            </section>
            <section className="subservice-container">
                <article className="subservice-toolbar">
                    <div>
                        <p className="subservice-toolbar-text">Builders</p>
                    </div>
                    <div style={{padding:"12.5px 20px", textAlign:"right"}}>
                        <input className="subservice-toolbar-search" placeholder="Filter by tag name" />
                    </div>
                </article>
                <article className="subservice-list-container">
                    {trades.map((trade: string, index: number) => (
                        <article key={index}>
                            <div className="subservice-title">
                                {/* <input type="checkbox" /> */}
                                <span ># {trade} ({Math.floor(Math.random() * 500)})</span>
                            </div>
                        </article>
                    ))}
                </article>
            </section>
        </div>
    );
});