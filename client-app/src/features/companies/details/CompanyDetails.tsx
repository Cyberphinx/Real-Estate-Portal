import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import '../../listings/details/ListingTab.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Company, CompanyContent, CompanyDescription } from "../../../app/model/Company";

interface Props {
    company: Company | undefined;
}

export default observer(function CompanyTab({ company }: Props) {

    return (
        <div>
            <article className="content" style={{padding:"20px"}}>
                <div>{company?.companyDescriptions.map((description: CompanyDescription) => (
                    <div key={description.id}>
                        <b>{description.heading}</b>
                        <p>{description.text}</p>
                    </div>
                ))}</div>
            </article>
        </div>
    );
});