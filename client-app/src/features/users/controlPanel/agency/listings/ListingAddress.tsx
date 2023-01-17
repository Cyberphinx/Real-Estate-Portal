import { useCallback, useEffect, useMemo, useState } from "react";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, LocationIQProvider } from 'leaflet-geosearch';
import { observer } from "mobx-react-lite";
import MyTextInput from "../../../../../app/common/form/MyTextInput";
import L from "leaflet";
import './ListingAddress.css';


interface Props {
    setFieldValue: any;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    getFieldMeta: any;
    // rawData: any;
    // setRawData: (value: any) => void;
    // latitude: number | undefined;
    // setLatitude: (value: number) => void;
    // longitude: number | undefined;
    // setLongitude: (value: number) => void;
}

export default observer(function ListingAddress({ setFieldValue, setFieldTouched, getFieldMeta,
    // rawData, setRawData, latitude, setLatitude, longitude, setLongitude 
}: Props) {
    // LEAFLET START
    const apikey = process.env.REACT_APP_LOCATION_IQ;
    const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    const [rawData, setRawData] = useState<any>();
    const [latitude, setLatitude] = useState<number | undefined>(51.505);
    const [longitude, setLongitude] = useState<number | undefined>(-0.09);

    const provider = new LocationIQProvider({
        params: {
            key: apikey!,
            countrycodes: "gb",
            addressdetails: 1,
            normalizeaddress: 1,
        },
    });

    const searchControl = new (GeoSearchControl as any)({
        provider: provider,
        style: 'bar',
        showMarker: false,
        // marker: customMarker,
    });

    const baseMap = L.tileLayer(locationIQLink, {
        maxZoom: 19,
        attribution: '&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
    })

    const currentLat: number = getFieldMeta("listingLocation.latitude").value;
    const currentLng: number = getFieldMeta("listingLocation.longitude").value;

    useEffect(() => {
        var map = L.map('minimap').setView(
            [currentLat ? currentLat : latitude!, currentLng ? currentLng : longitude!],
            13);
        baseMap.addTo(map);
        map.addControl(searchControl);

        if (currentLat && currentLng) {
            var prevMarker = L.marker([currentLat, currentLng], {
                draggable: true,
                autoPan: true
            })
            prevMarker.addTo(map);
            prevMarker.on('dragend', function (e: any) {
                setLatitude(prevMarker.getLatLng().lat);
                setLongitude(prevMarker.getLatLng().lng);
                setFieldValue("listingLocation.latitude", prevMarker.getLatLng().lat);
                setFieldValue("listingLocation.longitude", prevMarker.getLatLng().lng);
            })
        }

        map.on('geosearch/showlocation', function (e: any) {
            console.log(e);
            setRawData(e.location);
            var marker = L.marker([e.location.y, e.location.x], {
                draggable: true,
                autoPan: true
            })

            marker!.addTo(map);
            marker!.on('dragend', function (e: any) {
                setLatitude(marker!.getLatLng().lat);
                setLongitude(marker!.getLatLng().lng);
                setFieldValue("listingLocation.latitude", marker!.getLatLng().lat);
                setFieldValue("listingLocation.longitude", marker!.getLatLng().lng);
            })
        });

        return () => {
            map.removeLayer(baseMap);
            map.removeControl(searchControl);
            map.off();
            map.remove();
        };
    }, [])

    // LEAFLET END

    const [displayAddress, setDisplayAddress] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [house_number, setHouse_number] = useState<string>("");
    const [road, setRoad] = useState<string>("");
    const [neighbourhood, setNeighbourhood] = useState<string>("");
    const [suburb, setSuburb] = useState<string>("");
    const [island, setIsland] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [county, setCounty] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [postcode, setPostcode] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    const propertyNumberOrName = name ? (house_number ? `${name}, ${house_number}` : name) : house_number;
    const streetName = road ? (neighbourhood ? `${road}, ${neighbourhood}` : road) : neighbourhood;
    const locality = suburb ? (island ? `${suburb}, ${island}` : suburb) : island;
    const countyValue = county ? (state ? `${county}, ${state}` : county) : state;

    useEffect(() => {
        if (rawData) {
            // setting the state variables from Geocoding raw data
            setDisplayAddress(rawData.label ? rawData.label : '');
            setName(rawData.raw.address.name ? rawData.raw.address.name : '');
            setHouse_number(rawData.raw.address.house_number ? rawData.raw.address.house_number : '');
            setRoad(rawData.raw.address.road ? rawData.raw.address.road : '');
            setNeighbourhood(rawData.raw.address.neighbourhood ? rawData.raw.address.neighbourhood : '');
            setSuburb(rawData.raw.address.suburb ? rawData.raw.address.suburb : '');
            setIsland(rawData.raw.address.island ? rawData.raw.address.island : '');
            setCity(rawData.raw.address.city ? rawData.raw.address.city : '');
            setCounty(rawData.raw.address.county ? rawData.raw.address.county : '');
            setState(rawData.raw.address.state ? rawData.raw.address.state : '');
            setPostcode(rawData.raw.address.postcode ? rawData.raw.address.postcode : '');
            setCountry(rawData.raw.address.country ? rawData.raw.address.country : '');
            setLatitude(rawData.y ? rawData.y : 0);
            setLongitude(rawData.x ? rawData.x : 0);

            setFieldValue("listingLocation.displayAddress", displayAddress);
            setFieldValue("listingLocation.propertyNumberOrName", propertyNumberOrName);
            setFieldValue("listingLocation.streetName", streetName);
            setFieldValue("listingLocation.locality", locality);
            setFieldValue("listingLocation.townOrCity", city);
            setFieldValue("listingLocation.county", countyValue);
            setFieldValue("listingLocation.postalCode", postcode);
            setFieldValue("listingLocation.country", country);
            setFieldValue("listingLocation.latitude", latitude);
            setFieldValue("listingLocation.longitude", longitude);
        }
    }, [rawData, setFieldValue, displayAddress, propertyNumberOrName, streetName, locality, city, countyValue, postcode, country])

    // const mapRef = useRef<any>();
    // const resizeMap = (mapRef: RefObject<any>) => {
    //     const resizeObserver = new ResizeObserver(() => mapRef.current?.invalidateSize())
    //     const container = document.getElementById('map-container')
    //     if (container) {
    //         resizeObserver.observe(container)
    //     }
    // }

    return (
        <article className="listing-form-contents">
            <p className="listing-form-title">Listing location:</p>
            <div style={{ position: "relative" }}>
                <div id="minimap"></div>
                <br />
                {/* <p style={{ fontSize: "0.75rem" }}>Latitude meta: {getFieldMeta("listingLocation.latitude").value.toString()}</p> */}
                <div>
                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.latitude"
                        label="Latitude for map marker"
                    />

                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.longitude"
                        label="Longitude for map marker"
                    />
                    
                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.displayAddress"
                        label="Display address"
                    />

                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.propertyNumberOrName"
                        label="Property number or name"
                    />

                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.streetName"
                        label="Street name"
                    />

                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.locality"
                        label="Locality"
                    />

                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.townOrCity"
                        label="Town or city"
                        type="text"
                    />

                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.county"
                        label="County"
                    />

                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.postalCode"
                        label="Postcode"
                    />

                    <MyTextInput
                        inputclassname='listing-location__input-style'
                        errorclassname='register-form-error'
                        labelclassname="listing-location__input-label"
                        name="listingLocation.country"
                        label="Country"
                    />

                </div>
            </div>
        </article>

    )
})