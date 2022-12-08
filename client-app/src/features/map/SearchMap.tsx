import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import './SearchMap.css';
import { useStore } from "../../app/stores/store";
import { Form, Formik } from "formik";
import LoadingComponent from "../../app/common/loading/LoadingComponent";
import { useMap } from "react-leaflet";

export default observer(function SearchMap() {
    const { mapStore, listingStore } = useStore();
    const { bounds } = mapStore;
    const { setPredicate, loadingInitial } = listingStore

    const map = useMap();

    const [searchText, setSearchText] = useState<string>("");

    function handleSetView(latitude: string, longitude: string) {
        const newMap = map.setView([parseFloat(latitude), parseFloat(longitude)], map.getZoom(), { animate: true, duration: 0.5 });
        return newMap;
    }

    return (
        <div className="search-container">
            {loadingInitial &&
                <div className="loading-markers">
                    <LoadingComponent content={"Loading..."} />
                </div>}
            <Formik
                initialValues={{ searchText: "" }}
                onSubmit={(value) => setSearchText(value.searchText)}
            >
                {({ handleSubmit, handleChange, isSubmitting, resetForm, setFieldValue, isValid, dirty }) => (
                    <Form onSubmit={handleSubmit} onChange={handleChange} autoComplete="off">
                        <div>
                            <button
                                className="search-map"
                                type="button"
                                onClick={() => {
                                    setPredicate("mapBounds", String(bounds));
                                    handleSetView(((bounds[1] + bounds[3]) / 2).toString(), ((bounds[0] + bounds[2]) / 2).toString());
                                    resetForm();
                                }}>
                                <span>Search this area</span>
                                <img className="refresh-icon" src="/assets/refresh4.svg" alt="sort" />
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
})