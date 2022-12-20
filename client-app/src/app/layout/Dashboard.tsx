import React, { useEffect } from "react";
import './Dashboard.css';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Nav from "./Nav";
import Listings from "../../features/listings/Listings";
import Companies from "../../features/companies/Companies";
import ControlPanel from "../../features/users/controlPanel/ControlPanel";
import AdminPanel from "../../features/users/controlPanel/AdminPanel";
import ListingDetails from "../../features/listings/details/ListingDetails";
import useSupercluster from "use-supercluster";
import { Listing } from "../model/ListingAggregate/Listing";
import { Company } from "../model/Company";
import CompanyDetails from "../../features/companies/details/CompanyDetails";

export default observer(function Dashboard() {
    const { featureStore, listingStore, mapStore, jobStore, companyStore } = useStore();
    const { activeFeature } = featureStore;
    const { loadJobs, jobRegistry } = jobStore;
    const { listings, selectedListing, listingRegistry, loadListings } = listingStore;
    const { companies, selectedCompany, loadCompanies, companyRegistry } = companyStore;
    const { zoom, bounds } = mapStore;

    useEffect(() => {
        if (listingRegistry.size <= 1) loadListings();
    }, [loadListings, listingRegistry.size])

    useEffect(() => {
        if (jobRegistry.size <= 1) loadJobs();
    }, [loadJobs, jobRegistry.size])

    useEffect(() => {
        if (companyRegistry.size <= 1) loadCompanies();
    }, [loadCompanies, companyRegistry.size])

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

    const companyPoints: GeoJSON.Feature[] = companies.map(
        (company: Company) => ({
            type: "Feature",
            properties: {
                cluster: false,
                company: company
            },
            geometry: {
                type: "Point",
                coordinates: [company.companyAddress.coordinates.longitude, company.companyAddress.coordinates.latitude],

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
        <Listings clusters={clusters} supercluster={supercluster} points={points} companyPoints={companyPoints} />,
        <Companies />,
        <ControlPanel />,
        <AdminPanel />
    ]

    return (
        <div style={{ position: "relative" }}>
            <Nav />
            {features[activeFeature]}
            {selectedListing && <ListingDetails listing={selectedListing} />}
            {selectedCompany && <CompanyDetails company={selectedCompany} />}
        </div>
    )
});