import React from "react";
import './NewTab.css';

export default function NewTab() {
    return (
        <div className="new-tab-container">
            <button className="new-tab-button">
                <img className="new-tab-icon" src="/assets/newtab.svg" alt="newtab" />
                <span className="new-tab-tooltip">Open in new tab</span>
            </button>
        </div>
    )
}