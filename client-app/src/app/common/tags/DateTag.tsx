import React from "react";
import './DateTag.css';

interface Props {
    listing: any;
}

export default function DateTag({ listing }: Props) {
    const addedDate = new Date(listing!.addedOn);

    function getDate() {
        let today = new Date();
        
        if (addedDate.toLocaleDateString() === today.toLocaleDateString()) {
            return "Added today";
        } else {
            return addedDate.toLocaleDateString();
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <span className="date-tag" style={getDate() === "Added today" ? {background:'#0014FF', color:'white'} : {}} >
                {getDate()}
            </span>
        </div>
    );
}