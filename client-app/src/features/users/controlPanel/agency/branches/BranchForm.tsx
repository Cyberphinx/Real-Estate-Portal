import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import './BranchForm.css';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { useStore } from "../../../../../app/stores/store";
import { AccessStatus } from "../../../../../app/model/AccessStatus";
import { RedressScheme } from "../../../../../app/model/Company";
import { UnitOfTime } from "../../../../../app/model/Membership";
import MyTextInput from "../../../../../app/common/form/MyTextInput";

interface Props {
    setBranchForm: any;
}

export default observer(function BranchForm({ setBranchForm }: Props) {
    const { companyStore, userStore } = useStore();
    const { createCompany } = companyStore;
    const { user } = userStore;

    const initialValues = {
        id: uuid(),
        accessStatus: AccessStatus.Public,
        addedOn: new Date(),
        companyAddress: {
            id: uuid(),
            displayAddress: "",
            propertyNumberOrName: "",
            streetName: "",
            locality: "",
            townOrCity: "",
            county: "",
            postalCode: "",
            country: "United Kingdom",
            latitude: 0,
            longitude: 0
        },
        companyContacts: {
            id: uuid(),
            phone: "",
            email: user!.email,
            website: ""
        },
        companyContents: [],
        commpanyDescriptions: [],
        companyReference: "",
        companyRegistrationNumber: "",
        displayName: "",
        insurances: [],
        isMain: false,
        lastModified: new Date(),
        legalName: "",
        membership: {
            id: uuid(),
            companyReference: "",
            contractLength: 1,
            memberSince: new Date(),
            expiry: new Date(2050),
            description: "",
            price: 0,
            invoices: [],
            isActive: true,
            unit: UnitOfTime.Years,
            username: user!.username,
            vatPercentage: 20
        },
        jobs: [],
        redressSchems: RedressScheme.None,
        reviews: [],
        serviceLocations: "",
        summaryDescription: "",
        serviceCategories: ['Estate Agent'],
        username: user!.username,
        error: null,
    }

    const validationSchema = Yup.object({
        companyName: Yup.string().required('The company name is required!'),
        serviceCategory: Yup.string().required(),
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
                initialValues={initialValues}
                onSubmit={(values, { setErrors }) => createCompany(values).catch(error => setErrors({ error }))}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isSubmitting, isValid, dirty, errors, values }) => (
                    <Form className="branch-form" onSubmit={handleSubmit} autoComplete="off">
                        <section className="branch-form-contents">
                            <article style={{ position: "relative" }}>
                                <p className="branch-form-label">Branch name:</p>
                                {/* <span className="branch-form-help">?</span> */}
                                <span className="branch-form-tooltip">The name of the folder. This is usually the name of the company with location information, eg. "Agent - London"</span>
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="companyName" placeholder="Branch Name" />
                            </article>
                            <article style={{ position: "relative" }}>
                                <p className="branch-form-label">Branch reference:</p>
                                {/* <span className="branch-form-help">?</span> */}
                                <span className="branch-form-tooltip">Your unique identifier for the folder (We don't publish these, as they should be the native identifier in your system for uploading or debugging purposes)</span>
                                {/* <p>{values.companyReference = values.displayName.replace(/\s+/g, '-').toLowerCase()}</p> */}
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="companyReference" placeholder="Branch Reference" />
                            </article>
                            <article style={{ position: "relative" }}>
                                <p className="branch-form-label">Office Address: </p>
                                {/* <span className="branch-form-help">?</span> */}
                                <span className="branch-form-tooltip">The address of the local office in charge of this folder (ie. division / branch), or that of its parent company in case of a virtual office</span>
                                <div style={{ margin: "10px 0px" }}>
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.propertyNumberOrName" placeholder="Property number or name" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.streetName" placeholder="Street name" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.locality" placeholder="Locality" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.townOrCity" placeholder="Town or city" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.county" placeholder="County" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.postalCode" placeholder="Postcode" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.country" placeholder="Country" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.coordinates.latitude" placeholder="Latitude" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name="companyAddress.coordinates.longitude" placeholder="Longitude" />
                                </div>
                            </article>
                            <article style={{ position: "relative" }}>
                                <p className="branch-form-label">Contacts: </p>
                                {/* <span className="branch-form-help">?</span> */}
                                <span className="branch-form-tooltip">The contact details of the branch, or that of its parent company</span>
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="companyContacts.phone" placeholder="Phone" />
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="companyContacts.email" placeholder="Email" />
                                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="companyContacts.website" placeholder="Website" />
                            </article>
                        </section>
                        <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                            <span className={"button-" + (isSubmitting ? "loading" : "text")}>Submit</span>
                        </button>
                        {errors.error && <p className="submission-error">{errors.error}</p>}
                    </Form>
                )}
            </Formik>
        </div>
    )
})