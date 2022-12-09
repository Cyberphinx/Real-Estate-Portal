import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { useMap } from "react-leaflet";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import './Locate.css';

interface Props {
    selectedItem: Listing | undefined;
}

export default observer(function Locate({selectedItem}: Props) {
    const map = useMap();

    const flyBack = useCallback(() => {
        map.flyTo([selectedItem!.listingLocation.coordinates.latitude, selectedItem!.listingLocation.coordinates.longitude], 14, {
            duration: 3
        });
    }, [map])

    return (
        <div className="locate-container">
            <button className="locate-button" onClick={() => {
                flyBack();
            }}>
                <img className="locate-icon" src="/assets/pin.svg" alt="locate" />
                <span className="locate-tooltip">Locate on map</span>
            </button>
        </div>
    )
})