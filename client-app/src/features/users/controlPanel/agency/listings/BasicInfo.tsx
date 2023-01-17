import { Field } from "formik";
import React from "react";
import MySelectInput from "../../../../../app/common/form/MySelectInput";
import MyTextInput from "../../../../../app/common/form/MyTextInput";
import { priceOptions, propertyOptions } from "../../../../../app/common/form/options";
import { AccessStatus } from "../../../../../app/model/AccessStatus";
import { TransactionType } from "../../../../../app/model/ListingAggregate/ListingEnums";

interface Props {
    step: number;
}

export default function BasicInfo({ step }: Props) {
    return (
        <div>
            <article className="listing-form-contents">
                <p className="listing-form-title">Basic information:</p>

                <p className="listing-form-label">Listing status:</p>
                <Field as="select" name="accessStatus" className='access-status-select-style'>
                    <option value={AccessStatus.Private} >Private</option>
                    <option value={AccessStatus.Public} >Public</option>
                </Field>

                <p className="listing-form-label">Listing category:</p>

                {/* <MySelectInput selectclassname="branch-form-select" placeholder="Listing category" name="category" options={channelOptions} /> */}
                <p className="listing-form-label">Listing type:</p>
                {/* <MySelectInput selectclassname="branch-form-select" placeholder="Listing type" name="pricing.transactionType" options={transactionOptions} /> */}
                <MyTextInput
                    label="Sale"
                    inputclassname=""
                    errorclassname=""
                    placeholder="sale"
                    name="pricing.transactionType"
                    type="radio"
                    value={TransactionType[TransactionType.sale]}
                />
                <MyTextInput
                    label="Rent"
                    inputclassname=""
                    errorclassname=""
                    placeholder="rent"
                    name="pricing.transactionType"
                    type="radio"
                    value={TransactionType[TransactionType.rent]}
                />
                <p className="listing-form-label">Property type:</p>
                <MySelectInput selectclassname="branch-form-select" placeholder="Property type" name="propertyType" options={propertyOptions} />
                <span className="branch-form-tooltip">The basic status of the listing</span>
            </article>
            <article className="listing-form-contents">
                <p className="listing-form-title">Price:</p>
                <p className="branch-form-label">Listing price:</p>
                <span className="branch-form-tooltip">Your unique identifier for the folder (We don't publish these, as they should be the native identifier in your system for uploading or debugging purposes)</span>
                <MyTextInput inputclassname="branch-form-input" errorclassname="branch-form-error" name="pricing.price" placeholder="Listing price" />
                <p className="branch-form-label">Price qualifier:</p>
                <MySelectInput selectclassname="branch-form-select" placeholder="status" name="pricing.priceQualifier" options={priceOptions} />
            </article>
        </div>
    )
}