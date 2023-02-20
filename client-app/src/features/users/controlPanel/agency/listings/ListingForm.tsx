import React, { useEffect, useState } from "react";
import { useStore } from "../../../../../app/stores/store";
import './ListingForm.css';
import { history } from '../../../../../index';
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import { ListingFormValues } from "../../../../../app/model/ListingAggregate/Listing";
import { v4 as uuid } from 'uuid';
import { nanoid } from "nanoid";
import SwitchBoard from "./listingForms/SwitchBoard";
import ListingFormStepper from "./listingForms/ListingFormStepper";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../../../app/common/loading/LoadingComponent";
import Nav from "../../../../../app/layout/Nav";


export default observer(function ListingForm() {
    const { id } = useParams<string>();
    const { listingStore, profileStore, featureStore, userStore } = useStore();
    const { user, isLoggedIn } = userStore;
    const { createListing, updateListing, loadListing, loadingListing } = listingStore;
    const { userCompanies, loadingUserCompanies, loadUserCompanies, setActiveTab } = profileStore;
    const { listingFormStep, setListingFormStep, activeFeature, setActiveFeature } = featureStore;

    const [currentListingValues, setCurrentListingValues] = useState<ListingFormValues>(new ListingFormValues());

    useEffect(() => {
        if (activeFeature !== 2) setActiveFeature(2);
    }, [activeFeature, setActiveFeature])

    useEffect(() => {
        if (id) loadListing(id).then(listingValues => setCurrentListingValues(new ListingFormValues(listingValues)));
    }, [id, loadListing]);

    useEffect(() => {
        if (isLoggedIn) loadUserCompanies(user!.username);
    }, [loadUserCompanies, isLoggedIn, user]);

    function handleFormSubmit(listing: ListingFormValues) {
        if (!listing.id) {
            let newListing = {
                ...listing,
                id: uuid(),
                listingLocation: {
                    ...listing.listingLocation,
                    id: uuid(),
                },
                pricing: {
                    ...listing.pricing,
                    id: uuid()
                },
                listingReference: nanoid(10)
            };
            // setCurrentListing(newListing);
            setListingFormStep(3);
            createListing(newListing.companyId, newListing).then(() => history.push(`/add-listing-media/${newListing.id}`));
        } else {
            // setCurrentListing(listing);
            setListingFormStep(3);
            updateListing(listing).then(() => history.push(`/add-listing-media/${listing.id}`));
        }
    }

    const validationSchema = Yup.object({
        areaTotal: Yup.number().required("Approximate total floor area is required").typeError('Approximate total floor area must be a number'),
        bathrooms: Yup.number().typeError('Bathrooms must be a number'),
        companyId: Yup.string().required("Please select a branch"),
        listingLocation: Yup.object({
            postalCode: Yup.string().required("Postcode is required"),
            latitude: Yup.string().required("Latitude is required"),
            longitude: Yup.string().required("Longitude is required"),
            country: Yup.string().required("Country is required"),
        }),
        livingRooms: Yup.number().typeError('Living rooms must be a number'),
        pricing: Yup.object({
            price: Yup.string().required("Price is required")
        }),
        totalBedrooms: Yup.number().required('Bedrooms is required').typeError('Bedrooms must be a number')
    })

    return (
        <div>
            <Nav />
            <div style={{ display: 'flex', justifyContent: 'center', backgroundImage: "linear-gradient(to top left, #FFCEFE, #AEE2FF)" }}>
                <Formik
                    initialValues={currentListingValues}
                    enableReinitialize
                    onSubmit={(values) => handleFormSubmit(values)}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit, isSubmitting, isValid, dirty, errors, values, setFieldValue, setFieldTouched, getFieldMeta }) => (
                        <Form className="listing-form__container" onSubmit={handleSubmit} autoComplete="off">
                            {loadingListing ?
                                <LoadingComponent content={'Loading listing form values...'} />
                                :
                                <div className="listing-form__contents">
                                    <ListingFormStepper step={listingFormStep} setStep={setListingFormStep} values={values} dirty={dirty} />
                                    <div className="listing-form__toolbar">
                                        {id ? <h1 style={{ paddingTop: '2rem' }}>Edit listing:
                                            <span style={{ fontWeight: 'normal', color: '#6807F9', paddingLeft:'1rem'}}>{values.listingReference}</span>
                                        </h1>
                                            : <h1 style={{ paddingTop: '2rem' }}>Create listing</h1>}
                                    </div>
                                    <SwitchBoard
                                        step={listingFormStep}
                                        setStep={setListingFormStep}
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        getFieldMeta={getFieldMeta}
                                        values={values}
                                        isValid={isValid}
                                        dirty={dirty}
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
})