import React from "react";
import '../LoadingPlaceholder.css';

export default function ParagraphPlaceholder() {
    return (
        <div className="content-wrapper" >
            <div className="m-placeholder">
                <div className="text-animated-background"></div>
            </div>
            <div className="l-placeholder">
                <div className="text-animated-background"></div>
            </div>
            <div className="s-placeholder">
                <div className="text-animated-background"></div>
            </div>
            <div className="m-placeholder">
                <div className="text-animated-background"></div>
            </div>
        </div>
    );
}