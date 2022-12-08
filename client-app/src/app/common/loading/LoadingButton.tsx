import React from "react";
import './LoadingButton.css';

interface Props {
    isLoading: boolean;
}

export default function LoadingButton({ isLoading }: Props) {
    return (
        <span className={"btn-" + (isLoading ? "loading" : "text")}></span>
    );
}