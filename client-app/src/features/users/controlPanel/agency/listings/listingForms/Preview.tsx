import { Field, FieldArray } from "formik";
import React from "react";
import MySelectInput from "../../../../../../app/common/form/MySelectInput";
import MyTextInput from "../../../../../../app/common/form/MyTextInput";
import { accessOptions, mediaOptions } from "../../../../../../app/common/form/options";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import { MediaType } from "../../../../../../app/model/Media";
import { v4 as uuid } from 'uuid';
import './Media.css';


interface Props {
    step: number;
    setStep: (value: number) => void;
    values: ListingFormValues;
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setActivePane: (value: number) => void;
}

export default function Preview({ step, setStep, values, isValid, dirty, isSubmitting, setActivePane }: Props) {
    return (
        <div className="listing-form-contents">
            <p className="details__title">Publishing status: </p>
            <section className="details__container">
                <MyTextInput
                    inputclassname="details__input-xs"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="listingReference"
                    placeholder=""
                    label="Listing reference"
                />

                <div style={{ position: "relative" }}>
                    <span className="details__select-label">Access status</span>
                    <Field
                        as="select"
                        name="accessStatus"
                        className='details__select-xs'
                    >
                        {accessOptions.map((item: any) => (
                            <option key={item.value} value={item.value} >{item.text}</option>
                        ))}
                    </Field>
                </div>
                <MyTextInput
                    inputclassname="details__input-xs"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="company.id"
                    placeholder=""
                    label="Branch Id"
                />
                <MyTextInput
                    inputclassname="details__input-xs"
                    labelclassname="basic-info__input-label"
                    errorclassname="basic-info__input-error"
                    name="companyReference"
                    placeholder=""
                    label="Branch Reference"
                />
            </section>


            <div className="media__buttons-container">
                <button className="media__button"
                    onClick={() => {
                        if (step <= 4 && step > 0) setStep(step - 1);
                    }}
                    type="button">
                    <span>Back to media</span>
                </button>
                <button
                    disabled={!isValid || !dirty || isSubmitting}
                    className="media__button-accent"
                    type="submit"
                    style={{ float: "right" }}
                >
                    <span>Submit</span>
                </button>
            </div>
        </div>
    )
}