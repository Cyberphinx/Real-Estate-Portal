import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import "./JobInvoiceForm.css";
import { v4 as uuid } from 'uuid';
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { InvoiceItem, JobInvoiceFormValues } from "../../../app/model/Invoice";
import { NetworkDto } from "../../../app/model/Job";
import { useStore } from "../../../app/stores/store";
import { Field, FieldArray } from "formik";
import { Link } from "react-router-dom";
import PriceFormatter from "../../../app/common/PriceFormatter";


interface Props {
    values: JobInvoiceFormValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    isValid: boolean;
    isSubmitting: boolean;
}

export default observer(function JobInvoiceForm({ values, setFieldValue, isValid, isSubmitting }: Props) {
    const { jobStore } = useStore();
    const { selectedJob } = jobStore;

    const [totalNet, setTotalNet] = useState<number>();
    const [totalVat, setTotalVat] = useState<number>();

    const setTotalAmountCb = useCallback(() => {
        let totalAmount = Number(totalNet) + Number(totalVat);
        let totalRounded = parseFloat(totalAmount.toFixed(0));
        if (totalNet && totalVat) {
            setFieldValue("vatPercentage", (totalVat / totalNet) * 100);
            setFieldValue("amount", totalRounded);
        }
    }, [totalNet, totalVat, setFieldValue])

    useEffect(() => {
        if (values.items) {
            let itemsArray: InvoiceItem[] = values.items;
            let totalNetPrice: number = 0;
            let totalVatPrice: number = 0;
            itemsArray.forEach(item => {
                totalNetPrice += Number(item.amount);
                totalVatPrice += Number((item.amount * (item.vatPercentage / 100)));
            });
            setTotalNet(totalNetPrice);
            setTotalVat(totalVatPrice);
            setTotalAmountCb();
        }
    }, [values.items, setTotalNet, setTotalVat, setTotalAmountCb])



    function retrieveCustomer() {
        if (selectedJob) {
            if (selectedJob.customerName) {
                let customer = {
                    displayName: selectedJob.customerName,
                    email: selectedJob.customerEmail,
                    phone: selectedJob.customerPhone
                }
                return customer;
            } else {
                let customer: NetworkDto = selectedJob.networks.find(x => x.role.toString() === "Customer")!;
                return customer;
            }
        } else {
            return null;
        }
    }


    return (
        <div style={{ width: "60rem", padding: '0 2.5rem 1.5rem 2.5rem' }}>

            <div className="job-invoice-form__header">
                <p className="job-invoice-form__header-title" style={{ width: '10rem' }}>BILLED TO</p>
                <article style={{ width: '20rem' }}>
                    <p style={{ fontWeight: 'bold', paddingTop: '0', marginTop: '0', fontSize: '1.5rem' }}>{retrieveCustomer()?.displayName}</p>
                    <p style={{ fontSize: '1rem' }}>{selectedJob && selectedJob.jobLocations[0].displayAddress}</p>
                    <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>(Phone) {retrieveCustomer()?.phone}</p>
                    <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>(Email) {retrieveCustomer()?.email}</p>
                </article>
            </div>

            <p className="listing-forms__title">Set document type: </p>
            <section className="access-status__container">
                <button
                    className="access-status__button"
                    style={values.isQuotation ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={values.isQuotation ? true : false}
                    onClick={() => {
                        setFieldValue("isQuotation", true);
                    }}
                >Quote</button>
                <button
                    className="access-status__button"
                    style={!values.isQuotation ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={!values.isQuotation ? true : false}
                    onClick={() => {
                        setFieldValue("isQuotation", false);
                    }}
                >Invoice</button>
            </section>

            <p className="listing-forms__title">Enter {values.isQuotation ? 'quotation' : 'invoice'} title: </p>
            <MyTextInput
                inputclassname="listing-forms__input-long"
                labelclassname="listing-forms__input-label"
                errorclassname="job-invoice-form__input-error"
                name="title"
                placeholder=""
                label="Invoice title"
            />

            <p className="removals-forms__title" style={{ paddingTop: '2rem', marginBottom: '-1rem', borderTop: '3px solid #000', }}>
                Add {values.isQuotation ? 'quotation' : 'invoice'} items:
            </p>

            <section className="job-invoice-form__container">
                <FieldArray
                    name="items"
                    render={arrayHelpers => (
                        <div>
                            {values.items?.map((item, index) => (
                                <div key={index} style={{ margin: "2rem 0", paddingBottom: '4rem', borderBottom: '1px solid #c0c0c0' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <MyTextInput
                                                inputclassname="job-invoice-form__input-medium"
                                                labelclassname="listing-forms__input-label"
                                                errorclassname="job-invoice-form__input-error"
                                                name={`items[${index}].amount`}
                                                placeholder=""
                                                label="NET Price (excluding VAT)"
                                            />
                                            <i className="listing-forms__tooltip" style={{ left: "11.5rem" }}>
                                                (VAT will added on top of this amount)
                                            </i>
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <MyTextInput
                                                inputclassname="job-invoice-form__input-medium"
                                                labelclassname="listing-forms__input-label"
                                                errorclassname="job-invoice-form__input-error"
                                                name={`items[${index}].vatPercentage`}
                                                placeholder=""
                                                label="VAT percentage (%)"
                                            />
                                            <i className="listing-forms__tooltip" style={{ left: "9rem" }}>
                                                (Enter the percentage number, ie. 20)
                                            </i>
                                        </div>
                                    </div>
                                    <div style={{ position: 'relative', paddingTop: '1rem', margin: '-1rem 0 1rem 0' }}>
                                        <MyTextArea
                                            inputclassname="listing-forms__textarea-long"
                                            labelclassname="listing-forms__textarea-label"
                                            errorclassname="job-invoice-form__input-error"
                                            name={`items[${index}].description`}
                                            placeholder=""
                                            label="Description"
                                            rows={5}
                                            cols={144}
                                        />
                                        <i className="listing-forms__tooltip" style={{ top: '1.4rem', left: "5.5rem" }}>
                                            (Enter the description of the {values.isQuotation ? 'quotation' : 'invoice'} item)
                                        </i>
                                    </div>

                                    <button
                                        type="button"
                                        className="listing-forms__button-neutral"
                                        style={{ float: 'right' }}
                                        onClick={() => arrayHelpers.remove(index)}
                                    > Remove {values.isQuotation ? 'quotation' : 'invoice'} item </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="listing-forms__button-neutral"
                                style={{ marginTop: '1rem' }}
                                onClick={() => arrayHelpers.push({
                                    id: uuid(),
                                    amount: 0,
                                    currency: 'gbp',
                                    description: '',
                                    title: '',
                                    vatPercentage: 20
                                })}
                            >
                                Add new {values.isQuotation ? 'quotation' : 'invoice'} item
                            </button>
                        </div>
                    )}
                />
            </section>

            <section className="job-invoice-form__total">
                <p style={{ fontSize: '1.5rem' }}>Total NET: {totalNet ? PriceFormatter(totalNet, values.currency) : ''}</p>
                <p style={{ fontSize: '1.5rem' }}>Total VAT: {totalVat ? PriceFormatter(totalVat, values.currency) : ''}</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Total amount due: {values.amount ? PriceFormatter(values.amount, values.currency) : ''}</p>
            </section>

            {/* <p className="listing-forms__title">Enter a brief description of the job, including any significant details: </p>
            <section className="listing-forms__container">
                <MyTextArea
                    inputclassname="listing-forms__textarea-long"
                    labelclassname="listing-forms__textarea-label"
                    errorclassname="job-invoice-form__input-error"
                    placeholder=""
                    name="description"
                    label="Invoice description"
                    rows={5}
                    cols={144}
                />
            </section> */}

        </div>
    )
})