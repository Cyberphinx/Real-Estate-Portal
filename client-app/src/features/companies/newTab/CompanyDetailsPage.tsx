import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import '../../listings/newTab/ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import Close from "../../map/toolbar/Close";
import { CompanyContent, CompanyDescription } from "../../../app/model/Company";
import NavBarForCompany from "../../../app/layout/NavBarForCompany";

export default observer(function CompanyDetailsPage() {
    const { id } = useParams<string>();
    const { companyStore, featureStore } = useStore();
    const { selectedCompany: company, loadCompany, loadingCompany, cancelSelectCompany } = companyStore;
    const { description, setDescription, contacts, setContacts } = featureStore;

    useEffect(() => {
        if (id) loadCompany(id);
        return () => cancelSelectCompany();
    }, [id, loadCompany, cancelSelectCompany])

    if (loadingCompany || !company) return <LoadingComponent content={"Loading..."} />;

    return (
        <div>
            <NavBarForCompany />
            <div style={{ position: "relative" }}>
                <section className="listing-contents-container" >
                    {company.companyContents.map((content: CompanyContent) => (
                        <div className="single-content-container" key={content.id}>
                            <img src={content.url} alt={content.caption} className="content-images" />
                        </div>
                    ))}
                </section>

                {description &&
                    <section>
                        <div className="close-position">
                            <Close close={() => setDescription()} />
                        </div>
                        <div className="listing-descriptions-container">
                            {company.companyDescriptions.map((description: CompanyDescription) => (
                                <article key={description.id}>
                                    <h1>{description.heading}</h1>
                                    <p>{description.text}</p>
                                </article>
                            ))}
                        </div>
                    </section>}

                {contacts &&
                    <section>
                        <div className="close-position">
                            <Close close={() => setContacts()} />
                        </div>
                        <div className="listing-contacts-container">
                            <h1>Phone</h1>
                            <p>{company.companyContacts.phone}</p>
                            <h1>Email</h1>
                            <p>{company.companyContacts.email}</p>
                        </div>
                    </section>}
            </div>
        </div>

    );
});