import React from "react";
import './LoadingPlaceholder.css';
import ImagePlaceholder from "./placeholder/ImagePlaceholder";
import ParagraphPlaceholder from "./placeholder/ParagraphPlaceholder";

export default function SnippetPlaceholder() {
    return (
        <div className="content-wrapper" style={{width:"220px"}} >
            <div className="img-placeholder">
                <div className="snippet-animated-background"></div>
            </div>
            <div className="l-placeholder">
                <div className="text-animated-background"></div>
            </div>
        </div>
    );
}