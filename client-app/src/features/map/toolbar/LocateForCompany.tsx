import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { useMap } from "react-leaflet";
import { Company } from "../../../app/model/CompanyAggregate/Company";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import './Locate.css';

interface Props {
    selectedItem: Company | undefined;
}

export default observer(function Locate({selectedItem}: Props) {
    const {mapStore:{lat, long, setLat, setLong}} = useStore();
    const map = useMap();

    const flyBack = useCallback(() => {
        map.flyTo([selectedItem!.companyAddress.coordinates.latitude, selectedItem!.companyAddress.coordinates.longitude], 14, {
            duration: 3
        });
    }, [map, lat, long])

    return (
        <div className="locate-container">
            <button className="locate-button" onClick={() => {
                setLat(selectedItem!.companyAddress.coordinates.latitude);
                setLong(selectedItem!.companyAddress.coordinates.longitude);
                flyBack();
            }}>
                <img className="locate-icon" src="/assets/pin.svg" alt="locate" />
                {/* <span className="locate-tooltip">Locate on map</span> */}
            </button>
        </div>
    )
})