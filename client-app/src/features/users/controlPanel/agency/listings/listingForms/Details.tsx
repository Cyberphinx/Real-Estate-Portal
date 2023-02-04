import { Field, FieldArray } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import ArrayInput from "../../../../../../app/common/form/ArrayInput";
import MultiSelect from "../../../../../../app/common/form/MultiSelect";
import MyTextArea from "../../../../../../app/common/form/MyTextArea";
import MyTextInput from "../../../../../../app/common/form/MyTextInput";
import {
    conditionOptions, cookerOptions, furnishedOptions, goodsOptions,
    heatingOptions, incentiveOptions, listedBuildingGradeOptions, parkingOptions,
    propertyTypeOptions, spacesOptions, unitOfAreaOptions
} from "../../../../../../app/common/form/options";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import { FeatureSpace, Incentive, Parking, WhiteGoods } from "../../../../../../app/model/ListingAggregate/ListingEnums";
import { useStore } from "../../../../../../app/stores/store";
import './ListingForms.css';

interface Props {
    step: number;
    setStep: (value: number) => void;
    values: ListingFormValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
}

export default observer(function BasicInformation({ step, setStep, values, setFieldValue, isValid, dirty, isSubmitting }: Props) {
    const { listingStore } = useStore();
    const { setListingId } = listingStore;
    const channel: number = Number(values.pricing?.transactionType);
    const category: number = Number(values.category);

    return (
        <div style={{ width: '60rem', padding:'0 2.5rem 2.5rem 2.5rem' }}>
            <p className="listing-forms__title">Enter listing attributes (tick all that applies): </p>
            <section className="listing-forms__checkbox-container" style={{ gap: '2rem' }}>
                <label className={values.newBuild ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                    New build
                    <Field type="checkbox" name="newBuild" className="listing-forms__checkbox" />
                </label>
                {channel === 1 && <label className={values.chainFree ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                    Chain free
                    <Field type="checkbox" name="chainFree" className="listing-forms__checkbox" />
                </label>}
                {category === 1 && channel === 1 && <label className={values.retirement ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                    Retirement
                    <Field type="checkbox" name="retirement" className="listing-forms__checkbox" />
                </label>}
                <label className={values.accessibility ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                    Wheelchair accessible
                    <Field type="checkbox" name="accessibility" className="listing-forms__checkbox" />
                </label>
                {channel === 1 &&
                    <label className={values.repossession ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                        Repossession
                        <Field type="checkbox" name="repossession" className="listing-forms__checkbox" />
                    </label>}
                <label className={values.serviced ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                    Serviced accommodation
                    <Field type="checkbox" name="serviced" className="listing-forms__checkbox" />
                </label>
                {channel === 1 && <label className={values.tenanted ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                    Tenanted
                    <Field type="checkbox" name="tenanted" className="listing-forms__checkbox" />
                </label>}
                {category === 1 && channel === 0 && <label className={values.sharedAccommodation ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                    Shared accommodation
                    <Field type="checkbox" name="sharedAccommodation" className="listing-forms__checkbox" />
                </label>}

            </section>

            {category === 0 && <>
                <p className="listing-forms__title">Enter commercial details: </p>
                <section className="listing-forms__container">
                    <label className={values.businessForSale ? 'listing-forms__checkbox-label__checked' : 'listing-forms__checkbox-label'} >
                        Business for sale
                        <Field type="checkbox" name="businessForSale" className="listing-forms__checkbox" />
                    </label>
                </section>
                <section className="listing-forms__container">
                    <MyTextInput
                        inputclassname="listing-forms__input-medium"
                        labelclassname="listing-forms__input-label"
                        errorclassname="listing-forms__input-error"
                        name="annualBusinessRates"
                        placeholder=""
                        label="Annual business rates"
                    />
                    <MyTextInput
                        inputclassname="listing-forms__input-medium"
                        labelclassname="listing-forms__input-label"
                        errorclassname="listing-forms__input-error"
                        name="rateableValue"
                        placeholder=""
                        label="Rateable value"
                    />
                </section>
                <section style={{ position: 'relative' }}>
                    <ArrayInput fieldName="commercialUseClass" fieldValues={values.commercialUseClass} label="Commercial use classes" />
                    <i className="listing-forms__tooltip" style={{ left: "11rem" }}>
                        (Eg. Class B, Class E, etc. Refer to Planning Portal)
                    </i>
                </section>
            </>}

            {channel === 1 && <>
                <p className="listing-forms__title">Enter any buyer incentives: </p>
                <div className="listing-forms__container" style={{ gap: '2rem' }} >
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

            <p className="listing-forms__title">Enter architectural information: </p>
            <section className="listing-forms__container">
                <div style={{ position: "relative" }}>
                    <span className="listing-forms__select-label">Property type</span>
                    <Field
                        as="select"
                        name="propertyType"
                        className='listing-forms__select-medium'
                    >
                        {propertyTypeOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>

            <section className="listing-forms__container">
                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="constructionYear"
                    placeholder=""
                    label="Construction year"
                />
                <div style={{ position: "relative" }}>
                    <span className="listing-forms__select-label">Property condition</span>
                    <Field
                        as="select"
                        name="decorativeCondition"
                        className='listing-forms__select-medium'
                    >
                        {conditionOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>

            <p className="listing-forms__title">Enter number of rooms: </p>
            <section className="listing-forms__container">
                {values.sharedAccommodation ? <div style={{ position: 'relative' }}>
                    <MyTextInput
                        inputclassname="listing-forms__input-xs"
                        labelclassname="listing-forms__input-label"
                        errorclassname="listing-forms__input-error"
                        name="availableBedrooms"
                        placeholder=""
                        label="Available bedrooms"
                    />
                    <i className="listing-forms__tooltip" style={{ left: "9rem" }} >
                        (if shared)
                    </i>
                </div> : null}
                <MyTextInput
                    inputclassname={values.sharedAccommodation ? "listing-forms__input-xs" : "listing-forms__input-medium"}
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="totalBedrooms"
                    placeholder=""
                    label={values.sharedAccommodation ? "Total bedrooms" : "Bedrooms"}
                />
                <MyTextInput
                    inputclassname={values.sharedAccommodation ? "listing-forms__input-xs" : "listing-forms__input-medium"}
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="bathrooms"
                    placeholder=""
                    label="Bathrooms"
                />
                <MyTextInput
                    inputclassname={values.sharedAccommodation ? "listing-forms__input-xs" : "listing-forms__input-medium"}
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="livingRooms"
                    placeholder=""
                    label="Living rooms"
                />
            </section>

            <p className="listing-forms__title">Enter floor area: </p>
            <section className="listing-forms__container">
                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="areaTotal"
                    placeholder=""
                    label="Approximate total floor area"
                />
                <div style={{ position: "relative" }}>
                    <span className="listing-forms__select-label">Unit of area</span>
                    <Field
                        as="select"
                        name="areaUnits"
                        className='listing-forms__select-medium'
                    >
                        {unitOfAreaOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>


            <p className="listing-forms__title">Enter floors: </p>
            <section className="listing-forms__container">
                <div style={{ position: 'relative' }}>
                    <MyTextInput
                        inputclassname="listing-forms__input-medium"
                        labelclassname="listing-forms__input-label"
                        errorclassname="listing-forms__input-error"
                        name="floors"
                        placeholder=""
                        label="Total number of floors"
                    />
                    <i className="listing-forms__tooltip" style={{ left: "10rem" }}>
                        (that the property occupies)
                    </i>
                </div>

                <div style={{ position: 'relative' }}>
                    <ArrayInput fieldName="floorLevels" fieldValues={values.floorLevels} label={"Floor levels"} />
                    <i className="listing-forms__tooltip" style={{ left: "5.5rem" }}>
                        (Which floors the property occupies in a multi-storey building. Eg. Ground floor, First floor, Second floor)
                    </i>
                </div>
            </section>

            <p className="listing-forms__title">Furnishing details: </p>
            <section className="listing-forms__container" style={{ gap: '2rem' }}>

                <div style={{ position: "relative" }}>
                    <span className="listing-forms__select-label">Furnished state</span>
                    <Field
                        as="select"
                        name="furnishedState"
                        className='listing-forms__select-medium'
                    >
                        {furnishedOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
                <div style={{ position: "relative" }}>
                    <span className="listing-forms__select-label">Central heating</span>
                    <Field
                        as="select"
                        name="centralHeating"
                        className='listing-forms__select-medium'
                    >
                        {heatingOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
                <div style={{ position: "relative" }}>
                    <span className="listing-forms__select-label">Cooker / stove type</span>
                    <Field
                        as="select"
                        name="cookerType"
                        className='listing-forms__select-medium'
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

            <p className="listing-forms__title">Enter features (select all that applies): </p>
            <section className="listing-forms__container">
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

            <section className="listing-forms__container" style={values.listedBuilding ? {} : { display: "none" }}>
                <div style={{ position: "relative" }}>
                    <span className="listing-forms__select-label">Listed building grade</span>
                    <Field
                        as="select"
                        name="listedBuildingGrade"
                        className='listing-forms__select-medium'
                    >
                        {listedBuildingGradeOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
            </section>


            <p className="listing-forms__title">Enter EPC and SAP ratings: </p>
            <section className="listing-forms__container">
                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="eerCurrentRating"
                    placeholder=""
                    label="EER current rating"
                />
                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="eerPotentialRating"
                    placeholder=""
                    label="EER potential rating"
                />
                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="eirCurrentRating"
                    placeholder=""
                    label="EIR current rating"
                />
                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="eirPotentialRating"
                    placeholder=""
                    label=" EIR potential rating"
                />

                <MyTextInput
                    inputclassname="listing-forms__input-medium"
                    labelclassname="listing-forms__input-label"
                    errorclassname="listing-forms__input-error"
                    name="sapRating"
                    placeholder=""
                    label="SAP rating"
                />
            </section>

            <p className="listing-forms__title">Enter custom features: </p>
            <section className="listing-forms__container" style={{ gap: '2rem' }}>
                <div style={{ position: 'relative' }}>
                    <ArrayInput fieldName="featureList" fieldValues={values.featureList} label={"Feature list"} />
                    <i className="listing-forms__tooltip" style={{ left: "5.5rem" }}>
                        (A list of important aspects about the property to highlight. Eg. "Newly refurnished", "Sea view", "Brand new kitchen".)
                    </i>
                </div>
            </section>

            <p className="listing-forms__title">Enter custom description: </p>
            <section className="listing-forms__container" style={{ paddingBottom: '2rem' }}>
                <FieldArray
                    name="detailedDescriptions"
                    render={arrayHelpers => (
                        <div>
                            {values.detailedDescriptions?.map((description, index) => (
                                <div key={index} style={{ margin: "20px 0px" }}>
                                    <MyTextInput
                                        inputclassname="listing-forms__input-long"
                                        labelclassname="listing-forms__input-label"
                                        errorclassname="listing-forms__input-error"
                                        name={`detailedDescriptions[${index}].heading`}
                                        placeholder=""
                                        label="Title"
                                    />
                                    <div style={{ position: 'relative', paddingTop: '1rem' }}>
                                        <MyTextArea
                                            inputclassname="listing-forms__textarea-long"
                                            labelclassname="listing-forms__textarea-label"
                                            errorclassname="listing-forms__input-error"
                                            name={`detailedDescriptions[${index}].text`}
                                            placeholder=""
                                            label="Description"
                                            rows={5}
                                            cols={144}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="listing-forms__button-neutral"
                                        onClick={() => arrayHelpers.remove(index)}
                                    > Remove description </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="listing-forms__button-neutral"
                                onClick={() => arrayHelpers.push({ id: uuid(), heading: '', text: '' })}
                            >
                                Add description
                            </button>
                        </div>
                    )}
                />
            </section>

            <section className="listing-forms__buttons-container">
                <button className="listing-forms__button"
                    onClick={() => {
                        if (step <= 4 && step > 0) setStep(step - 1);
                    }}
                    type="button">
                    <span>Back to basic info</span>
                </button>

                <button className="listing-forms__button"
                    disabled={!isValid || !dirty || isSubmitting}
                    type="submit">
                    <span>Save and continue to media</span>
                </button>
            </section>

        </div>
    )
})