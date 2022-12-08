import React from "react";
import './Tag.css';

interface Props {
    predicate: string;
    set: () => void;
    selected: boolean;
}

export default function Tag({ predicate, set, selected }: Props) {
    return (
        <button className={selected ? "tag-selected" : "tag"} onClick={set}>
            {predicate}
        </button>
    )
}