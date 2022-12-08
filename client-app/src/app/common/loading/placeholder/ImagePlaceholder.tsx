import React from "react";
import '../LoadingPlaceholder.css';

export default function ImagePlaceholder() {
    return (
        <div className="content-wrapper" >
            <div className="img-placeholder">
                <div className="img-animated-background"></div>
            </div>
        </div>
    );
}