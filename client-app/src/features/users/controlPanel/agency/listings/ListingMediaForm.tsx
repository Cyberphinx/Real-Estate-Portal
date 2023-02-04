import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../../../app/common/loading/LoadingComponent";
import MediaUploadWidget from "../../../../../app/common/mediaUpload/MediaUploadWidget";
import Nav from "../../../../../app/layout/Nav";
import { Listing } from "../../../../../app/model/ListingAggregate/Listing";
import { ListingMediaDto } from "../../../../../app/model/ListingAggregate/ListingObjects";
import { useStore } from "../../../../../app/stores/store";
import './ListingForm.css';
import ListingFormStepper from "./listingForms/ListingFormStepper";


export default observer(function ListingMediaForm() {
    const { id } = useParams<string>();
    const { listingStore: { uploadListingMedia, uploading, setMainImage, deleteMedia, loadListing, loadingListing }, featureStore } = useStore();
    const { listingFormStep, setListingFormStep } = featureStore;
    const [target, setTarget] = useState('');

    const [currentListing, setCurrentListing] = useState<Listing>();
    useEffect(() => {
        if (id) loadListing(id).then(listing => setCurrentListing(listing));
    }, [id, loadListing]);


    function handleMediaUpload(listingId: string, file: Blob) {
        uploadListingMedia(listingId, file);
    }

    function handleSetMainImage(listingId: string, media: ListingMediaDto, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainImage(listingId, media);
    }

    function handleDeleteMedia(listingId: string, media: ListingMediaDto, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deleteMedia(listingId, media);
    }

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
                                    <MediaUploadWidget loading={false} uploadMedia={handleMediaUpload} />
                                    {loadingListing && !currentListing ?
                                        <LoadingComponent content={'Loading listing form values...'} />
                                        :
                                        currentListing?.listingMedia?.map((media: ListingMediaDto) => (
                                            <div key={media.id} style={{ border: '1px solid #ccc' }}>
                                                <p>{media.id}</p>
                                                <img style={{ width: '10rem' }} src={media.url} alt="listing media" />
                                                <span>{media.isMain ? "Main image" : null}</span>
                                                <button onClick={e => handleDeleteMedia(currentListing.id, media, e)}>Delete</button>
                                                <button onClick={e => handleSetMainImage(currentListing.id, media, e)}>Set main image</button>
                                            </div>
                                        ))
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
                                        if (listingFormStep >= 0 && listingFormStep < 4) setListingFormStep(listingFormStep + 1);
                                    }}
                                ><Link to={`/preview/${id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                        <span>Continue to Preview</span>
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