import React from "react";
import CompanyTags from "../../app/common/tags/CompanyTag";
import { Company } from "../../app/model/Company";
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
                    <img src={company.companyMedia[0]?.url} className="company-profile-pic" alt="profile" />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                    <h2>{company.displayName}</h2>
                    <br />
                    <p style={{ fontSize: "14px" }}><b>Summary:</b> {company.summaryDescription}</p>
                </div>
            </div>
        </div>
    );
}