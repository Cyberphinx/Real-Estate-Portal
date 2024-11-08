import React from "react";
import { Company } from "../../model/Company";
import { UserCompanyDto } from "../../model/Profile";
import './AgencyTag.css';

interface Props {
    company: Company | UserCompanyDto | undefined;
}

export default function AgencyTagForCompany({ company }: Props) {

    return (
        <div style={{ position: "relative" }}>
            <span className="agency-tag" >
                {company?.displayName}
            </span>
        </div>
    );
}