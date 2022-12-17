import React from 'react';
import './Listings.css';
import { observer } from "mobx-react-lite";
import ListView from './ListView';
import MainMap from '../map/MainMap';

interface Props {
    clusters: any;
    supercluster: any;
    points: GeoJSON.Feature[];
    companyPoints: GeoJSON.Feature[];
}

export default observer(function Listings({ clusters, supercluster, points, companyPoints }: Props) {

    return (
        <div className='listings-grid'>
            <ListView clusters={clusters} supercluster={supercluster} />
            <MainMap points={points} clusters={clusters} supercluster={supercluster} companyPoints={companyPoints} />
        </div>
    );
})