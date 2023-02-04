import React from "react";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import BasicInfo from "./BasicInfo";
import Details from "./Details";
import ListingAddress from "./ListingAddress";

interface Props {
    step: number;
    setStep: (value: number) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    getFieldMeta: any;
    values: ListingFormValues;
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
}
export default function SwitchBoard({ step, setStep, setFieldValue, setFieldTouched, getFieldMeta, values, isValid, dirty, isSubmitting }: Props) {

    function selectStep() {
        switch (step) {
            case 0:
                return (
                    <ListingAddress
                        step={step}
                        setStep={setStep}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        getFieldMeta={getFieldMeta}
                    />
                );
            case 1:
                return (
                    <BasicInfo
                        step={step}
                        setStep={setStep}
                        setFieldValue={setFieldValue}
                        values={values}
                    />
                );
            case 2:
                return (
                    <Details
                        step={step}
                        setStep={setStep}
                        values={values}
                        setFieldValue={setFieldValue}
                        isValid={isValid}
                        dirty={dirty}
                        isSubmitting={isSubmitting}
                    />
                );
        }
    }

    return (
        <div>
            {selectStep()}
        </div>
    )
}