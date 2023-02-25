import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import "./CreateJobInvoice.css";
import { Link, useParams } from "react-router-dom";
import { history } from "../../../index";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import Nav from "../../../app/layout/Nav";
import { JobInvoiceFormValues } from "../../../app/model/Invoice";
import { useStore } from "../../../app/stores/store";
import { PaymentStatus } from "../../../app/model/PaymentStatus";
import JobInvoiceForm from "./JobInvoiceForm";

export default observer(function CreateJobInvoice() {
    const { jobId } = useParams<string>();
    const { jobInvoiceStore, userStore, jobStore, profileStore } = useStore();
    const { createInvoice } = jobInvoiceStore;
    const { isLoggedIn, user } = userStore;
    const { loadJobWithLeads, selectedJob, loadingJob } = jobStore;
    const { loadHeadquarter, loadingProfile, headquarter } = profileStore;

    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (isLoggedIn && user) loadHeadquarter(user.username);
    }, [isLoggedIn, user, loadHeadquarter])


    useEffect(() => {
        if (jobId) loadJobWithLeads(jobId).then(values => {
            if (values) setTitle(values.title);
        });
    }, [jobId, loadJobWithLeads])

    const initialValues = {
        id: uuid(),
        amount: 0,
        currency: 'gbp',
        description: '',
        invoiceDate: new Date(),
        index: 0,
        isQuotation: false,
        items: [],
        paymentStatus: PaymentStatus.InProgress,
        title: title,
        vatPercentage: 20,
        jobId: jobId!
    }

    function handleFormSubmit(invoice: JobInvoiceFormValues) {
        if (jobId) createInvoice(invoice, jobId).then(() => history.push(`/control-panel`));
    }

    const validation = () => {
        if (isLoggedIn) {
            let publicValidationSchema = Yup.object({
                amount: Yup.number().required("Invoice amount is required").typeError("Amount must be a number")
            });
            return publicValidationSchema;
        } else {
            let validationSchema = Yup.object({
                amount: Yup.number().required("Invoice amount is required").typeError("Amount must be a number")
            });
            return validationSchema;
        }
    }

    const address = `${headquarter?.companyAddress.propertyNumberOrName && (headquarter?.companyAddress.propertyNumberOrName + ", ")}
    ${headquarter?.companyAddress.streetName && (headquarter?.companyAddress.streetName + ", ")}
    ${headquarter?.companyAddress.locality && (headquarter?.companyAddress.locality + ", ")}
    ${headquarter?.companyAddress.townOrCity && (headquarter?.companyAddress.townOrCity + ", ")}
    ${headquarter?.companyAddress.county && (headquarter?.companyAddress.county + ", ")}
    ${headquarter?.companyAddress.postalCode && (headquarter?.companyAddress.postalCode)}
    `;

    return (
        <div>
            <Nav />
            <div style={{ display: 'flex', justifyContent: 'center', backgroundImage: "linear-gradient(to top left, #FFCEFE, #AEE2FF)" }}>
                {loadingJob || !selectedJob ? <LoadingComponent content={"Loading invoice creation page..."} />
                    : <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={(values) => handleFormSubmit(values)}
                        validationSchema={validation}
                    >
                        {({ handleSubmit, isSubmitting, isValid, values, setFieldValue }) => (
                            <Form onSubmit={handleSubmit} autoComplete="off">
                                <div className="removals-form__contents">
                                    <div className="listing-form__toolbar">
                                        <h1 style={{ paddingTop: '2rem' }}>Create {values.isQuotation ? 'quotation' : 'invoice'}</h1>
                                    </div>
                                    <JobInvoiceForm
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        isValid={isValid}
                                        isSubmitting={isSubmitting}
                                    />
                                    <div style={{ width: "60rem", padding: '0 2.5rem 1.5rem 2.5rem', margin: '0' }}>
                                        {loadingProfile || !headquarter
                                            ? <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Loading company details...</p>
                                            : <>
                                                <div className="job-invoice-form__company-info">
                                                    <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{headquarter?.legalName}</p>
                                                    <p>Company Number {headquarter.companyRegistrationNumber}</p>
                                                    <p>VAT Number {headquarter.vatNumber}</p>
                                                </div>
                                                <div className="job-invoice-form__footer">
                                                    <article>
                                                        <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Questions?</p>
                                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                                            <section style={{ width: '5rem' }}>
                                                                <p>Email us: </p>
                                                                <p>Call us: </p>
                                                                <p>Address: </p>
                                                            </section>
                                                            <section>
                                                                <p>{headquarter.companyContacts.email}</p>
                                                                <p>{headquarter.companyContacts.phone}</p>
                                                                <p>{address}</p>
                                                            </section>
                                                        </div>
                                                    </article>
                                                    <article style={{ borderLeft: '1px solid #ccc', paddingLeft: '2.5rem' }}>
                                                        <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Terms & Conditions / Insurance:</p>
                                                        <div style={{ display: 'grid', gridTemplateRows: '2rem 2rem' }}>
                                                            <a
                                                                href={headquarter.termsAndConditions}
                                                                target="_blank" >
                                                                Click to view terms & conditions
                                                            </a>
                                                            <a
                                                                href={headquarter.insurances.find(x => x.index === 0)?.insurancePolicy}
                                                                target="_blank" >
                                                                Click to view insurance policy
                                                            </a>
                                                        </div>
                                                    </article>
                                                </div>
                                            </>
                                        }
                                        <section className="removals-forms__buttons-container" style={{ paddingTop: '4rem' }}>
                                            <button
                                                type="button"
                                                className="removals-forms__button"
                                            ><Link to={"/control-panel"} style={{ color: '#fff', textDecoration: 'none' }}>Cancel</Link></button>
                                            <button
                                                className="removals-forms__button"
                                                disabled={!isValid || isSubmitting}
                                                type="submit">
                                                <span style={isSubmitting ? { visibility: 'hidden' } : {}}>Submit</span>
                                                {isSubmitting && <span className="removals-forms__submitting" />}
                                            </button>
                                        </section>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>}
            </div>
        </div>
    )
})