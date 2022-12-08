import React from "react";
import { Company } from "../../../app/model/CompanyAggregate/Company";
import { User } from "../../../app/model/User";
import './CompanyProfile.css';
import CompanyImages from "./CompanyImages";
import { Insurance } from "../../../app/model/CompanyAggregate/Insurance";

interface Props {
    company: Company | undefined;
    user: User | null;
    setEditMode: any;
}

export default function CompanyProfile({ company, user, setEditMode }: Props) {
    return (
        <div className="company-profile-container">
            <div className="company-profile-contents">
                <div className="company-page-title-container">
                    <CompanyImages company={company} />
                    <div style={{ padding: "0px 40px" }}>
                        {user?.role.includes("Company") && company?.usernames.includes(user.username) &&
                            <button className="edit-company-button" onClick={() => setEditMode(true)}>Edit Profile</button>
                        }
                        <h1>{company?.companyName}</h1>
                        <p><b>{company?.summaryDescription}</b></p>
                    </div>
                </div>

                <div className="company-profile-details">
                    <hr className="page-divider" />
                    <h3>Description: </h3>
                    <p>{company?.summaryDescription}</p>
                    <hr className="page-divider" />
                    <h3>Service details: </h3>
                    <p>Location: {company?.companyAddress.townOrCity}, {company?.companyAddress.country}</p>
                    <p>Business name: {company?.companyName}</p>
                    <p>Area serviced: {company?.serviceLocations}</p>
                    <p>Service offered: {company?.serviceScope}</p>
                    <hr className="page-divider" />
                    <h3>Company status: </h3>
                    <p>Business owner: {company?.companyDetails.businessOwner}</p>
                    <p>Business type: {company?.companyDetails.type}</p>
                    <h3>Company insurances: </h3>
                    <div>{company?.insurances.map((insurance: Insurance) => (
                        <div key={insurance.id}>
                            <p>{insurance.type} - {insurance.insurer}</p>
                        </div>
                    ))}</div>
                </div>
            </div>
        </div>
    );
}