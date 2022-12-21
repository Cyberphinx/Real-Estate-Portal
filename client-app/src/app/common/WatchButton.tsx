import React from "react";
import { Listing } from "../model/ListingAggregate/Listing";
import './WatchButton.css';

interface Props {
    listing: Listing | undefined;
}

export default function WatchButton({ listing }: Props) {

    return (
        <div style={{ position: "relative" }}>
            <button className="watch-button" >
                <img className="eye-icon" src="/assets/heart_white.svg" alt="Watch" />
                {/* <span className="watch-tooltip">Static list </span> */}
            </button>
        </div>
    );
}