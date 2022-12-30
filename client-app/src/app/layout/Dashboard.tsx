import React, { useEffect, useState } from "react";
import './Dashboard.css';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Nav from "./Nav";
import Listings from "../../features/listings/Listings";
import ControlPanel from "../../features/users/controlPanel/ControlPanel";
import AdminPanel from "../../features/users/controlPanel/AdminPanel";
import useSupercluster from "use-supercluster";
import { Listing } from "../model/ListingAggregate/Listing";
import { Company } from "../model/Company";
import Services from "../../features/networks/Services";
import ListingTab from "../../features/listings/details/ListingTab";
import CompanyTab from "../../features/companies/details/CompanyTab";

export default observer(function Dashboard() {
    const { featureStore, listingStore, mapStore, jobStore, companyStore, userStore, profileStore } = useStore();
    const { activeFeature } = featureStore;
    const { loadJobs } = jobStore;
    const { listings, selectedListing,  loadListings } = listingStore;
    const { companies, selectedCompany, loadCompanies } = companyStore;
    const { zoom, bounds } = mapStore;
    const { user, isLoggedIn } = userStore;
    const { loadUserListings } = profileStore;

    useEffect(() => {
        loadListings();
    }, [loadListings])

    useEffect(() => {
        loadJobs();
    }, [loadJobs])

    useEffect(() => {
        loadCompanies();
    }, [loadCompanies])

    useEffect(() => {
        if (isLoggedIn) {
            loadUserListings(user!.username);
        };
    }, [isLoggedIn, user])

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
                coordinates: [listing.listingLocation.longitude, listing.listingLocation.latitude],

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
                coordinates: [company.companyAddress.longitude, company.companyAddress.latitude],

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
        <Services />,
        <ControlPanel />,
        <AdminPanel />
    ]

    return (
        <div style={{ position: "relative" }}>
            <Nav />
            {features[activeFeature]}
            {selectedListing && <ListingTab listing={selectedListing} />}
            {selectedCompany && <CompanyTab company={selectedCompany} />}
        </div>
    )
});