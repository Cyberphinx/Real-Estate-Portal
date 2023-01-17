import { FieldArray } from "formik";
import React from "react";
import { v4 as uuid } from 'uuid';
import MySelectInput from "../../../../../app/common/form/MySelectInput";
import MyTextInput from "../../../../../app/common/form/MyTextInput";
import { cookerOptions, furnishedOptions } from "../../../../../app/common/form/options";
import { ListingFormValues } from "../../../../../app/model/ListingAggregate/Listing";

interface Props {
    step: number;
    values: ListingFormValues;
}

export default function BasicInformation({ step, values }: Props) {
    return (
        <div>
            <article className="listing-form-contents">
                <p className="listing-form-title">Description:</p>
                <FieldArray
                    name="detailedDescriptions"
                    render={arrayHelpers => (
                        <div>
                            {values.detailedDescriptions?.map((description, index) => (
                                <div key={index} style={{ margin: "20px 0px" }}>
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`detailedDescriptions[${index}].id`} placeholder="id" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`detailedDescriptions[${index}].heading`} placeholder="heading" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`detailedDescriptions[${index}].text`} placeholder="text" />
                                    <MyTextInput inputclassname="branch-form-input-small" errorclassname="branch-form-error" name={`detailedDescriptions[${index}].listingId`} placeholder="listingId" />

                                    <button type="button" onClick={() => arrayHelpers.remove(index)}> Remove description </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => arrayHelpers.push({ id: uuid(), heading: '', text: '', listingId: '' })}> Add description </button>
                        </div>
                    )}
                />
            </article>
            <article className="listing-form-contents">
                <p className="listing-form-title">Attributes:</p>
                <p className="branch-form-label">Total number of bedrooms:</p>
                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="totalBedrooms" placeholder="Bedrooms" />
                <p className="branch-form-label">Bathrooms:</p>
                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="bathrooms" placeholder="Bathrooms" />
                <p className="branch-form-label">Furnished state:</p>
                <MySelectInput selectclassname="branch-form-select" name="furnishedState" placeholder="paragraph" options={furnishedOptions} />
                <p className="branch-form-label">Cooker type:</p>
                <MySelectInput selectclassname="branch-form-select" name="cookerType" placeholder="Cooker type" options={cookerOptions} />
                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="fridge" placeholder="fridge" type="checkbox" label="Fridge" />
                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="freezer" placeholder="freezer" type="checkbox" label="Freezer" />
            </article>
        </div>
    )
}