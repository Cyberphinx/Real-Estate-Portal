import React from "react";
import './Button.css';

interface Props{
    text: string;
    style: string;
    onClick: any;
}

export default function Button({text, style, onClick}: Props) {

    return (
        <div className="button-container">
            <button className={style} onClick={onClick}>{text}</button>
        </div>
        
    )
}