import React, { useState } from "react";
import { useStore } from "../../../../../app/stores/store";
import './ListingForm.css';
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import { ListingFormValues } from "../../../../../app/model/ListingAggregate/Listing";
import { v4 as uuid } from 'uuid';
import SwitchBoard from "./listingForms/SwitchBoard";
import ListingFormStepper from "./listingForms/ListingFormStepper";

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
        areasTotal: Yup.number().typeError('Approximate floor area must be a number'),
        companyReference: Yup.string().required("Company reference is required"),
        listingLocation: Yup.object({
            postalCode: Yup.string().required("Postcode is required"),
            latitude: Yup.string().required("Latitude is required"),
            longitude: Yup.string().required("Longitude is required"),
            country: Yup.string().required("Country is required"),
        }),
        pricing: Yup.object({
            price: Yup.string().required("Price is required")
        }),
        totalBedrooms: Yup.number().required('Bedrooms is required').typeError('Bedrooms must be a number')
    })

    return (
        <Formik
            initialValues={listing}
            onSubmit={(values) => handleFormSubmit(values)}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty, errors, values, setFieldValue, setFieldTouched, getFieldMeta }) => (
                <Form className="listing-form__container" onSubmit={handleSubmit} autoComplete="off">
                    <div className="listing-form__toolbar">
                        <p className="listing-form__title"><span className="listing-form__portfolio"
                            onClick={() => setActivePane(0)}>Portfolio</span> &#x203A; Create listing</p>
                    </div>

                    <div className="listing-form__contents">
                        <ListingFormStepper step={step} setStep={setStep} />
                        <SwitchBoard
                            step={step}
                            setStep={setStep}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            getFieldMeta={getFieldMeta}
                            values={values}
                            isValid={isValid}
                            dirty={dirty}
                            isSubmitting={isSubmitting}
                            setActivePane={setActivePane}
                        />
                    </div>
                    {/* {errors.error && <p className="submission-error">{errors.error}</p>} */}
                </Form>
            )}
        </Formik>
    )
}