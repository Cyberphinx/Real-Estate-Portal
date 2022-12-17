import React from "react";
import './MainMap.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
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

    return (
        <div className="leaflet-container" >
            <MapContainer center={[51.5072, 0.1276]} zoom={9} zoomControl={false}>
                <TileLayer
                    url={locationIQLink}
                    attribution='&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
                    opacity={1} zIndex={10}
                />
                
                <ListingMarker points={points} clusters={clusters} supercluster={supercluster} />
                {displayAgents && <CompanyMarker points={companyPoints} />}
                {selectedListing && <Toolbar />}
                {selectedCompany && <ToolbarForCompany />}
                
                <ZoomControl position="topleft" />
                <SearchMap />
                <LayersControl />
                <UpdateMap listing={selectedListing} />
                <LeafletGeosearch apikey={apikey} />
                <LocateControl />
            </MapContainer>
        </div>
    );
});