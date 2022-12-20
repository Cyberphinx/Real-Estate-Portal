import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import { useStore } from "../../../../app/stores/store";
import './Price.css';

interface Props {
    onChange: (items: string[]) => void;
}

export default observer(function Price({ onChange }: Props) {
    const { listingStore } = useStore();
    const { predicate, maxValues } = listingStore;

    const [minMax, setMinMax] = useState<string[]>([]);

    function handleSetMinMax(min: number | string, max: number | string) {
        let newMinMax: string[] = [];
        var sale = predicate.get("channel") === "sale";
        var rent = predicate.get("channel") === "rent";
        if (!min) min = 0;
        if (!max) {
            if (sale) max = maxValues[0];
            if (rent) max = maxValues[2];
            else max = 0;
        }
        newMinMax = [min.toString(), max.toString()];
        setMinMax(newMinMax);
        onChange(newMinMax);
    }

    return (
        <Formik
            initialValues={{ minPrice: "", maxPrice: "" }}
            onSubmit={(values) => {
                handleSetMinMax(values.minPrice, values.maxPrice);
            }}
        >
            {({ handleSubmit, resetForm }) => (
                <Form onSubmit={handleSubmit} autoComplete="off" className="price-form">
                    <div style={{ position: "relative" }}>
                        <span className="price-label">min price</span>
                        <MyTextInput 
                        placeholder={predicate.has("minMaxPrice") ? predicate.get("minMaxPrice")[0].toString() : ""} 
                        name={"minPrice"} type="number" inputclassname="price-input" 
                        errorclassname="price-error" list="minList" />
                        <datalist id="minList">
                            {predicate.get("channel") === "sale" ? (
                                <>
                                    <option>0</option>
                                    <option>100000</option>
                                    <option>200000</option>
                                    <option>300000</option>
                                    <option>400000</option>
                                    <option>500000</option>
                                    <option>600000</option>
                                    <option>700000</option>
                                    <option>800000</option>
                                    <option>900000</option>
                                </>

                            ) : (
                                <>
                                    <option>0</option>
                                    <option>800</option>
                                    <option>1000</option>
                                    <option>1200</option>
                                    <option>1400</option>
                                    <option>1600</option>
                                    <option>1800</option>
                                    <option>2000</option>
                                    <option>3000</option>
                                    <option>4000</option>
                                </>
                            )}
                        </datalist>
                    </div>
                    <span className="dash"> - </span>
                    <div style={{ position: "relative" }}>
                        <span className="price-label">max price</span>
                        <MyTextInput 
                        placeholder={predicate.has("minMaxPrice") ? predicate.get("minMaxPrice")[1].toString() : ""} 
                        name={"maxPrice"} type="number" inputclassname="price-input" 
                        errorclassname="price-error" list="maxList" />
                        <datalist id="maxList">
                            {predicate.get("channel") === "sale" ? (
                                <>
                                    <option>500000</option>
                                    <option>600000</option>
                                    <option>700000</option>
                                    <option>800000</option>
                                    <option>900000</option>
                                    <option>1000000</option>
                                    <option>1250000</option>
                                    <option>1500000</option>
                                    <option>1750000</option>
                                </>
                            ) : (
                                <>
                                    <option>800</option>
                                    <option>1000</option>
                                    <option>1500</option>
                                    <option>2000</option>
                                    <option>2500</option>
                                    <option>3000</option>
                                    <option>4000</option>
                                    <option>6000</option>
                                    <option>8000</option>
                                </>
                            )}

                        </datalist>
                    </div>
                    <button className="reset-button" type="button"
                        onClick={() => {
                            resetForm();
                            predicate.delete("minMaxPrice");
                        }}>
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