import { observer } from "mobx-react-lite";
import React from "react";
import { Company } from "../../model/CompanyAggregate/Company";
import { Listing } from "../../model/ListingAggregate/Listing";
import { useStore } from "../../stores/store";
import './Locate.css';

interface Props {
    selectedItem: Listing | Company | undefined | any;
}

export default observer(function Locate({selectedItem}: Props) {
    const {mapStore} = useStore();
    const {setLat, setLong} = mapStore;

    return (
        <div className="locate-container">
            <button className="locate-button" onClick={() => {
                setLat(selectedItem!.listingLocation.coordinates.latitude);
                setLong(selectedItem!.listingLocation.coordinates.longitude);
            }}>
                <img className="locate-icon" src="/assets/pin.svg" alt="locate" />
                <span className="locate-tooltip">Locate on map</span>
            </button>
        </div>
    )
})