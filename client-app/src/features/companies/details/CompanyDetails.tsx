import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import '../../listings/details/ListingDetails.css';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Company, CompanyContent, CompanyDescription } from "../../../app/model/Company";
import AgencyTagForCompany from "../../../app/common/tags/AgencyTagForCompany";
import CompanyBookmark from "./CompanyBookmark";

interface Props {
    company: Company | undefined;
}

export default observer(function CompanyDetails({ company }: Props) {
    const { companyStore } = useStore();
    const { companies } = companyStore;

    const [companyImage, setCompanyImage] = useState<CompanyContent>(company!.companyContents[0]);
    function handleImage(event: SyntheticEvent, state: CompanyContent) {
        event.stopPropagation();
        setCompanyImage(state);
    }
    const scrollRef = useRef<any>(null);
    const scroll = (event: SyntheticEvent, scrollOffset: number) => {
        event.stopPropagation();
        scrollRef.current.scrollLeft += scrollOffset;
    };
    
    useEffect(() => {
        setCompanyImage(company!.companyContents[0]);
    }, [company])

    const address = `${company?.companyAddress.propertyNumberOrName && (company?.companyAddress.propertyNumberOrName + ", ")}
        ${company?.companyAddress.streetName && (company?.companyAddress.streetName + ", ")}
        ${company?.companyAddress.locality && (company?.companyAddress.locality + ", ")}
        ${company?.companyAddress.townOrCity && (company?.companyAddress.townOrCity + ", ")}
        ${company?.companyAddress.county && (company?.companyAddress.county + ", ")}
        ${company?.companyAddress.postalCode && (company?.companyAddress.postalCode)}
        `;

    function handlePrev(event: SyntheticEvent) {
        event.stopPropagation();
        if (company!.companyContents.indexOf(companyImage) === 0) return null;
        else {
            setCompanyImage(company!.companyContents[company!.companyContents.indexOf(companyImage) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        if (company!.companyContents.indexOf(companyImage) < company!.companyContents.length - 1) {
            setCompanyImage(company!.companyContents[company!.companyContents.indexOf(companyImage) + 1]);
        }
        else {
            return null;
        }
    }

    const multiCompanies: Company[] = companies.filter(x => x.companyAddress.coordinates.latitude === company?.companyAddress.coordinates.latitude && x.companyAddress.coordinates.longitude === company?.companyAddress.coordinates.longitude);

    return (
        <div className="details-container" >
            {/* <Toolbar close={cancelSelectListing} title={title} selectedItem={listing} /> */}
            {multiCompanies.length > 1 && <CompanyBookmark multiCompanies={multiCompanies} />}
            <div className="details-contents" style={(multiCompanies.length > 1) ? { marginTop: "60px" } : {}}>
                <AgencyTagForCompany company={company} />
                <section className="details-gallery">
                    <div style={{ position: "relative" }}>
                        <Link to={`/company/${company?.id}`} target="_blank" >
                            <img className="details-image" src={companyImage?.url} alt="cover" />
                        </Link>
                        <span className="image-numbering">
                            Image {company!.companyContents.indexOf(companyImage) + 1} of {company?.companyContents.length}
                        </span>
                        <button className="left-arrow" onClick={(e) => handlePrev(e)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                        <button className="right-arrow" onClick={(e) => handleNext(e)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                    </div>
                    <div style={{ position: "relative" }}>
                        <section className="details-carousel" style={{ gridTemplateColumns: `repeat(${company?.companyContents.length}, calc(100vh / 6))` }} ref={scrollRef}>
                            {company?.companyContents.map((content: CompanyContent, index: number) => (
                                <div style={{ position: "relative" }} key={content.id}>
                                    <img className="details-thumbnail" src={content.url} alt={content.caption} onClick={(e) => handleImage(e, content)} />
                                    <span className="thumbnail-numbering">{index + 1}</span>
                                </div>
                            ))}
                        </section>
                        <button className="left-arrow-thumbnails" onClick={(e) => scroll(e, -240)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                        <button className="right-arrow-thumbnails" onClick={(e) => scroll(e, 240)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                    </div>
                </section>

                <article className="header-container">
                    <div className="header-one">
                        <span style={{ fontSize: "24px" }}>{company?.displayName}</span>
                    </div>
                    <div className="header-two" style={{paddingTop:"0px"}}>
                        <p>Phone: {company?.companyContacts.phone}</p>
                        <p>Email: {company?.companyContacts.email}</p>
                        <p>Address: {address}</p>
                    </div>
                </article>

                <hr className="details-divider" />
                <article className="content">
                    <div>{company?.companyDescriptions.map((description: CompanyDescription) => (
                        <div key={description.id}>
                            <b>{description.heading}</b>
                            <p>{description.text}</p>
                        </div>
                    ))}</div>
                </article>

            </div>
        </div>
    );
});