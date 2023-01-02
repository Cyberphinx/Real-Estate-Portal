import { useEffect } from "react";
import { useMap } from "react-leaflet";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, LocationIQProvider } from 'leaflet-geosearch';
import './MainMap.css';

interface Props {
    apikey: string | undefined;
}

export default function LeafletGeosearch({apikey}: Props) {

    const provider = new LocationIQProvider({
        params: {
            key: apikey!,
            countrycodes: "gb"
        },
    });

    const searchControl = new (GeoSearchControl as any)({
        provider,
        style: 'bar',
    });

    const map = useMap();

    useEffect(() => {
        map.addControl(searchControl);
        return () => { map.removeControl(searchControl) };
    }, []);

    return null;
}
