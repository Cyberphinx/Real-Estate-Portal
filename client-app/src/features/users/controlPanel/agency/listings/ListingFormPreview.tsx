import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../../../../app/layout/Nav";
import { Listing } from "../../../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../../../app/stores/store";
import ListingContact from "../../../../listings/details/ListingContact";
import ListingDetails from "../../../../listings/details/ListingDetails";
import ListingOverview from "../../../../listings/details/ListingOverview";
import ListingTab from "../../../../listings/details/ListingTab";
import ListingFormStepper from "./listingForms/ListingFormStepper";

export default observer(function ListingFormPreview() {
    const { id } = useParams<string>();
    const { listingStore: { loadListing, loadingListing }, featureStore, profileStore } = useStore();
    const { listingFormStep, setListingFormStep } = featureStore;
    const {setActiveTab} = profileStore;


    const [currentListing, setCurrentListing] = useState<Listing>();
    useEffect(() => {
        if (id) loadListing(id).then(listing => setCurrentListing(listing));
    }, [id, loadListing]);

    return (
        <div>
            <Nav />
            <div style={{ display: 'flex', justifyContent: 'center', backgroundImage: "linear-gradient(to top left, #FFCEFE, #AEE2FF)" }}>
                <div className="listing-form__container" style={{ width: '65rem' }}>
                    <div className="listing-form__contents">
                        <div style={{ position: "relative", padding: '0 2.5rem 1.5rem 2.5rem' }}>
                            <ListingFormStepper step={listingFormStep} setStep={setListingFormStep} />
                            <section className="listing-form__toolbar">
                                <h1>Create listing</h1>
                            </section>
                            <section style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="listing-form__container">
                                    {currentListing &&
                                        <div>
                                            <ListingOverview listing={currentListing} />
                                            <ListingDetails listing={currentListing} />
                                        </div>
                                    }
                                </div>
                            </section>

                            <section className="media-form__buttons-container">
                                <button className="media-form__button"
                                    onClick={() => {
                                        if (listingFormStep <= 4 && listingFormStep > 0) setListingFormStep(listingFormStep - 1);
                                    }}
                                >
                                    <Link to={`/manage/${id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                        Back to details
                                    </Link>
                                </button>

                                <button className="media-form__button"
                                    onClick={() => {
                                        setActiveTab(2);
                                    }}
                                >
                                    <Link to={`/control-panel`} style={{ textDecoration: 'none', color: '#fff' }}>
                                        <span>Complete</span>
                                    </Link>
                                </button>
                            </section>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
})