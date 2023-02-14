import React, { useEffect, useState } from "react";
import './ListingForm.css';
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../../../app/common/loading/LoadingComponent";
import Nav from "../../../../../app/layout/Nav";
import { ListingMediaDto } from "../../../../../app/model/ListingAggregate/ListingObjects";
import { useStore } from "../../../../../app/stores/store";
import ListingFormStepper from "./listingForms/ListingFormStepper";
import MediaUploadSimple from "../../../../../app/common/mediaUpload/MediaUploadSimple";


export default observer(function ListingMediaForm() {
    const { id } = useParams<string>();
    const { listingStore, featureStore } = useStore();
    const { uploadListingMedia, setMainImage, deleteMedia, loadListing, loadingListing,
        currentListing, setCurrentListing, loading, uploading, files } = listingStore;
    const { listingFormStep, setListingFormStep } = featureStore;

    const [clicked, setClicked] = useState<string>('')

    useEffect(() => {
        if (id) loadListing(id).then(listing => setCurrentListing(listing!));
        if (listingFormStep !== 3) setListingFormStep(3);
    }, [id, loadListing, listingFormStep, setCurrentListing]);


    function handleMediaUpload(listingId: string, file: Blob) {
        uploadListingMedia(listingId, file);
    }

    function handleSetMainImage(listingId: string, media: ListingMediaDto) {
        setClicked(media.id);
        setMainImage(listingId, media);
    }

    function handleDeleteMedia(listingId: string, media: ListingMediaDto) {
        setClicked(media.id);
        deleteMedia(listingId, media);
    }

    const n = 8;

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
                                <h1 style={{ paddingTop: '2rem' }}>Upload media:
                                    {id && <span style={{ fontWeight: 'normal', color: '#6807F9', paddingLeft: '1rem' }}>{currentListing?.listingReference}</span>}
                                </h1>
                            </div>

                            <div className='listing-media__container'>
                                <div style={currentListing?.listingMedia && currentListing.listingMedia.length > 0 ? { borderBottom: '1px solid DimGray', padding: '1rem 0' } : { padding: '1rem 0' }}>
                                    <MediaUploadSimple uploadMedia={handleMediaUpload} />
                                </div>

                                {currentListing && currentListing.listingMedia.length > 0 ? currentListing.listingMedia.map((media: ListingMediaDto) => (
                                    <div key={media.id} className='listing-media__item'>
                                        <img style={{ width: '13rem', height: '13rem', objectFit: 'cover', borderRadius: '1rem' }}
                                            src={media.url} alt="listing media" />
                                        {media.isMain && <span className="listing-media__main-label">Cover image</span>}
                                        {/* <span className="listing-media__main-label">{media.index}</span> */}
                                        {loading && clicked === media.id && <span className="media-form__submitting" />}
                                        <button
                                            className="listing-media__item-button"
                                            style={{ bottom: '2.5rem' }}
                                            onClick={() => handleSetMainImage(currentListing!.id, media)}
                                        >Make cover image</button>
                                        <button
                                            className="listing-media__item-button"
                                            onClick={() => handleDeleteMedia(currentListing!.id, media)}
                                        >Delete image</button>
                                    </div>
                                ))
                                    : <div>
                                        <p>Include 10 to 15 accurate photos of high quality in the same orientation, showing a variety of different rooms. Make sure that they're clear, clutter free and a good representation of the property.</p>
                                    </div>
                                }
                                {/* {uploading && <div className='listing-media__item' style={{ background: '#f5f5f5', borderRadius: '1rem' }}>
                                    <span className="media-form__submitting" />
                                    <p style={{ textAlign: 'center', paddingTop: '8rem', }}>Uploading...</p>
                                </div>} */}
                                {uploading && files.length > 0 && [...Array(files.length)].map((element: any, index: number) => (
                                    <div key={index} className='listing-media__item' style={{ background: '#f5f5f5', borderRadius: '1rem' }}>
                                        <span className="media-form__submitting" />
                                        <p style={{ textAlign: 'center', paddingTop: '8rem', }}>Uploading...</p>
                                    </div>
                                ))}
                            </div>

                            <div className="media-form__buttons-container">
                                <button className="media-form__button"
                                    onClick={() => setListingFormStep(2)}
                                ><Link to={`/manage/${id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                        Back to details
                                    </Link>
                                </button>

                                <button className="media-form__button"
                                    onClick={() => setListingFormStep(4)}
                                ><Link to={`/preview/${id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                        <span>Continue to Preview</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
})