import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import { useStore } from "../../../../app/stores/store";
import './Bedrooms.css';

interface Props {
    onChange: (items: string[]) => void;
    bedsPanel: boolean;
}

export default observer(function Bedrooms({ onChange, bedsPanel }: Props) {
    const { listingStore } = useStore();
    const { predicate, maxValues } = listingStore;

    const [minMax, setMinMax] = useState<string[]>([]);

    function handleSetMinMax(min: number | string, max: number | string) {
        let newMinMax: string[] = [];
        var sale = predicate.get("channel") === "sale";
        var rent = predicate.get("channel") === "rent";
        if (!min) min = 0;
        if (!max) {
            if (sale) max = maxValues[1];
            if (rent) max = maxValues[3];
            else max = 0;
        }
        newMinMax = [min.toString(), max.toString()];
        setMinMax(newMinMax);
        onChange(newMinMax);
    }

    return (
        <Formik
            initialValues={{ minBeds: "", maxBeds: "" }}
            onSubmit={(values) => {
                handleSetMinMax(values.minBeds, values.maxBeds);
            }}
        >
            {({ handleSubmit, isSubmitting, resetForm, setFieldValue, isValid, dirty }) => (
                <Form onSubmit={handleSubmit} autoComplete="off" className={bedsPanel ? "bedrooms-form sb" : "bedrooms-form-hidden"}>
                    <div style={{ position: "relative" }}>
                        <span className="price-label">min</span>
                        <MyTextInput placeholder={""} name={"minBeds"} type="number" inputclassname="bedrooms-input" errorclassname="bedrooms-error" />
                    </div>
                    <span className="beds-dash"> - </span>
                    <div style={{ position: "relative" }}>
                        <span className="price-label">max</span>
                        <MyTextInput placeholder={""} name={"maxBeds"} type="number" inputclassname="bedrooms-input" errorclassname="bedrooms-error" />
                    </div>
                    <button className="reset-button" type="button" onClick={() => {resetForm();predicate.delete("minMaxBeds");}}>
                        Reset
                    </button>
                    <button className="apply-button" type="submit">
                        Apply
                    </button>
                </Form>
            )}
        </Formik>
    )
});