import React from "react";
import './LoadingPlaceholder.css';
import ImagePlaceholder from "./placeholder/ImagePlaceholder";
import ParagraphPlaceholder from "./placeholder/ParagraphPlaceholder";

export default function LoadingPlaceholder() {
    return (
        <div className="content-wrapper" >
            <ImagePlaceholder />
            <ParagraphPlaceholder />
        </div>
    );
}