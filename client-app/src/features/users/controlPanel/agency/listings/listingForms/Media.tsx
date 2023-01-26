import { FieldArray } from "formik";
import React from "react";
import MySelectInput from "../../../../../../app/common/form/MySelectInput";
import MyTextInput from "../../../../../../app/common/form/MyTextInput";
import { mediaOptions } from "../../../../../../app/common/form/options";
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

export default function Media({ step, setStep, values, isValid, dirty, isSubmitting, setActivePane }: Props) {
    return (
        <div className="listing-form-contents">
            <p className="listing-form-title">Media:</p>
            <FieldArray
                name="listingMedia"
                render={arrayHelpers => (
                    <div >
                        <p className="branch-form-label">Listing media: </p>
                        {values.listingMedia?.map((content, index) => (
                            <div key={index} style={{ margin: "20px 0px" }}>
                                <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`listingMedia[${index}].id`} placeholder="id" />
                                <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`listingMedia[${index}].url`} placeholder="url" />
                                <MySelectInput selectclassname="branch-form-select" name={`listingMedia[${index}].type`} placeholder="type" options={mediaOptions} />
                                <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`listingMedia[${index}].caption`} placeholder="caption" />
                                <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`listingMedia[${index}].listingId`} placeholder="listingId" />

                                <button type="button" onClick={() => arrayHelpers.remove(index)}> Remove media </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => arrayHelpers.push({ id: uuid(), url: '', type: MediaType.image, caption: '', listingId: '' })}> Add media </button>
                    </div>
                )}
            />
            <div className="media__buttons-container">
                <button className="media__button"
                    onClick={() => {
                        if (step <= 4 && step > 0) setStep(step - 1);
                    }}
                    type="button">
                    <span>Back to details</span>
                </button>
                <button className="media__button"
                    onClick={() => {
                        if (step >= 0 && step < 4) setStep(step + 1);
                    }}
                    type="button">
                    <span>Continue to Preview</span>
                </button>
            </div>
        </div>
    )
}