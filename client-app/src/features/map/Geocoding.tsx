import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { Geocoder, geocoders } from 'leaflet-control-geocoder';


export default function Geocoding() {
    const map = useMap();

    useEffect(() => {
        var geocoder = new Geocoder({
            geocoder: new geocoders.Nominatim(),
            position: 'topleft',
            placeholder: "Search here...",
        })
            .addTo(map);
    }, []);

    return null;
}
