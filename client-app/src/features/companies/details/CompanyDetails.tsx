import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import './CompanyDetails.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Company, CompanyDescription } from "../../../app/model/Company";

interface Props {
    company: Company | undefined;
}

export default observer(function CompanyDetails({ company }: Props) {

    return (
        <div>
            <article>
                <div>{company?.companyDescriptions.map((description: CompanyDescription) => (
                    <div key={description.id} className="company-details-container">
                        <b>{description.heading}</b>
                        <p>{description.text}</p>
                    </div>
                ))}</div>
            </article>
        </div>
    );
});