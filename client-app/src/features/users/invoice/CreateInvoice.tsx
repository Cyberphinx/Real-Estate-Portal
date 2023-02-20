import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import Nav from "../../../app/layout/Nav";
import { useStore } from "../../../app/stores/store";

export default observer(function CreateInvoice() {
    const { id } = useParams<string>();
    const { invoiceStore } = useStore();
    const { loadingInvoice } = invoiceStore;

    const [currentInvoiceValues, setCurrentInvoiceValues] = useState<InvoiceFormValues>(new InvoiceFormValues());

    return (
        <div>
            <Nav />
            <div style={{ display: 'flex', justifyContent: 'center', backgroundImage: "linear-gradient(to top left, #FFCEFE, #AEE2FF)" }}>
                <Formik
                    initialValues={initialValues()}
                    enableReinitialize
                    onSubmit={(values) => handleFormSubmit(values)}
                    validationSchema={validation}
                >
                    {({ handleSubmit, isSubmitting, isValid, values, setFieldValue }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            {loadingInvoice ?
                                <LoadingComponent content={'Loading listing form values...'} />
                                :
                                <div className="removals-form__contents">
                                    <div className="listing-form__toolbar">
                                        {id ? <h1 style={{ paddingTop: '2rem' }}>Edit moving company booking:
                                            <span style={{ fontWeight: 'normal', color: '#6807F9', paddingLeft: '1rem' }}>{values.jobReference}</span>
                                        </h1>
                                            : <h1 style={{ paddingTop: '2rem' }}>Book moving company</h1>}
                                    </div>
                                    <RemovalsJobForm
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        step={removalsJobFormStep}
                                        setStep={setRemovalsJobFormStep}
                                        isValid={isValid}
                                        isSubmitting={false}
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