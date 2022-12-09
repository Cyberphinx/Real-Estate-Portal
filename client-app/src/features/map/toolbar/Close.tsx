import React from "react";
import './Close.css';

interface Props {
    close: () => void;
}

export default function Close({ close }: Props) {

    return (
        <div>
            <button className="close-button" onClick={close} >
                <img className="x" src="/assets/close.svg" alt="X" />
                <span className="x-tooltip">Close panel</span>
            </button>
        </div>
    )
}