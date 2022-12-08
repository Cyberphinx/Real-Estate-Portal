import React, { useEffect } from "react";
import './Dashboard.css';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Nav from "./Nav";
import CompanyTab from "../../features/companies/details/CompanyTab";
import MainMap from "../../features/map/MainMap";
import Listings from "../../features/listings/Listings";
import Companies from "../../features/companies/Companies";
import ControlPanel from "../../features/users/controlPanel/ControlPanel";
import AdminPanel from "../../features/users/controlPanel/AdminPanel";
import ListingDetails from "../../features/listings/details/ListingDetails";
import useSupercluster from "use-supercluster";
import { Listing } from "../model/ListingAggregate/Listing";
import ServicesHub from "../../features/companies/servicesHub/ServicesHub";

export default observer(function Dashboard() {
    const { featureStore, listingStore, mapStore } = useStore();
    const { activeFeature } = featureStore;
    const { listings, selectedListing, selectedCompany } = listingStore;
    const { zoom, bounds } = mapStore;

    useEffect(() => {
        listingStore.loadListings();
        // listingStore.loadMaxValues();
        // listingStore.loadCompanies();
    }, [listingStore])

    // useEffect(() => {
    //     cityStore.loadCities();
    // }, [cityStore])

    // map data into "feature" GeoJson objects
    const points: GeoJSON.Feature[] = listings.map(
        (listing: Listing) => ({
            type: "Feature",
            properties: {
                cluster: false,
                listing: listing
            },
            geometry: {
                type: "Point",
                coordinates: [listing.listingLocation.coordinates.longitude, listing.listingLocation.coordinates.latitude],

            }
        })
    );

     // get clusters
     const { clusters, supercluster } = useSupercluster({
        points: points,
        bounds: bounds,
        zoom: zoom,
        options: { radius: 100, maxZoom: 20 }
    });

    const features = [
        <Listings clusters={clusters} supercluster={supercluster} />,
        <Companies />,
        <ControlPanel />,
        <AdminPanel />
    ]

    return (
        <div style={{position: "relative"}}>
            <Nav />
            <div className="dashboard-container">
                {features[activeFeature]}
                {activeFeature > 0 ? null 
                : <MainMap points={points} clusters={clusters} supercluster={supercluster} listing={selectedListing} /> }
                {activeFeature === 1 && <ServicesHub />}
            </div>
                {selectedListing && <ListingDetails listing={selectedListing} />}
                {selectedCompany && <CompanyTab />}
        </div>
    )
});