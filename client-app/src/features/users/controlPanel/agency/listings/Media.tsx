import { FieldArray } from "formik";
import React from "react";
import MySelectInput from "../../../../../app/common/form/MySelectInput";
import MyTextInput from "../../../../../app/common/form/MyTextInput";
import { mediaOptions } from "../../../../../app/common/form/options";
import { ListingFormValues } from "../../../../../app/model/ListingAggregate/Listing";
import { MediaType } from "../../../../../app/model/ListingAggregate/ListingEnums";
import { v4 as uuid } from 'uuid';


interface Props {
    step: number;
    values: ListingFormValues;
}

export default function Media({ step, values }: Props) {
    return (
        <article className="listing-form-contents">
            <p className="listing-form-title">Media:</p>
            <FieldArray
                name="contents"
                render={arrayHelpers => (
                    <div >
                        <p className="branch-form-label">Listing media: </p>
                        {values.contents?.map((content, index) => (
                            <div key={index} style={{ margin: "20px 0px" }}>
                                <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`contents[${index}].id`} placeholder="id" />
                                <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`contents[${index}].url`} placeholder="url" />
                                <MySelectInput selectclassname="branch-form-select" name={`contents[${index}].type`} placeholder="type" options={mediaOptions} />
                                <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`contents[${index}].caption`} placeholder="caption" />
                                <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`contents[${index}].listingId`} placeholder="listingId" />

                                <button type="button" onClick={() => arrayHelpers.remove(index)}> Remove media </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => arrayHelpers.push({ id: uuid(), url: '', type: MediaType.image, caption: '', listingId: '' })}> Add media </button>
                    </div>
                )}
            />
        </article>
    )
}