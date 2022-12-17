import React from "react";
import { Company } from "../../model/CompanyAggregate/Company";
import { ServiceCategory } from "../../model/ServiceCategory";
import './CompanyTag.css';

interface Props {
    company: Company | null;
}

export default function CompanyTag({ company }: Props) {
    // const tagStyle = (company: Company) => {
    //     switch (company.serviceCategory) {
    //         case 0:
    //             return "category-tag moving"
    //         case 1:
    //             return "category-tag cleaning"
    //         case 2:
    //             return "category-tag gardening"
    //         case 3:
    //             return "category-tag electrician"
    //         case 4:
    //             return "category-tag handyman"
    //     }
    // }

    return(
        <div style={{position: "relative"}}>
            <span className="handyman" >
                    Service Category
                </span>
        </div>
        
    );
}