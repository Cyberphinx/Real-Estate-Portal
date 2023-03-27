import React, { useEffect } from "react";
import './HomePage.css';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Nav from "./Nav";
import Listings from "../../features/listings/Listings";
import ControlPanel from "../../features/users/controlPanel/ControlPanel";
import AdminPanel from "../../features/users/controlPanel/AdminPanel";
import useSupercluster from "use-supercluster";
import { Listing } from "../model/ListingAggregate/Listing";
import { Company } from "../model/Company";
import Services from "../../features/services/Services";
import ListingTab from "../../features/listings/details/ListingTab";
import CompanyTab from "../../features/companies/details/CompanyTab";
import { useLocation } from "react-router-dom";
import ConfirmEmail from "../../features/users/register/ConfirmEmail";
import useWindowSize from "../hooks/useWindowSize";
import NavMobile from "./NavMobile";

export default observer(function HomePage() {
    const { featureStore, listingStore, mapStore, jobStore, companyStore, userStore, profileStore, modalStore } = useStore();
    const { activeFeature } = featureStore;
    const { loadJobs } = jobStore;
    const { listings, selectedListing, loadListings } = listingStore;
    const { companies, selectedCompany, loadCompanies } = companyStore;
    const { zoom, bounds } = mapStore;
    const { user, isLoggedIn } = userStore;
    const { loadUserListings } = profileStore;

    const location = useLocation();

    const { width } = useWindowSize();

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

    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === "/account/verifyEmail") modalStore.openModal(<ConfirmEmail />);
    }, [])

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
        options: { radius: 80, maxZoom: 16 }
    });


    const features = [
        <Listings clusters={clusters} supercluster={supercluster} points={points} companyPoints={companyPoints} />,
        <Services />,
        <ControlPanel />,
        <AdminPanel />
    ]

    return (
        <div style={{ position: "relative" }}>
            {width < 641 ?
                <>
                    <NavMobile />
                    <div style={{padding:'6rem 1rem 1rem 1rem',textAlign:'center'}}>
                        <p style={{fontSize:'1.5rem'}}>Mobile version coming soon.</p>
                        <p style={{fontSize:'1rem'}}>For the time being, please visit on a bigger screen device for best user experience.</p>
                    </div>
                </>
                :
                <>
                    <Nav />
                    {features[activeFeature]}
                    {selectedListing && <ListingTab listing={selectedListing} />}
                    {selectedCompany && <CompanyTab company={selectedCompany} />}
                </>}
        </div>
    )
});