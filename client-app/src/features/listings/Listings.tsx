import React, { useEffect } from 'react';
import './Listings.css';
import { observer } from "mobx-react-lite";
import ListView from './ListView';
import MainMap from '../map/MainMap';
import ListingFilters from './filters/ListingFilters';
import { useStore } from '../../app/stores/store';

interface Props {
    clusters: any;
    supercluster: any;
    points: GeoJSON.Feature[];
    companyPoints: GeoJSON.Feature[];
}

export default observer(function Listings({ clusters, supercluster, points, companyPoints }: Props) {
    const {listingStore} = useStore();
    const {loadListings} = listingStore;

    // useEffect(() => {
    //     loadListings();
    // }, [loadListings])

    // useEffect(() => {
    //     loadJobs();
    // }, [loadJobs])

    // useEffect(() => {
    //     loadCompanies();
    // }, [loadCompanies])

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         loadUserListings(user!.username);
    //     };
    // }, [isLoggedIn, user])

    return (
        <div className='listings-grid'>
            <div>
            <ListingFilters />
            <ListView clusters={clusters} supercluster={supercluster} />
            </div>
            <MainMap points={points} clusters={clusters} supercluster={supercluster} companyPoints={companyPoints} />
        </div>
    );
})