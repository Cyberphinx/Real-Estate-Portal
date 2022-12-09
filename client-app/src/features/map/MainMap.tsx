import React from "react";
import './MainMap.css';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet'
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import CompanyMarker from "./CompanyMarker";
import ListingMarker from "./ListingMarker";
import SearchMap from "./SearchMap";
import UpdateMap from "./UpdateMap";
import { Listing } from "../../app/model/ListingAggregate/Listing";
import LocateControl from "./LocateControl";
import LeafletGeosearch from "./LeafletGeosearch";
import Toolbar from "./toolbar/Toolbar";

interface Props {
    points: GeoJSON.Feature[];
    clusters: any;
    supercluster: any;
}

export default observer(function MainMap({ points, clusters, supercluster }: Props) {
    const { featureStore, listingStore } = useStore();
    const { activeFeature } = featureStore;
    const { selectedListing } = listingStore;

    const apikey = process.env.REACT_APP_LOCATION_IQ;
    const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    // map data into "feature" GeoJson objects
    // const regions: GeoJSON.Feature[] = JSON.parse(eer).map(
    //     (region: any) => ({
    //         type: "Feature",
    //         properties: {
    //             cluster: false,
    //         },
    //         geometry: {
    //             type: "Point",
    //             coordinates: [longitude, latitude],

    //         }
    //     })
    // );

    return (
        <div className="leaflet-container" >
            <MapContainer center={[51.5072, 0.1276]} zoom={9} zoomControl={false}>
                <TileLayer
                    url={locationIQLink}
                    attribution='&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
                    opacity={1} zIndex={10}
                />
                <ZoomControl position="topleft" />
                <SearchMap />
                {activeFeature === 1 ? (<CompanyMarker />) : null}
                <ListingMarker points={points} clusters={clusters} supercluster={supercluster} />
                {/* <GeoJSON data={eer} style={{color:"purple", weight:2, opacity:1, fillOpacity:0.1}} /> */}
                {selectedListing && <Toolbar />}
                <UpdateMap listing={selectedListing} />
                <LeafletGeosearch apikey={apikey} />
                <LocateControl />
            </MapContainer>
        </div>
    );
});