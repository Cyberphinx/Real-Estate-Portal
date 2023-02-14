import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../../../app/common/loading/LoadingComponent";
import Nav from "../../../../../app/layout/Nav";
import { Listing } from "../../../../../app/model/ListingAggregate/Listing";
import { ListingMediaDto } from "../../../../../app/model/ListingAggregate/ListingObjects";
import { useStore } from "../../../../../app/stores/store";
import ListingDetails from "../../../../listings/details/ListingDetails";
import ListingOverview from "../../../../listings/details/ListingOverview";
import ListingFormStepper from "./listingForms/ListingFormStepper";

export default observer(function ListingFormPreview() {
    const { id } = useParams<string>();
    const { listingStore: { loadListing, loadingListing }, featureStore, profileStore } = useStore();
    const { listingFormStep, setListingFormStep } = featureStore;
    const { setActiveTab } = profileStore;

    const [image, setImage] = useState<ListingMediaDto>();

    const [currentListing, setCurrentListing] = useState<Listing>();
    useEffect(() => {
        if (id) loadListing(id).then(listing => setCurrentListing(listing));
    }, [id, loadListing]);

    return (
        <div>
            <Nav />
            <div style={{ display: 'flex', justifyContent: 'center', backgroundImage: "linear-gradient(to top left, #FFCEFE, #AEE2FF)" }}>
                <div className="listing-form__container" style={{ width: '65rem' }}>
                    {loadingListing && !currentListing ?
                        <LoadingComponent content={'Loading listing form values...'} />
                        :
                        <div className="listing-form__contents">
                            <ListingFormStepper step={listingFormStep} setStep={setListingFormStep} />
                            <div className="listing-form__toolbar">
                                <h1 style={{ paddingTop: '2rem' }}>Listing preview:
                                    {id && <span style={{ fontWeight: 'normal', color: '#6807F9', paddingLeft: '1rem' }}>{currentListing?.listingReference}</span>}
                                </h1>
                            </div>

                            <div style={{margin:'auto', width:'60rem', paddingTop:'2rem' }}>
                                {currentListing &&
                                    <div>
                                        <ListingOverview listing={currentListing}  image={image} setImage={setImage} />
                                        <ListingDetails listing={currentListing} />
                                    </div>
                                }
                            </div>

                            <div className="media-form__buttons-container">
                                <button className="media-form__button"
                                    onClick={() => setListingFormStep(3)}
                                >
                                    <Link to={`/add-listing-media/${id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                        Back to media
                                    </Link>
                                </button>

                                <button className="media-form__button"
                                    onClick={() => {
                                        setActiveTab(0);
                                    }}
                                >
                                    <Link to={`/control-panel`} style={{ textDecoration: 'none', color: '#fff' }}>
                                        <span>Complete</span>
                                    </Link>
                                </button>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
})