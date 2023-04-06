import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import './CompanyOverview.css';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Company } from "../../../app/model/Company";
import { Media } from "../../../app/model/Media";

interface Props {
    company: Company | undefined;
}

export default observer(function CompanyOverview({ company }: Props) {

    const [companyImage, setCompanyImage] = useState<Media>(company!.companyMedia[0]);
    function handleImage(event: SyntheticEvent, state: Media) {
        event.stopPropagation();
        setCompanyImage(state);
    }
    const scrollRef = useRef<any>(null);
    // const scroll = (event: SyntheticEvent, scrollOffset: number) => {
    //     event.stopPropagation();
    //     scrollRef.current.scrollLeft += scrollOffset;
    // };
    
    useEffect(() => {
        setCompanyImage(company!.companyMedia[0]);
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
        if (company!.companyMedia.indexOf(companyImage) === 0) return null;
        else {
            setCompanyImage(company!.companyMedia[company!.companyMedia.indexOf(companyImage) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        if (company!.companyMedia.indexOf(companyImage) < company!.companyMedia.length - 1) {
            setCompanyImage(company!.companyMedia[company!.companyMedia.indexOf(companyImage) + 1]);
        }
        else {
            return null;
        }
    }

    
    return (<div>
                <section className="details-gallery">
                    <div style={{ position: "relative" }}>
                        <Link to={`/company/${company?.id}`} target="_blank" >
                            <img className="details-image" src={companyImage?.url} alt="cover" />
                        </Link>
                        <span className="image-numbering">
                            Image {company!.companyMedia.indexOf(companyImage) + 1} of {company?.companyMedia.length}
                        </span>
                        <button className="left-arrow" onClick={(e) => handlePrev(e)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                        <button className="right-arrow" onClick={(e) => handleNext(e)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                    </div>
                    <div style={{ position: "relative" }}>
                        <section className="details-carousel" style={{ gridTemplateColumns: `repeat(${company?.companyMedia.length}, calc(100vh / 6))` }} ref={scrollRef}>
                            {company?.companyMedia.map((content: Media, index: number) => (
                                <div style={{ position: "relative" }} key={content.id}>
                                    <img className="details-thumbnail" src={content.url} alt={content.caption} onClick={(e) => handleImage(e, content)} />
                                    <span className="thumbnail-numbering">{index + 1}</span>
                                </div>
                            ))}
                        </section>
                        {/* <button className="left-arrow-thumbnails" onClick={(e) => scroll(e, -240)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button> */}
                        {/* <button className="right-arrow-thumbnails" onClick={(e) => scroll(e, 240)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button> */}
                    </div>
                </section>

                <article className="header-container">
                        <span style={{ fontSize: "1.25rem", fontWeight:"bold" }}>{company?.displayName}</span>
                        <p>Phone: {company?.companyContacts.phone}</p>
                        <p>Email: {company?.companyContacts.email}</p>
                        <p>Address: {address}</p>
                        <p>Property listings: {company?.listingsCount}</p>
                </article>
            </div>
    );
});