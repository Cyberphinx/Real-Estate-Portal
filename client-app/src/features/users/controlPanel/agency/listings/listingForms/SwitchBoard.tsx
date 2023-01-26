import React from "react";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import BasicInfo from "./BasicInfo";
import Details from "./Details";
import ListingAddress from "./ListingAddress";
import Media from "./Media";
import Preview from "./Preview";

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
    setActivePane: (value: number) => void;
}
export default function SwitchBoard({ step, setStep, setFieldValue, setFieldTouched, getFieldMeta, values, isValid, dirty, isSubmitting, setActivePane }: Props) {

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
                        setActivePane={setActivePane}
                    />
                );
            case 1:
                return (
                    <BasicInfo
                        step={step}
                        setStep={setStep}
                        setActivePane={setActivePane}
                        setFieldValue={setFieldValue}
                        getFieldMeta={getFieldMeta}
                        values={values}
                    />
                );
            case 2:
                return (
                    <Details
                        step={step}
                        setStep={setStep}
                        values={values}
                        setActivePane={setActivePane}
                        setFieldValue={setFieldValue}
                    />
                );
            case 3:
                return (
                    <Media
                        step={step}
                        setStep={setStep}
                        values={values}
                        isValid={isValid}
                        dirty={dirty}
                        isSubmitting={isSubmitting}
                        setActivePane={setActivePane}
                    />
                );
            case 4:
                return (
                    <Preview
                        step={step}
                        setStep={setStep}
                        values={values}
                        isValid={isValid}
                        dirty={dirty}
                        isSubmitting={isSubmitting}
                        setActivePane={setActivePane}
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