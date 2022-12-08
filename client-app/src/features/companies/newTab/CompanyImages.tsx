import React from "react";
import { Company } from "../../../app/model/CompanyAggregate/Company";
import './CompanyImages.css';

interface Props {
    company: Company | undefined;
}

export default function CompanyImages({ company }: Props) {
    return (
        <div className="images-container">
            {/* {company?.images.map((image: Image) => (
                <img key={image.id} src={image.url} className="company-images" />
            ))} */}
            <img src={company?.companyContents[0].url} className="company-images" alt="Profile Picture"/>
        </div>
    );
}