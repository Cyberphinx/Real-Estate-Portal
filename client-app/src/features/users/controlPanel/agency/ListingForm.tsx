import React, { useState } from "react";
import { AccessStatus } from "../../../../app/model/AccessStatus";
import { useStore } from "../../../../app/stores/store";
import './ListingForm.css';
import * as Yup from 'yup';
import MyTextInput from "../../../../app/common/form/MyTextInput";
import { FieldArray, Form, Formik } from "formik";
import { ListingFormValues } from "../../../../app/model/ListingAggregate/Listing";
import { v4 as uuid } from 'uuid';
import MySelectInput from "../../../../app/common/form/MySelectInput";
import { countryOptions } from "../../../../app/common/form/countryOptions";
import { cookerOptions, furnishedOptions, mediaOptions, priceOptions, propertyOptions } from "../../../../app/common/form/options";
import { Category, MediaType, TransactionType } from "../../../../app/model/ListingAggregate/ListingEnums";

export default function ListingForm() {
    const { listingStore } = useStore();
    const { createListing, updateListing } = listingStore;

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
        <div className="branch-form-container">
            <Formik
                initialValues={listing}
                onSubmit={(values) => handleFormSubmit(values)}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isSubmitting, isValid, dirty, errors, values }) => (
                    <Form className="listing-form" onSubmit={handleSubmit} autoComplete="off">
                        <section>
                            <article className="listing-form-contents">
                                <p className="listing-form-title">Basic information:</p>
                                <p className="listing-form-label">Listing status:</p>
                                <MyTextInput
                                    label="Public"
                                    inputclassname=""
                                    errorclassname=""
                                    placeholder="sale"
                                    name="accessStatus"
                                    type="radio"
                                    value={AccessStatus[AccessStatus.Public]}
                                />
                                <MyTextInput
                                    label="Private"
                                    inputclassname=""
                                    errorclassname=""
                                    placeholder="rent"
                                    name="accessStatus"
                                    type="radio"
                                    value={AccessStatus[AccessStatus.Private]}
                                />
                                {/* <MySelectInput selectclassname="branch-form-select" placeholder="Listing status" name="accessStatus" options={accessOptions} /> */}
                                <p className="listing-form-label">Listing category:</p>
                                <MyTextInput
                                    label="Residential"
                                    inputclassname=""
                                    errorclassname=""
                                    placeholder="rent"
                                    name="category"
                                    type="radio"
                                    value={Category[Category.residential]}
                                />
                                <MyTextInput
                                    label="Commercial"
                                    inputclassname=""
                                    errorclassname=""
                                    placeholder="sale"
                                    name="category"
                                    type="radio"
                                    value={Category[Category.commercial]}
                                />
                                {/* <MySelectInput selectclassname="branch-form-select" placeholder="Listing category" name="category" options={channelOptions} /> */}
                                <p className="listing-form-label">Listing type:</p>
                                {/* <MySelectInput selectclassname="branch-form-select" placeholder="Listing type" name="pricing.transactionType" options={transactionOptions} /> */}
                                <MyTextInput
                                    label="Sale"
                                    inputclassname=""
                                    errorclassname=""
                                    placeholder="sale"
                                    name="pricing.transactionType"
                                    type="radio"
                                    value={TransactionType[TransactionType.sale]}
                                />
                                <MyTextInput
                                    label="Rent"
                                    inputclassname=""
                                    errorclassname=""
                                    placeholder="rent"
                                    name="pricing.transactionType"
                                    type="radio"
                                    value={TransactionType[TransactionType.rent]}
                                />
                                <p className="listing-form-label">Property type:</p>
                                <MySelectInput selectclassname="branch-form-select" placeholder="Property type" name="propertyType" options={propertyOptions} />
                                <span className="branch-form-tooltip">The basic status of the listing</span>
                            </article>
                            <article className="listing-form-contents">
                                <p className="listing-form-title">Price:</p>
                                <p className="branch-form-label">Listing price:</p>
                                <span className="branch-form-tooltip">Your unique identifier for the folder (We don't publish these, as they should be the native identifier in your system for uploading or debugging purposes)</span>
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="pricing.price" placeholder="Listing price" />
                                <p className="branch-form-label">Price qualifier:</p>
                                <MySelectInput selectclassname="branch-form-select" placeholder="status" name="pricing.priceQualifier" options={priceOptions} />
                            </article>
                            <article className="listing-form-contents">
                                <p className="listing-form-title">Address:</p>
                                <p className="branch-form-label">Listing Address: </p>
                                {/* <span className="branch-form-help">?</span> */}
                                <span className="branch-form-tooltip">The address of the local office in charge of this folder (ie. division / branch), or that of its parent company in case of a virtual office</span>
                                <div style={{ margin: "10px 0px" }}>
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="listingLocation.propertyNumberOrName" placeholder="Property number or name" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="listingLocation.streetName" placeholder="Street name" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="listingLocation.locality" placeholder="Locality" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="listingLocation.townOrCity" placeholder="Town or city" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="listingLocation.county" placeholder="County" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="listingLocation.postalCode" placeholder="Postcode" />
                                    <MySelectInput selectclassname="branch-form-select" placeholder="Country" name="listingLocation.country" options={countryOptions} />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="listingLocation.coordinates.latitude" placeholder="Latitude" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="listingLocation.coordinates.longitude" placeholder="Longitude" />
                                </div>
                            </article>
                            <article className="listing-form-contents">
                                <p className="listing-form-title">Media:</p>
                                <FieldArray
                                    name="contents"
                                    render={arrayHelpers => (
                                        <div >
                                            <p className="branch-form-label">Listing media: </p>
                                            {values.contents?.map((content, index) => (
                                                <div key={index} style={{ margin: "20px 0px" }}>
                                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`contents[${index}].id`} placeholder="id" />
                                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`contents[${index}].url`} placeholder="url" />
                                                    <MySelectInput selectclassname="branch-form-select" name={`contents[${index}].type`} placeholder="type" options={mediaOptions} />
                                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`contents[${index}].caption`} placeholder="caption" />
                                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`contents[${index}].listingId`} placeholder="listingId" />

                                                    <button type="button" onClick={() => arrayHelpers.remove(index)}> Remove media </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => arrayHelpers.push({ id: uuid(), url: '', type: MediaType.image, caption: '', listingId: '' })}> Add media </button>
                                        </div>
                                    )}
                                />
                            </article>
                            <article className="listing-form-contents">
                                <p className="listing-form-title">Description:</p>
                                <FieldArray
                                    name="detailedDescriptions"
                                    render={arrayHelpers => (
                                        <div>
                                            {values.detailedDescriptions?.map((description, index) => (
                                                <div key={index} style={{ margin: "20px 0px" }}>
                                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`detailedDescriptions[${index}].id`} placeholder="id" />
                                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`detailedDescriptions[${index}].heading`} placeholder="heading" />
                                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`detailedDescriptions[${index}].text`} placeholder="text" />
                                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`detailedDescriptions[${index}].listingId`} placeholder="listingId" />

                                                    <button type="button" onClick={() => arrayHelpers.remove(index)}> Remove description </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => arrayHelpers.push({ id: uuid(), heading: '', text: '', listingId: '' })}> Add description </button>
                                        </div>
                                    )}
                                />
                            </article>
                            <article className="listing-form-contents">
                                <p className="listing-form-title">Attributes:</p>
                                <p className="branch-form-label">Total number of bedrooms:</p>
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="totalBedrooms" placeholder="Bedrooms" />
                                <p className="branch-form-label">Bathrooms:</p>
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="bathrooms" placeholder="Bathrooms" />
                                <p className="branch-form-label">Furnished state:</p>
                                <MySelectInput selectclassname="branch-form-select" name="furnishedState" placeholder="paragraph" options={furnishedOptions} />
                                <p className="branch-form-label">Cooker type:</p>
                                <MySelectInput selectclassname="branch-form-select" name="cookerType" placeholder="Cooker type" options={cookerOptions} />
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="fridge" placeholder="fridge" type="checkbox" label="Fridge" />
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="freezer" placeholder="freezer" type="checkbox" label="Freezer" />
                            </article>
                        </section>
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