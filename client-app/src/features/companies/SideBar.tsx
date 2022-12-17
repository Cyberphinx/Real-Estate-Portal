import React from "react";
import { ServiceCategory } from "../../app/model/ServiceCategory";

export default function SideBar() {
    
    const currentTrades = [
        ServiceCategory.BathroomFitting,
        ServiceCategory.CentralHeating,
        ServiceCategory.Cleaning,
        ServiceCategory.Electrical,
        ServiceCategory.EstateAgent,
        ServiceCategory.GasWork,
        ServiceCategory.Handyman,
        ServiceCategory.Removals,
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
                    <p className="service-title">Category</p>
                </article>
            </section>
            <section className="subservice-container">
                <article className="subservice-toolbar">
                    <div>
                        <p className="subservice-toolbar-text">Service Category</p>
                    </div>
                    <div style={{padding:"12.5px 20px", textAlign:"right"}}>
                        <input className="subservice-toolbar-search" placeholder="Filter by tag name" />
                    </div>
                </article>
                <article className="subservice-list-container">
                    {currentTrades.map((trade: ServiceCategory, index: number) => (
                        <article key={index}>
                            <p className="subservice-tags"># {ServiceCategory[trade].replace(/[A-Z]/g, ' $&'). trim()}</p>
                        </article>
                    ))}
                </article>
            </section>
        </div>
    )
}