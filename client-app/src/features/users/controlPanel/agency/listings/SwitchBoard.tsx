import L from "leaflet";
import { GeoSearchControl, LocationIQProvider } from "leaflet-geosearch";
import React, { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../../../../app/hooks/useDebounce";
import { ListingFormValues } from "../../../../../app/model/ListingAggregate/Listing";
import BasicInfo from "./BasicInfo";
import Details from "./Details";
import ListingAddress from "./ListingAddress";
import ListingAddressTest from "./ListingAddressTest";
import Media from "./Media";

interface Props {
    step: number;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    getFieldMeta: any;
    values: ListingFormValues;
}
export default function SwitchBoard({ step, setFieldValue, setFieldTouched, getFieldMeta, values }: Props) {

    function selectStep() {
        switch (step) {
            case 0:
                return (
                    
                        <ListingAddress
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            getFieldMeta={getFieldMeta}
                            // rawData={rawData}
                            // setRawData={setRawData}
                            // latitude={latitude}
                            // setLatitude={setLatitude}
                            // longitude={longitude}
                            // setLongitude={setLongitude}
                            // debouncedHandler={debouncedHandler}
                        />
                );
            case 1:
                return (
                    <BasicInfo step={step} />
                );
            case 2:
                return (
                    <Details step={step} values={values} />
                );
            case 3:
                return (
                    <Media step={step} values={values} />
                );
        }
    }


    return (
        <div>
            {selectStep()}
        </div>
    )
}