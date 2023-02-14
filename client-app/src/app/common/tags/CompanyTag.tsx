import React from "react";
import { Company } from "../../model/Company";
import './CompanyTag.css';

interface Props {
    company: Company | null;
}

export default function CompanyTag({ company }: Props) {

    return(
        <div style={{position: "relative"}}>
            <span className="handyman" >
                    Service Category
                </span>
        </div>
        
    );
}