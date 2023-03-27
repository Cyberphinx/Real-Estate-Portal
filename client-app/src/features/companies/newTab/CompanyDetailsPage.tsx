import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import '../../listings/newTab/ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import { CompanyDescription } from "../../../app/model/Company";
import { Media } from "../../../app/model/Media";
import Nav from "../../../app/layout/Nav";

export default observer(function CompanyDetailsPage() {
    const { id } = useParams<string>();
    const { companyStore } = useStore();
    const { company, loadCompany, loadingCompany, cancelSelectCompany } = companyStore;

    useEffect(() => {
        if (id) loadCompany(id);
        return () => cancelSelectCompany();
    }, [id, loadCompany, cancelSelectCompany])

    if (loadingCompany || !company) return <LoadingComponent content={"Loading..."} />;

    return (
        <div>
            <Nav />
            <div style={{ position: "relative" }}>
                <section className="listing-contents-container" >
                    {company.companyMedia.map((content: Media) => (
                        <div className="single-content-container" key={content.id}>
                            <img src={content.url} alt={content.caption} className="content-images" />
                        </div>
                    ))}
                </section>

                    <section>
                        <div className="listing-descriptions-container">
                            {company.companyDescriptions.map((description: CompanyDescription) => (
                                <article key={description.id}>
                                    <p>{description.heading}</p>
                                    <p>{description.text}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="listing-contacts-container">
                            <p>Phone</p>
                            <p>{company.companyContacts.phone}</p>
                            <p>Email</p>
                            <p>{company.companyContacts.email}</p>
                        </div>
                    </section>
            </div>
        </div>

    );
});