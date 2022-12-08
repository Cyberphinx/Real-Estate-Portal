import React from "react";
import './LoadingPlaceholder.css';

export default function BranchPlaceholder() {
    return (
        <div className="content-wrapper" style={{width:"calc(100vw / 8)"}} >
            <div className="thumb-placeholder">
                <div className="branch-animated-background"></div>
            </div>
        </div>
    );
}