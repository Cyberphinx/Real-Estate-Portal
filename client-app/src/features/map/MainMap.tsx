import React, { RefObject, useRef } from "react";
import './MainMap.css';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet'
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import CompanyMarker from "./CompanyMarker";
import ListingMarker from "./ListingMarker";
import SearchMap from "./SearchMap";
import UpdateMap from "./UpdateMap";
import LocateControl from "./LocateControl";
import LeafletGeosearch from "./LeafletGeosearch";
import Toolbar from "./toolbar/Toolbar";
import LayersControl from "./LayersControl";
import ToolbarForCompany from "./toolbar/ToolbarForCompany";

interface Props {
    points: GeoJSON.Feature[];
    clusters: any;
    supercluster: any;
    companyPoints: GeoJSON.Feature[];
}

export default observer(function MainMap({ points, clusters, supercluster, companyPoints }: Props) {
    const { featureStore, listingStore, companyStore, mapStore } = useStore();
    const { activeFeature } = featureStore;
    const { selectedListing } = listingStore;
    const { selectedCompany } = companyStore;
    const { displayAgents } = mapStore;

    const apikey = process.env.REACT_APP_LOCATION_IQ;
    const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    const mapRef = useRef<any>();
    const resizeMap = (mapRef: RefObject<any>) => {
        const resizeObserver = new ResizeObserver(() => mapRef.current?.invalidateSize())
        const container = document.getElementById('map-container')
        if (container) {
            resizeObserver.observe(container)
        }
    }

    return (
        <div className="leaflet-container" >
            <MapContainer
                center={[51.5072, 0.1276]}
                zoom={9}
                zoomControl={false}
                ref={mapRef}
                whenReady={() => resizeMap(mapRef)}
                id="map-container"
            >
                <TileLayer
                    url={locationIQLink}
                    attribution='&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
                    opacity={1} zIndex={10}
                />

                <ListingMarker points={points} clusters={clusters} supercluster={supercluster} />
                {displayAgents && <CompanyMarker points={companyPoints} />}
                {selectedListing && <Toolbar />}
                {selectedCompany && <ToolbarForCompany />}

                <ZoomControl position="bottomright" />
                <SearchMap />
                <LayersControl />
                <UpdateMap listing={selectedListing} />
                <LeafletGeosearch apikey={apikey} />
                <LocateControl />
            </MapContainer>
        </div>
    );
});