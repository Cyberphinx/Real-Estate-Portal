import React from "react";
import CompanyTags from "../../app/common/tags/CompanyTag";
import { Company } from "../../app/model/CompanyAggregate/Company";
import './CompanyItem.css';

interface Props {
    company: Company;
}

export default function CompanyItem({ company }: Props) {


    return (
        <div className="company-container">
            <CompanyTags company={company} />
            <div className="company-card">
                <div className="company-profile-pic-container">
                    <img src={company.companyContents[0]?.url} className="company-profile-pic" alt="profile" />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                    <h2>{company.companyName}</h2>
                    <br />
                    <p style={{ fontSize: "14px" }}><b>Services:</b> {company.serviceScope}</p>
                </div>
            </div>
        </div>
    );
}