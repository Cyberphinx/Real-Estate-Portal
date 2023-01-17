import React, { useEffect, useState } from "react";
import { useStore } from "../../../../../app/stores/store";
import './ListingForm.css';
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import { ListingFormValues } from "../../../../../app/model/ListingAggregate/Listing";
import { v4 as uuid } from 'uuid';
import SwitchBoard from "./SwitchBoard";
import { GeoSearchControl, LocationIQProvider } from "leaflet-geosearch";
import L from "leaflet";

interface Props {
    setActivePane: (value: number) => void;
}

export default function ListingForm({ setActivePane }: Props) {
    const { listingStore } = useStore();
    const { createListing, updateListing } = listingStore;

    const [step, setStep] = useState<number>(0);
    const [listing, setListing] = useState<ListingFormValues>(new ListingFormValues());

    function handleFormSubmit(listing: ListingFormValues) {
        if (!listing.id) {
            let newListing = {
                ...listing,
                id: uuid(),
            };
            setListing(newListing);
            createListing(newListing);
            console.log(newListing);
        } else {
            setListing(listing);
            updateListing(listing);
            console.log(listing);
        }
    }

    const validationSchema = Yup.object({
        companyName: Yup.string().required('The company name is required!'),
        serviceCategory: Yup.number().required(),
        companyAddress: Yup.object().shape({
            postalCode: Yup.string().required("The postcode is required"),
        }),
        companyContacts: Yup.object().shape({
            email: Yup.string().required("The email is required").email(),
            phone: Yup.string().required("The phone is required"),
        })
    })



    return (
        <div className="agent-listings">

            <div className="watchlist-toolbar">
                <p className="watchlist-title"><span className="breadcrumb"
                    onClick={() => setActivePane(0)}>Property listings</span> / <span>Create listing</span></p>
                <section className="watchlist-button-container">
                    <button className="watchlist-button-active"
                        onClick={() => setStep(0)}>Location</button>
                    <button className="watchlist-button"
                        onClick={() => setStep(1)}>Basic information</button>
                    <button className="watchlist-button"
                        onClick={() => setStep(2)}>Details</button>
                    <button className="watchlist-button"
                        onClick={() => setStep(3)}>Media</button>
                    <button className="agent-listing-master-button" onClick={() => setActivePane(0)}>Back</button>
                </section>
            </div>

            <Formik
                initialValues={listing}
                onSubmit={(values) => handleFormSubmit(values)}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isSubmitting, isValid, dirty, errors, values, setFieldValue, setFieldTouched, getFieldMeta }) => (
                    <Form className="listing-form" onSubmit={handleSubmit} autoComplete="off">
                        <SwitchBoard step={step} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched}
                            getFieldMeta={getFieldMeta} values={values} />
                        <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                            <span className={"button-" + (isSubmitting ? "loading" : "text")}>Submit</span>
                        </button>
                        {/* {errors.error && <p className="submission-error">{errors.error}</p>} */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}