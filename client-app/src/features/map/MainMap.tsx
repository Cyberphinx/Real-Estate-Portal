import React, { RefObject, useRef, useState } from "react";
import './MainMap.css';
import { MapContainer, TileLayer, ZoomControl, LayersControl } from 'react-leaflet'
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import CompanyMarker from "./CompanyMarker";
import ListingMarker from "./ListingMarker";
import SearchMap from "./SearchMap";
import UpdateMap from "./UpdateMap";
import LocateControl from "./LocateControl";
import LeafletGeosearch from "./LeafletGeosearch";
import Toolbar from "./toolbar/Toolbar";
import AgentsLayerControl from "./AgentsLayerControl";
import ToolbarForCompany from "./toolbar/ToolbarForCompany";

interface Props {
    points: GeoJSON.Feature[];
    clusters: any;
    supercluster: any;
    companyPoints: GeoJSON.Feature[];
}

export default observer(function MainMap({ points, clusters, supercluster, companyPoints }: Props) {
    const { featureStore, listingStore, companyStore, mapStore } = useStore();
    const { selectedListing } = listingStore;
    const { selectedCompany } = companyStore;
    const { displayAgents } = mapStore;

    const apikey = process.env.REACT_APP_LOCATION_IQ;
    const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    const apikeyTomtom = process.env.REACT_APP_TOMTOM;
    const tomtomLink = `https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${apikeyTomtom}`;

    const { BaseLayer } = LayersControl;

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

                <ListingMarker points={points} clusters={clusters} supercluster={supercluster} />
                {displayAgents && <CompanyMarker points={companyPoints} />}
                {selectedListing && <Toolbar />}
                {selectedCompany && <ToolbarForCompany />}
                <ZoomControl position="bottomright" />
                <SearchMap />
                <AgentsLayerControl />
                <UpdateMap listing={selectedListing} />
                <LeafletGeosearch apikey={apikey} />
                <LocateControl />
                <LayersControl position="bottomright">
                    <BaseLayer checked name="Map view">
                        <TileLayer
                            url={locationIQLink}
                            attribution='&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
                            opacity={1} zIndex={10}
                        />
                    </BaseLayer>
                    <BaseLayer name="Satellite view">
                        <TileLayer
                            url={tomtomLink}
                            attribution='&copy <a href="https://www.tomtom.com/products/satellite-imagery/">TomTom</a>'
                            opacity={1} zIndex={10}
                        />
                    </BaseLayer>
                </LayersControl>
            </MapContainer>
        </div>
    );
});