import React from "react";
import './CloseFilters.css';

interface Props {
    close: () => void;
}

export default function CloseFilters({ close }: Props) {

    return (
        <div>
            <button className="filters-close-button" onClick={close} >
                <img className="close" src="/assets/close.svg" alt="X" />
                <span className="close-tooltip">Close panel</span>
            </button>
        </div>
    )
}