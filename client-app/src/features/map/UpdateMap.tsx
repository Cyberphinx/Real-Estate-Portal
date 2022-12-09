import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Listing } from "../../app/model/ListingAggregate/Listing";
import { useStore } from "../../app/stores/store";

interface Props {
    listing: Listing | undefined;
}

export default function UpdateMap({listing}: Props) {
    const { mapStore, featureStore } = useStore();
    const { lat, long, setLat, setLong } = mapStore;
    const {isLocked} = featureStore;

    const map = useMap();

    useEffect(() => {
        if (listing && isLocked) {
            map.flyTo([listing!.listingLocation.coordinates.latitude, listing!.listingLocation.coordinates.longitude], 14, {
                duration: 3
            });
            setLat(0);
            setLong(0);
        }
    }, [listing, lat, long]);

    return null;
}