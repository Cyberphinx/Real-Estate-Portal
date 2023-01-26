import { useEffect } from "react";
import { useMap } from "react-leaflet";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, LocationIQProvider } from 'leaflet-geosearch';
import './MainMap.css';
import L from "leaflet";

interface Props {
    apikey: string | undefined;
}

export default function LeafletGeosearch({apikey}: Props) {
    const customIcon = L.icon({
        iconUrl: 'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674084107/Icons/here_celvne.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60]
    });

    // instance of L.Marker, see http://leafletjs.com/reference.html#marker
    const myCustomMarker = {
        icon: customIcon,
        draggable: false,
      }

    const provider = new LocationIQProvider({
        params: {
            key: apikey!,
            countrycodes: "gb"
        },
    });

    const searchControl = new (GeoSearchControl as any)({
        provider,
        style: 'bar',
        showMarker: true,
        marker: myCustomMarker
    });

    const map = useMap();

    useEffect(() => {
        map.addControl(searchControl);
        return () => { map.removeControl(searchControl) };
    }, []);

    return null;
}
