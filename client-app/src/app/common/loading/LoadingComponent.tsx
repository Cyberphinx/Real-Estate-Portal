import React from "react";
import './LoadingComponent.css';

interface Props {
    content: string | null;
}

export default function LoadingComponent({ content = "Loading..." }: Props) {
    return (
        <div>
            <div className="loader"></div>
            {content != null && <span className="loader-content">{content}</span>}
        </div>
    );
}