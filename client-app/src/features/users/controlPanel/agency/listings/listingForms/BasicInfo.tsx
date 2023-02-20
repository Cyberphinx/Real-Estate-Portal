import { Field } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "../../../../../../app/common/form/DateInput";
import MultiSelect from "../../../../../../app/common/form/MultiSelect";
import MyTextArea from "../../../../../../app/common/form/MyTextArea";
import MyTextInput from "../../../../../../app/common/form/MyTextInput";
import {
    councilTaxBandOptions, eligibilityOptions, frequencyOptions, priceOptions,
    rentalTermOptions, rentLifecycleOptions, saleLifecycleOptions, tenureOptions,
    unitOfAreaOptions, unitOfTimeOptions, utilityOptions
} from "../../../../../../app/common/form/options";
import { AccessStatus } from "../../../../../../app/model/AccessStatus";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import { Category, TransactionType, Utility } from "../../../../../../app/model/ListingAggregate/ListingEnums";
import { UserCompanyDto } from "../../../../../../app/model/Profile";
import { useStore } from "../../../../../../app/stores/store";
import './ListingForms.css';

interface Props {
    step: number;
    setStep: (value: number) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    values: ListingFormValues;
}

export default observer(function BasicInfo({ step, setStep, values, setFieldValue }: Props) {
    const { profileStore } = useStore();
    const { userCompanies, loadingUserCompanies } = profileStore;

    const channel: number = Number(values.pricing?.transactionType);
    const forRent: boolean = (channel === 0 || values.pricing.transactionType.toString() === "Rent");
    const tenure: number = Number(values.tenure);
    const term: number = Number(values.rentalTerm);
    const category: number = Number(values.category);

    return (
        <div style={{ width: "60rem", padding: '0 2.5rem 1.5rem 2.5rem' }}>

            <p className="listing-forms__title">Select branch: </p>
            <div style={{ position: "relative" }}>
                <span className="listing-forms__select-label">Upload branch</span>
                <Field
                    as="select"
                    name="companyId"
                    className='listing-forms__select-medium'
                >
                    <option value="" > -- select a branch -- </option>
                    {loadingUserCompanies ? <option value=""> Loading branches... </option>
                        : userCompanies.map((company: UserCompanyDto) => (
                            <option key={company.id} value={company.id} >
                                {company.displayName} ({company.companyReference})
                            </option>
                        ))}
                </Field>
            </div>

            <p className="listing-forms__title">Select status: </p>
            <div style={{ position: "relative" }}>
                <span className="listing-forms__select-label" style={{}}>Listing lifecycle status</span>
                <Field
                    as="select"
                    name="lifeCycleStatus"
                    className='listing-forms__select-medium'
                >
                    {forRent ? rentLifecycleOptions.map((item: any) => (
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

            <p className="listing-forms__title">Set publishing status: </p>
            <section className="access-status__container">
                <button
                    className="access-status__button"
                    style={values.accessStatus === 0 || values.accessStatus.toString() === "Private" ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={values.accessStatus === 0 ? true : false}
                    onClick={() => {
                        setFieldValue("accessStatus", AccessStatus.Private);
                    }}
                >Private</button>
                <button
                    className="access-status__button"
                    style={values.accessStatus === 1 || values.accessStatus.toString() === "Public" ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={values.accessStatus === 1 ? true : false}
                    onClick={() => {
                        setFieldValue("accessStatus", AccessStatus.Public);
                    }}
                >Public</button>
            </section>

            <p className="listing-forms__title">Choose listing category: </p>
            <section className="category__container">
                <button
                    className="category__button"
                    style={category === 1 || values.category?.toString() === "Residential" ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={category === 1 || values.category?.toString() === "Residential" ? true : false}
                    onClick={() => {
                        setFieldValue("category", Category.residential);
                    }}
                >Residential</button>
                <button
                    className="category__button"
                    style={category === 0 || values.category?.toString() === "Commercial" ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={category === 0 || values.category?.toString() === "Commercial" ? true : false}
                    onClick={() => {
                        setFieldValue("category", Category.commercial);
                    }}
                >Commercial</button>
            </section>
            <p className="listing-forms__title">Enter pricing information: </p>
            <section className="channel__container">
                <button
                    className="channel__button"
                    style={forRent ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                    type="button"
                    disabled={forRent ? true : false}
                    onClick={() => {
                        setFieldValue("pricing.transactionType", TransactionType.rent);
                    }}
                >For Rent</button>
                <button
                    className="channel__button"
                    style={forRent ? {} : { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" }}
                    type="button"
                    disabled={forRent ? false : true}
                    onClick={() => {
                        setFieldValue("pricing.transactionType", TransactionType.sale);
                    }}
                >For Sale</button>
            </section>

            <section className="listing-forms__container">
                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="pricing.price"
                    placeholder=""
                    label={`Price - ${forRent ? 'Rent' : 'Sale'} (£)`}
                />
                <div style={forRent ? { position: "relative" } : { position: "relative", display: 'none' }}>
                    <span className="listing-forms__select-label">Rent frequency</span>
                    <Field
                        as="select"
                        name="pricing.rentFrequency"
                        className='listing-forms__select-medium'
                    >
                        {frequencyOptions.map((item: any) => (
                            <option key={item.value} value={item.value}>{item.text}</option>
                        ))}
                    </Field>
                </div>
                <div style={forRent ? { position: "relative", display: 'none' } : { position: "relative" }}>
                    <span className="listing-forms__select-label">Price qualifier</span>
                    <Field
                        as="select"
                        name="pricing.priceQualifier"
                        className='listing-forms__select-medium'
                    >
                        {priceOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>

            {forRent &&
                <section className="listing-forms__container">
                    <div style={{ position: 'relative' }}>
                        <MyTextInput
                            inputclassname="listing-forms__input-medium"
                            labelclassname="listing-forms__input-label"
                            errorclassname="listing-forms__input-error"
                            name="minimumContractLength"
                            placeholder=""
                            label={term === 0 ? `Contract length` : `Minimum contract length`}
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <span className="listing-forms__select-label">Contract length unit</span>
                        <Field
                            as="select"
                            name="minimumContractLengthUnits"
                            className='listing-forms__select-medium'
                        >
                            {unitOfTimeOptions.map((item: any) => (
                                <option key={item.value} value={item.value} >{item.text}</option>
                            ))}
                        </Field>
                    </div>
                    <div style={{ position: "relative" }}>
                        <span className="listing-forms__select-label">Rental term</span>
                        <Field
                            as="select"
                            name="rentalTerm"
                            className='listing-forms__select-medium'
                        >
                            {rentalTermOptions.map((item: any) => (
                                <option key={item.value} value={item.value} >{item.text}</option>
                            ))}
                        </Field>
                    </div>
                </section>}

            <section className="listing-forms__container">
                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="administrationFees"
                    placeholder=""
                    label="Administration fees (£)"
                />
                {forRent && <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="deposit"
                    placeholder=""
                    label="Deposit (£)"
                />}
            </section>

            <div style={forRent ? { display: 'none' } : { padding: '1rem' }}>
                <Field type="checkbox" name="pricing.auction" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                <span style={{ paddingLeft: '0.75rem', fontSize: "1.15rem" }}>Tick this box for sale by <b>auction</b></span>
            </div>

            <p className="listing-forms__title">Enter important dates: </p>

            <section className="listing-forms__container">
                <div style={{ position: "relative" }}>
                    <span className='listing-forms__input-label' >Open day</span>
                    <DateInput
                        placeholderText=''
                        name='openDay'
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy'
                    />
                </div>
                <div style={{ position: "relative" }}>
                    <span className='listing-forms__input-label' >Available from date</span>
                    <DateInput
                        placeholderText=''
                        name='availableFromDate'
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy'
                    />
                </div>
            </section>



            {forRent && <>
                <p className="listing-forms__title">Enter {category === 1 ? 'tenancy information' : 'bills included'}: </p>
                {category === 1 &&
                    <>
                        <section className="listing-forms__container" style={{ display: 'grid', paddingTop: '1rem' }} >
                            <div style={{ padding: '1rem' }}>
                                <Field type="checkbox" name="petsAllowed" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                                <span style={{ paddingLeft: '0.75rem', fontSize: "1.15rem" }}>Pets allowed</span>
                            </div>
                            <div style={{ padding: '0 1rem 1rem 1rem' }}>
                                <Field type="checkbox" name="smokersConsidered" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                                <span style={{ paddingLeft: '0.75rem', fontSize: "1.15rem" }}>Smokers considered</span>
                            </div>
                        </section>
                        <section className="listing-forms__container" style={{ paddingTop: '1rem' }}>
                            <div style={{ position: "relative" }}>
                                <span className="listing-forms__select-label">DSS tenants</span>
                                <Field
                                    as="select"
                                    name="tenantEligibilityDss"
                                    className='listing-forms__select-medium'
                                >
                                    {eligibilityOptions.map((item: any) => (
                                        <option key={item.value} value={item.value} >{item.text}</option>
                                    ))}
                                </Field>
                            </div>
                            <div style={{ position: "relative" }}>
                                <span className="listing-forms__select-label">Students</span>
                                <Field
                                    as="select"
                                    name="tenantEligibilityStudents"
                                    className='listing-forms__select-medium'
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

            {forRent ? null :
                <>
                    <p className="listing-forms__title">Enter tenure information: </p>
                    <section className="listing-forms__container">
                        <div style={{ position: "relative" }}>
                            <span className="listing-forms__select-label">Tenure</span>
                            <Field
                                as="select"
                                name="tenure"
                                className='listing-forms__select-medium'
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
                                        inputclassname="listing-forms__input-medium"
                                        labelclassname="listing-forms__input-label"
                                        errorclassname="listing-forms__input-error"
                                        name="leaseExpiry"
                                        placeholder=""
                                        label="Lease expiry"
                                    />
                                    <i className="listing-forms__tooltip" style={{ left: "6.25rem" }}>
                                        (years remaining)
                                    </i>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <MyTextInput
                                        inputclassname="listing-forms__input-medium"
                                        labelclassname="listing-forms__input-label"
                                        errorclassname="listing-forms__input-error"
                                        name="groundRent"
                                        placeholder=""
                                        label="Ground rent (£)"
                                    />
                                    <i className="listing-forms__tooltip" style={{ left: "7.5rem" }}>
                                        (per year)
                                    </i>
                                </div>
                                <div style={{ position: "relative" }}>
                                    <MyTextInput
                                        inputclassname="listing-forms__input-medium"
                                        labelclassname="listing-forms__input-label"
                                        errorclassname="listing-forms__input-error"
                                        name="groundRentReviewPeriod"
                                        placeholder=""
                                        label="Ground rent review period"
                                    />
                                    <i className="listing-forms__tooltip" style={{ left: "12rem" }}>
                                        (How often would it be reviewed?)
                                    </i>
                                </div>

                            </>}
                    </section>

                    <section style={{ fontSize: "1.125rem", margin: '1.5rem 1rem' }}>
                        <Field type="checkbox" name="serviceCharge.applicable" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                        <span style={{ paddingLeft: '0.75rem' }}>Tick this box if there is <b>service charge</b></span>
                    </section>

                    <section className="listing-forms__container" style={values.serviceCharge?.applicable ? {} : { display: "none" }}>
                        <div style={{ position: "relative" }}>
                            <MyTextInput
                                inputclassname="listing-forms__input-medium"
                                labelclassname="listing-forms__input-label"
                                errorclassname="listing-forms__input-error"
                                name="serviceCharge.charge"
                                placeholder=""
                                label="Service charge rate"
                            />
                        </div>

                        <div style={{ position: "relative" }}>
                            <span className="listing-forms__select-label">Service charge unit of area</span>
                            <Field
                                as="select"
                                name="serviceCharge.perUnitAreaUnits"
                                className='listing-forms__select-medium'
                            >
                                {unitOfAreaOptions.map((item: any) => (
                                    <option key={item.value} value={item.value} >{item.text}</option>
                                ))}
                            </Field>
                        </div>
                        <div style={{ position: "relative" }}>
                            <span className="listing-forms__select-label">Service charge payment frequency</span>
                            <Field
                                as="select"
                                name="serviceCharge.frequency"
                                className='listing-forms__select-medium'
                            >
                                {frequencyOptions.map((item: any) => (
                                    <option key={item.value} value={item.value} >{item.text}</option>
                                ))}
                            </Field>
                        </div>
                        <div style={{ position: "relative" }}>
                            <MyTextInput
                                inputclassname="listing-forms__input-medium"
                                labelclassname="listing-forms__input-label"
                                errorclassname="listing-forms__input-error"
                                name="serviceCharge.reviewPeriod"
                                placeholder=""
                                label="Service charge review period"
                            />
                            <i className="listing-forms__tooltip" style={{ left: "13rem" }}>
                                (How often would it be reviewed?)
                            </i>
                        </div>
                    </section>
                </>}

            <p className="listing-forms__title">Enter council tax or rates information: </p>
            <section className="listing-forms__container">
                <div style={{ position: "relative" }}>
                    <span className="listing-forms__select-label">Council tax band</span>
                    <Field
                        as="select"
                        name="councilTaxBand"
                        className='listing-forms__select-medium'
                    >
                        {councilTaxBandOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                    <i className="listing-forms__tooltip" style={{ left: "8rem" }}>
                        (England, Wales & Scotland only)
                    </i>
                </div>
                <div style={{ position: "relative" }}>
                    <MyTextInput
                        inputclassname="listing-forms__input-medium"
                        labelclassname="listing-forms__input-label"
                        errorclassname="listing-forms__input-error"
                        name="ratesPayable"
                        placeholder=""
                        label="Rates payable"
                    />
                    <i className="listing-forms__tooltip" style={{ left: "7rem" }}>
                        (Northern Ireland only)
                    </i>
                </div>
            </section>

            <p className="listing-forms__title">Enter a brief description of the property: </p>
            <section className="listing-forms__container">
                <MyTextArea
                    inputclassname="listing-forms__textarea-long"
                    labelclassname="listing-forms__textarea-label"
                    errorclassname="listing-forms__input-error"
                    placeholder=""
                    name="summaryDescription"
                    label="Summary description"
                    rows={5}
                    cols={144}
                />
            </section>

            <section className="listing-forms__buttons-container">
                <button className="listing-forms__button"
                    onClick={() => setStep(0)}
                    type="button">
                    <span>Back to address</span>
                </button>
                <button className="listing-forms__button"
                    onClick={() => setStep(2)}
                    type="button">
                    <span>Continue to details</span>
                </button>
            </section>
        </div>
    )
})