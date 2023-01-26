import { Field } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "../../../../../../app/common/form/DateInput";
import MultiSelect from "../../../../../../app/common/form/MultiSelect";
import MyTextArea from "../../../../../../app/common/form/MyTextArea";
import MyTextInput from "../../../../../../app/common/form/MyTextInput";
import { councilTaxBandOptions, eligibilityOptions, frequencyOptions, priceOptions, rentalTermOptions, rentLifecycleOptions, saleLifecycleOptions, tenureOptions, unitOfAreaOptions, unitOfTimeOptions, utilityOptions } from "../../../../../../app/common/form/options";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import { Category, TransactionType, Utility } from "../../../../../../app/model/ListingAggregate/ListingEnums";
import './BasicInfo.css';

interface Props {
    step: number;
    setStep: (value: number) => void;
    setActivePane: (value: number) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    getFieldMeta: any;
    values: ListingFormValues;
}

export default observer(function BasicInfo({ step, setStep, values, setActivePane, setFieldValue, getFieldMeta }: Props) {
    const channel: number = Number(values.pricing?.transactionType);
    const tenure: number = Number(values.tenure);
    const term: number = Number(values.rentalTerm);
    const category: number = Number(values.category);

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div style={{ width: "60rem" }}>
            <p className="basic-info__title">Choose listing category: </p>
            <section className="category__container">
                <button
                    className="category__button"
                    style={category === 1 ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={category === 1 ? true : false}
                    onClick={() => {
                        setFieldValue("category", Category.residential);
                    }}
                >Residential</button>
                <button
                    className="category__button"
                    style={category === 0 ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={category === 0 ? true : false}
                    onClick={() => {
                        setFieldValue("category", Category.commercial);
                    }}
                >Commercial</button>
            </section>

            <p className="basic-info__title">Enter pricing information: </p>
            <section className="channel__container">
                <button
                    className="channel__button"
                    style={channel === 0 ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={channel === 0 ? true : false}
                    onClick={() => {
                        setFieldValue("pricing.transactionType", TransactionType.rent);
                    }}
                >For Rent</button>
                <button
                    className="channel__button"
                    style={channel === 1 ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={channel === 1 ? true : false}
                    onClick={() => {
                        setFieldValue("pricing.transactionType", TransactionType.sale);
                    }}
                >For Sale</button>
            </section>

            <section className="basic-info__container">
                <MyTextInput
                    inputclassname={channel === 0 ? "basic-info__input-s" : "basic-info__input-style"}
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="pricing.price"
                    placeholder=""
                    label={`Price - ${channel === 0 ? 'Rent' : 'Sale'} (£)`}
                />
                <div style={channel === 0 ? { position: "relative" } : { position: "relative", display: 'none' }}>
                    <span className="basic-info__select-label">Rent frequency</span>
                    <Field
                        as="select"
                        name="pricing.rentFrequency"
                        className='basic-info__select-s'
                    >
                        {frequencyOptions.map((item: any) => (
                            <option key={item.value} value={item.value}>{item.text}</option>
                        ))}
                    </Field>
                </div>
                <div style={channel === 0 ? { position: "relative", display: 'none' } : { position: "relative" }}>
                    <span className="basic-info__select-label">Price qualifier</span>
                    <Field
                        as="select"
                        name="pricing.priceQualifier"
                        className='basic-info__select-style'
                    >
                        {priceOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
                <div style={channel === 0 ? { position: "relative" } : { position: "relative", display: 'none' }}>
                    <span className="details__select-label">Rental term</span>
                    <Field
                        as="select"
                        name="rentalTerm"
                        className='basic-info__select-s'
                    >
                        {rentalTermOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
                <MyTextInput
                    inputclassname="basic-info__input-style"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="administrationFees"
                    placeholder=""
                    label="Administration fees (£)"
                />
                {channel === 0 && <MyTextInput
                    inputclassname="basic-info__input-style"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="deposit"
                    placeholder=""
                    label="Deposit (£)"
                />}
                {channel === 0 &&
                    <>
                        <div style={{ position: 'relative' }}>
                            <MyTextInput
                                inputclassname="basic-info__input-style"
                                labelclassname="basic-info__input-label"
                                errorclassname="basic-info__input-error"
                                name="minimumContractLength"
                                placeholder=""
                                label={term === 0 ? `Contract length` : `Minimum contract length`}
                            />
                        </div>
                        <div style={{ position: "relative" }}>
                            <span className="basic-info__select-label">Contract length unit</span>
                            <Field
                                as="select"
                                name="minimumContractLengthUnits"
                                className='basic-info__select-style'
                            >
                                {unitOfTimeOptions.map((item: any) => (
                                    <option key={item.value} value={item.value} >{item.text}</option>
                                ))}
                            </Field>
                        </div>
                    </>}
            </section>

            <div style={channel === 0 ? { display: 'none' } : { padding: '1rem' }}>
                <Field type="checkbox" name="pricing.auction" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                <span style={{ paddingLeft: '0.75rem', fontSize: "1.15rem" }}>Tick this box for sale by <b>auction</b></span>
            </div>

            <p className="basic-info__title">Enter availability information: </p>
            <section className="basic-info__container">

                <div style={{ position: "relative" }}>
                    <span className="basic-info__select-label" style={{}}>Listing lifecycle status</span>
                    <Field
                        as="select"
                        name="lifeCycleStatus"
                        className='basic-info__select-style'
                    >
                        {channel === 0 ? rentLifecycleOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))
                            : saleLifecycleOptions.map((item: any) => (
                                <option key={item.value} value={item.value} >{item.text}</option>
                            ))
                        }
                    </Field>
                    <i style={{
                        fontSize: "0.875rem", color: "#505050",
                        position: "absolute", zIndex: "1", top: "0.2rem", left: "10rem"
                    }}>
                        (please ensure this is always up-to-date)
                    </i>
                </div>
            </section>

            <section className="basic-info__container">
                <div style={{ position: "relative" }}>
                    <span className='basic-info__input-label' >Open day</span>
                    <DateInput
                        placeholderText=''
                        name='openDay'
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy'
                    />
                </div>
                <div style={{ position: "relative" }}>
                    <span className='basic-info__input-label' >Available from date</span>
                    <DateInput
                        placeholderText=''
                        name='availableFromDate'
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy'
                    />
                </div>
            </section>



            {channel === 0 && <>
                <p className="details__title">Enter {category === 1 ? 'tenancy information' : 'bills included'}: </p>
                {category === 1 &&
                    <>
                        <section className="basic-info__container" style={{ display: 'grid', paddingTop: '1rem' }} >
                            <div style={{ padding: '1rem' }}>
                                <Field type="checkbox" name="petsAllowed" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                                <span style={{ paddingLeft: '0.75rem', fontSize: "1.15rem" }}>Pets allowed</span>
                            </div>
                            <div style={{ padding: '0 1rem 1rem 1rem' }}>
                                <Field type="checkbox" name="smokersConsidered" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                                <span style={{ paddingLeft: '0.75rem', fontSize: "1.15rem" }}>Smokers considered</span>
                            </div>
                        </section>
                        <section className="details__container" style={{ paddingTop: '1rem' }}>
                            <div style={{ position: "relative" }}>
                                <span className="details__select-label">DSS tenants</span>
                                <Field
                                    as="select"
                                    name="tenantEligibilityDss"
                                    className='details__select-s'
                                >
                                    {eligibilityOptions.map((item: any) => (
                                        <option key={item.value} value={item.value} >{item.text}</option>
                                    ))}
                                </Field>
                            </div>
                            <div style={{ position: "relative" }}>
                                <span className="details__select-label">Students</span>
                                <Field
                                    as="select"
                                    name="tenantEligibilityStudents"
                                    className='details__select-s'
                                >
                                    {eligibilityOptions.map((item: any) => (
                                        <option key={item.value} value={item.value} >{item.text}</option>
                                    ))}
                                </Field>
                            </div>
                        </section>
                    </>}
                <div style={{ paddingTop: '1rem' }} >
                    <MultiSelect
                        setFieldValue={setFieldValue}
                        fieldName={"billsIncluded"}
                        fieldValues={values.billsIncluded}
                        enumType={Utility}
                        options={utilityOptions}
                        label={"Bills included"}
                    />
                </div>
            </>}

            {channel === 0 ? null :
                <>
                    <p className="basic-info__title">Enter tenure information: </p>
                    <section className="basic-info__container">
                        <div style={{ position: "relative" }}>
                            <span className="basic-info__select-label">Tenure</span>
                            <Field
                                as="select"
                                name="tenure"
                                className='basic-info__select-style'
                            >
                                {tenureOptions.map((item: any) => (
                                    <option key={item.value} value={item.value} >{item.text}</option>
                                ))}
                            </Field>
                        </div>
                        {tenure === 1 ? null :
                            <>
                                <div style={{ position: 'relative' }}>
                                    <MyTextInput
                                        inputclassname="basic-info__input-style"
                                        labelclassname="basic-info__input-label"
                                        errorclassname="basic-info__input-error"
                                        name="leaseExpiry"
                                        placeholder=""
                                        label="Lease expiry"
                                    />
                                    <i className="listing-location__tooltip" style={{ left: "6.25rem" }}>
                                        (years remaining)
                                    </i>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <MyTextInput
                                        inputclassname="basic-info__input-style"
                                        labelclassname="basic-info__input-label"
                                        errorclassname="basic-info__input-error"
                                        name="groundRent"
                                        placeholder=""
                                        label="Ground rent (£)"
                                    />
                                    <i className="listing-location__tooltip" style={{ left: "7.5rem" }}>
                                        (per year)
                                    </i>
                                </div>
                                <div style={{ position: "relative" }}>
                                    <MyTextInput
                                        inputclassname="basic-info__input-style"
                                        labelclassname="basic-info__input-label"
                                        errorclassname="basic-info__input-error"
                                        name="groundRentReviewPeriod"
                                        placeholder=""
                                        label="Ground rent review period"
                                    />
                                    <i className="listing-location__tooltip" style={{ left: "12rem" }}>
                                        (How often would it be reviewed?)
                                    </i>
                                </div>

                            </>}
                    </section>

                    <section style={{ fontSize: "1.125rem", margin: '1.5rem 1rem' }}>
                        <Field type="checkbox" name="serviceCharge.applicable" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                        <span style={{ paddingLeft: '0.75rem' }}>Tick this box if there is <b>service charge</b></span>
                    </section>

                    <section className="basic-info__container" style={values.serviceCharge?.applicable ? {} : { display: "none" }}>
                        <MyTextInput
                            inputclassname="basic-info__input-style"
                            labelclassname="basic-info__input-label"
                            errorclassname="basic-info__input-error"
                            name="serviceCharge.charge"
                            placeholder=""
                            label="Service charge rate"
                        />
                        <div style={{ position: "relative" }}>
                            <span className="basic-info__select-label">Service charge unit of area</span>
                            <Field
                                as="select"
                                name="serviceCharge.perUnitAreaUnits"
                                className='basic-info__select-style'
                            >
                                {unitOfAreaOptions.map((item: any) => (
                                    <option key={item.value} value={item.value} >{item.text}</option>
                                ))}
                            </Field>
                        </div>
                        <div style={{ position: "relative" }}>
                            <span className="basic-info__select-label">Service charge payment frequency</span>
                            <Field
                                as="select"
                                name="serviceCharge.frequency"
                                className='basic-info__select-style'
                            >
                                {frequencyOptions.map((item: any) => (
                                    <option key={item.value} value={item.value} >{item.text}</option>
                                ))}
                            </Field>
                        </div>
                        <div style={{ position: "relative" }}>
                            <MyTextInput
                                inputclassname="basic-info__input-style"
                                labelclassname="basic-info__input-label"
                                errorclassname="basic-info__input-error"
                                name="serviceCharge.reviewPeriod"
                                placeholder=""
                                label="Service charge review period"
                            />
                            <i className="listing-location__tooltip" style={{ left: "13rem" }}>
                                (How often would it be reviewed?)
                            </i>
                        </div>
                    </section>
                </>}

            <p className="basic-info__title">Enter council tax or rates information: </p>
            <section className="basic-info__container">
                <div style={{ position: "relative" }}>
                    <span className="basic-info__select-label">Council tax band</span>
                    <Field
                        as="select"
                        name="councilTaxBand"
                        className='basic-info__select-style'
                    >
                        {councilTaxBandOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                    <i className="listing-location__tooltip" style={{ left: "8rem" }}>
                        (England, Wales & Scotland only)
                    </i>
                </div>
                <div style={{ position: "relative" }}>
                    <MyTextInput
                        inputclassname="basic-info__input-style"
                        labelclassname="basic-info__input-label"
                        errorclassname="basic-info__input-error"
                        name="ratesPayable"
                        placeholder=""
                        label="Rates payable"
                    />
                    <i className="listing-location__tooltip" style={{ left: "7rem" }}>
                        (Northern Ireland only)
                    </i>
                </div>
            </section>

            <p className="basic-info__title">Enter a brief description of the property: </p>
            <section className="basic-info__container">
                <MyTextArea
                    inputclassname="basic-info__textarea-style"
                    labelclassname="basic-info__textarea-label"
                    errorclassname="basic-info__input-error"
                    placeholder=""
                    name="summaryDescription"
                    label="Summary description"
                    rows={5}
                    cols={144}
                />
            </section>

            <section className="basic-info__buttons-container">
                <button className="basic-info__button"
                    onClick={() => {
                        if (step <= 4 && step > 0) setStep(step - 1);
                    }}
                    type="button">
                    <span>Back to address</span>
                </button>
                <button className="basic-info__button"
                    onClick={() => {
                        if (step >= 0 && step < 4) setStep(step + 1);
                    }}
                    type="button">
                    <span>Continue to details</span>
                </button>
            </section>
        </div>
    )
})