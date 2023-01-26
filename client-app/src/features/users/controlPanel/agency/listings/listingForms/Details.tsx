import { Field, FieldArray } from "formik";
import React from "react";
import { v4 as uuid } from 'uuid';
import ArrayInput from "../../../../../../app/common/form/ArrayInput";
import MultiSelect from "../../../../../../app/common/form/MultiSelect";
import MyTextInput from "../../../../../../app/common/form/MyTextInput";
import {
    conditionOptions, cookerOptions, furnishedOptions, goodsOptions,
    heatingOptions, incentiveOptions, listedBuildingGradeOptions, parkingOptions,
    propertyTypeOptions, spacesOptions, unitOfAreaOptions
} from "../../../../../../app/common/form/options";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import { FeatureSpace, Incentive, Parking, WhiteGoods } from "../../../../../../app/model/ListingAggregate/ListingEnums";
import './Details.css';

interface Props {
    step: number;
    setStep: (value: number) => void;
    values: ListingFormValues;
    setActivePane: (value: number) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export default function BasicInformation({ step, setStep, values, setFieldValue }: Props) {
    const channel: number = Number(values.pricing?.transactionType);
    const category: number = Number(values.category);

    return (
        <div style={{ width: '60rem' }}>
            {/* <section style={{ display: 'flex', gap: '4rem', margin: '1rem 0.3rem', position:'relative' }}>
                <label className="details__switch">
                    <input id="toggle" type="checkbox" className="details__toggle"
                        onClick={() => {
                            if (Number(values.category) === 0) {
                                setFieldValue("category", 1);
                            };
                            if (Number(values.category) === 1) {
                                setFieldValue("category", 0);
                            };
                        }} />
                    <span className="details__slider"></span>
                    <span className="details_slider-text" 
                    style={Number(values.category) === 0 ? {left:'1.4rem'} : {left:'1.4rem'}}
                    >Residential</span>
                    <span className="details_slider-text" 
                    style={Number(values.category) === 1 ? {right:'1rem'} : {right:'1rem'}}
                    >Commercial</span>
                </label>
            </section> */}


            <p className="details__title">Enter listing attributes (tick all that applies): </p>
            <section className="details__container" style={{ gap: '2rem' }}>
                <label className={values.newBuild ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                    New build
                    <Field type="checkbox" name="newBuild" className="details__checkbox" />
                </label>
                {channel === 1 && <label className={values.chainFree ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                    Chain free
                    <Field type="checkbox" name="chainFree" className="details__checkbox" />
                </label>}
                {category === 1 && channel === 1 && <label className={values.retirement ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                    Retirement
                    <Field type="checkbox" name="retirement" className="details__checkbox" />
                </label>}
                <label className={values.accessibility ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                    Wheelchair accessible
                    <Field type="checkbox" name="accessibility" className="details__checkbox" />
                </label>
                {channel === 1 &&
                    <label className={values.repossession ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                        Repossession
                        <Field type="checkbox" name="repossession" className="details__checkbox" />
                    </label>}
                <label className={values.serviced ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                    Serviced accommodation
                    <Field type="checkbox" name="serviced" className="details__checkbox" />
                </label>
                {channel === 1 && <label className={values.tenanted ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                    Tenanted
                    <Field type="checkbox" name="tenanted" className="details__checkbox" />
                </label>}
                {category === 1 && channel === 0 && <label className={values.sharedAccommodation ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                    Shared accommodation
                    <Field type="checkbox" name="sharedAccommodation" className="details__checkbox" />
                </label>}

            </section>

            {category === 0 && <>
                <p className="details__title">Enter commercial details: </p>
                <section className="details__container">
                    <label className={values.businessForSale ? 'details__checkbox-label__checked' : 'details__checkbox-label'} >
                        Business for sale
                        <Field type="checkbox" name="businessForSale" className="details__checkbox" />
                    </label>
                </section>
                <section className="details__container">
                    <MyTextInput
                        inputclassname="details__input-medium"
                        labelclassname="basic-info__input-label"
                        errorclassname="basic-info__input-error"
                        name="annualBusinessRates"
                        placeholder=""
                        label="Annual business rates"
                    />
                    <MyTextInput
                        inputclassname="details__input-medium"
                        labelclassname="basic-info__input-label"
                        errorclassname="basic-info__input-error"
                        name="rateableValue"
                        placeholder=""
                        label="Rateable value"
                    />
                </section>
            </>}

            {channel === 1 && <>
                <p className="details__title">Enter any buyer incentives: </p>
                <div className="details__container" style={{ gap: '2rem' }} >
                    <MultiSelect
                        setFieldValue={setFieldValue}
                        fieldName={"buyerIncentives"}
                        fieldValues={values.buyerIncentives}
                        enumType={Incentive}
                        options={incentiveOptions}
                        label={"Buyer incentives"}
                    />
                </div>
            </>}

            <p className="details__title">Enter architectural information: </p>
            <section className="details__container">
                <div style={{ position: "relative" }}>
                    <span className="basic-info__select-label">Property type</span>
                    <Field
                        as="select"
                        name="propertyType"
                        className='details__select-medium'
                    >
                        {propertyTypeOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>

            <section className="details__container">
                <MyTextInput
                    inputclassname="details__input-medium"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="constructionYear"
                    placeholder=""
                    label="Construction year"
                />
                <div style={{ position: "relative" }}>
                    <span className="details__select-label">Property condition</span>
                    <Field
                        as="select"
                        name="decorativeCondition"
                        className='details__select-medium'
                    >
                        {conditionOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>

            <p className="details__title">Enter rooms: </p>
            <section className="details__container">
                {values.sharedAccommodation ? <div style={{ position: 'relative' }}>
                    <MyTextInput
                        inputclassname="details__input-xs"
                        labelclassname="basic-info__input-label"
                        errorclassname="basic-info__input-error"
                        name="availableBedrooms"
                        placeholder=""
                        label="Available bedrooms"
                    />
                    <i style={{ fontSize: "0.875rem", color: "#505050", position: "absolute", zIndex: "1", top: "0.2rem", left: "9rem" }}>
                        (if shared)
                    </i>
                </div> : null}
                <MyTextInput
                    inputclassname={values.sharedAccommodation ? "details__input-xs" : "details__input-s"}
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="totalBedrooms"
                    placeholder=""
                    label={values.sharedAccommodation ? "Total bedrooms" : "Bedrooms"}
                />
                <MyTextInput
                    inputclassname={values.sharedAccommodation ? "details__input-xs" : "details__input-s"}
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="bathrooms"
                    placeholder=""
                    label="Bathrooms"
                />
                <MyTextInput
                    inputclassname={values.sharedAccommodation ? "details__input-xs" : "details__input-s"}
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="livingRooms"
                    placeholder=""
                    label="Living rooms"
                />
            </section>

            <p className="details__title">Enter floor area: </p>
            <section className="details__container">
                <MyTextInput
                    inputclassname="details__input-medium"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="areasTotal"
                    placeholder=""
                    label="Approximate total floor area"
                />
                <div style={{ position: "relative" }}>
                    <span className="details__select-label">Unit of area</span>
                    <Field
                        as="select"
                        name="areasUnits"
                        className='details__select-medium'
                    >
                        {unitOfAreaOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>


            <p className="details__title">Enter floors: </p>
            <section className="details__container">
                <MyTextInput
                    inputclassname="details__input-medium"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="floors"
                    placeholder=""
                    label="Total number of floors"
                />

                <ArrayInput fieldName="floorLevels" fieldValues={values.floorLevels} label={"Floor levels"} />
            </section>

            <p className="details__title">Furnishing details: </p>
            <section className="details__container" style={{ gap: '2rem' }}>

                <div style={{ position: "relative" }}>
                    <span className="details__select-label">Furnished state</span>
                    <Field
                        as="select"
                        name="furnishedState"
                        className='details__select-medium'
                    >
                        {furnishedOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
                <div style={{ position: "relative" }}>
                    <span className="details__select-label">Central heating</span>
                    <Field
                        as="select"
                        name="centralHeating"
                        className='details__select-medium'
                    >
                        {heatingOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
                <div style={{ position: "relative" }}>
                    <span className="details__select-label">Cooker / stove type</span>
                    <Field
                        as="select"
                        name="cookerType"
                        className='details__select-medium'
                    >
                        {cookerOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>

                <MultiSelect
                    setFieldValue={setFieldValue}
                    fieldName={"whiteGoods"}
                    fieldValues={values.whiteGoods}
                    enumType={WhiteGoods}
                    options={goodsOptions}
                    label={"White goods"}
                />
            </section>

            <p className="details__title">Enter features (select all that applies): </p>
            <section className="details__container">
                <MultiSelect
                    setFieldValue={setFieldValue}
                    fieldName={"featureSpaces"}
                    fieldValues={values.featureSpaces}
                    enumType={FeatureSpace}
                    options={spacesOptions}
                    label={"Feature spaces"}
                />
                <MultiSelect
                    setFieldValue={setFieldValue}
                    fieldName={"parking"}
                    fieldValues={values.parking}
                    enumType={Parking}
                    options={parkingOptions}
                    label={"Parking"}
                />
            </section>

            <section style={{ fontSize: "1.125rem", margin: '1.5rem 1rem' }}>
                <Field type="checkbox" name="listedBuilding" style={{ transform: "scale(2)", accentColor: "#f0f0f0" }} />
                <span style={{ paddingLeft: '0.75rem' }}>Tick this box if the building is <b>listed</b></span>
            </section>

            <section className="details__container" style={values.listedBuilding ? {} : { display: "none" }}>
                <div style={{ position: "relative" }}>
                    <span className="details__select-label">Listed building grade</span>
                    <Field
                        as="select"
                        name="listedBuildingGrade"
                        className='details__select-medium'
                    >
                        {listedBuildingGradeOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>


            <p className="details__title">Enter EPC and SAP ratings (upload EPC certificate in the next page): </p>
            <section className="details__container">
                <MyTextInput
                    inputclassname="details__input-medium"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="eerCurrentRating"
                    placeholder=""
                    label="EER current rating"
                />
                <MyTextInput
                    inputclassname="details__input-medium"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="eerPotentialRating"
                    placeholder=""
                    label="EER potential rating"
                />
                <MyTextInput
                    inputclassname="details__input-medium"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="eirCurrentRating"
                    placeholder=""
                    label="EIR current rating"
                />
                <MyTextInput
                    inputclassname="details__input-medium"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="eirPotentialRating"
                    placeholder=""
                    label=" EIR potential rating"
                />

                <MyTextInput
                    inputclassname="details__input-medium"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="sapRating"
                    placeholder=""
                    label="SAP rating"
                />
            </section>

            <p className="details__title">Enter custom features: </p>
            <section className="details__container" style={{ gap: '2rem' }}>
                <ArrayInput fieldName="featureList" fieldValues={values.featureList} label={"Feature list"} />
            </section>

            <p className="details__title">Enter custom description: </p>
            <section className="details__container" style={{ paddingBottom: '2rem' }}>
                <FieldArray
                    name="detailedDescriptions"
                    render={arrayHelpers => (
                        <div>
                            {values.detailedDescriptions?.map((description, index) => (
                                <div key={index} style={{ margin: "20px 0px" }}>
                                    <MyTextInput
                                        inputclassname="basic-info__input-style"
                                        labelclassname="basic-info__input-label"
                                        errorclassname="basic-info__input-error"
                                        name={`detailedDescriptions[${index}].id`}
                                        placeholder=""
                                        label="Id"
                                    />
                                    <MyTextInput
                                        inputclassname="basic-info__input-style"
                                        labelclassname="basic-info__input-label"
                                        errorclassname="basic-info__input-error"
                                        name={`detailedDescriptions[${index}].listingId`}
                                        placeholder=""
                                        label="Listing Id"
                                    />
                                    <MyTextInput
                                        inputclassname="basic-info__input-style"
                                        labelclassname="basic-info__input-label"
                                        errorclassname="basic-info__input-error"
                                        name={`detailedDescriptions[${index}].heading`}
                                        placeholder=""
                                        label="Title"
                                    />
                                    <MyTextInput
                                        inputclassname="basic-info__input-style"
                                        labelclassname="basic-info__input-label"
                                        errorclassname="basic-info__input-error"
                                        name={`detailedDescriptions[${index}].text`}
                                        placeholder=""
                                        label="Description"
                                    />
                                    <button
                                        type="button"
                                        className="details__button-neutral"
                                        onClick={() => arrayHelpers.remove(index)}
                                    > Remove description </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="details__button-neutral"
                                onClick={() => arrayHelpers.push({ id: uuid(), heading: '', text: '', listingId: '' })}
                            >
                                Add description
                            </button>
                        </div>
                    )}
                />
            </section>




            <section className="details__buttons-container">
                <button className="details__button"
                    onClick={() => {
                        if (step <= 4 && step > 0) setStep(step - 1);
                    }}
                    type="button">
                    <span>Back to basic info</span>
                </button>
                <button className="details__button"
                    onClick={() => {
                        if (step >= 0 && step < 4) setStep(step + 1);
                    }}
                    type="button">
                    <span>Continue to media</span>
                </button>
            </section>
        </div>
    )
}