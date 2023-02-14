import React from "react";

export default function SideBar() {
    
    const currentTrades = [
        'CentralHeating',
        'Cleaning',
        'Electrical',
        'EstateAgent',
        'GasWork',
        'Handyman',
        'Removals',
    ]

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
                    <p className="service-title">Browse Jobs</p>
                </article>
            </section>
            <section className="subservice-container">
                <article className="subservice-toolbar">
                    <div>
                        <p className="subservice-toolbar-text">Browse Jobs</p>
                    </div>
                    <div style={{padding:"10px 20px", textAlign:"right"}}>
                        <input className="subservice-toolbar-search" placeholder="Filter by tag name" />
                    </div>
                </article>
                <article className="subservice-list-container">
                    {trades.map((trade: string, index: number) => (
                        <div key={index}>
                            <p className="subservice-tags"># {trade}</p>
                        </div>
                    ))}
                </article>
            </section>
        </div>
    )
}