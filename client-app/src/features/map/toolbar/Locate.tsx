import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { useMap } from "react-leaflet";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import './Locate.css';

interface Props {
    selectedItem: Listing | undefined;
}

export default observer(function Locate({selectedItem}: Props) {
    const {mapStore:{lat, long, setLat, setLong}} = useStore();
    const map = useMap();

    const flyBack = useCallback(() => {
        map.flyTo([selectedItem!.listingLocation.latitude, selectedItem!.listingLocation.longitude], 14, {
            duration: 3
        });
    }, [map, lat, long])

    return (
        <div className="locate-container">
            <button className="locate-button" onClick={() => {
                setLat(selectedItem!.listingLocation.latitude);
                setLong(selectedItem!.listingLocation.longitude);
                flyBack();
            }}>
                <img className="locate-icon" src="/assets/pin.svg" alt="locate" />
                {/* <span className="locate-tooltip">Locate on map</span> */}
            </button>
        </div>
    )
})