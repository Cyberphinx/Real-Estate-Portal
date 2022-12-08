import { Listing } from './../model/ListingAggregate/Listing';
import { createRef } from 'react';
import { makeAutoObservable } from 'mobx';

export default class MapStore {
    activeListing: Listing | null = null;
    zoom: number = 13;
    leaves: any[] = [];
    bounds: any;
    mapListings: any;
    clusters: any;
    supercluster: any;
    lat: number = 51.5072;
    long: number = 0.1276;

    mapRef: any = createRef();

    constructor() {
        makeAutoObservable(this);
    }

    setActiveListing = (listing: Listing | null) => { this.activeListing = listing };

    setZoom = (value: number) => { this.zoom = value };

    setLeaves = (values: any[]) => { this.leaves = values };

    setBounds = (value: any) => { this.bounds = value };

    setLat = (value: number) => { this.lat = value };
    setLong = (value: number) => { this.long = value };

    setMapListings = (values: any) => { this.mapListings = values };
    
}