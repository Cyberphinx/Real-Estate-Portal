import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, LocationIQProvider } from 'leaflet-geosearch';
import { observer } from "mobx-react-lite";
import MyTextInput from "../../../../../app/common/form/MyTextInput";
import L from "leaflet";
import './ListingAddress.css';
import { useDebounce } from "../../../../../app/hooks/useDebounce";
import { LocationRaw } from "../../../../../app/model/LocationRaw";


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
    // debouncedHandler: any;
}

export default observer(function ListingAddressTest({ setFieldValue, setFieldTouched, getFieldMeta,
    // rawData, setRawData, latitude, setLatitude, longitude, setLongitude, debouncedHandler
}: Props) {
    const apikey = process.env.REACT_APP_LOCATION_IQ;
    const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    const [value, setValue] = useState<string>("");
    const [rawData, setRawData] = useState<any>();
    // const [latitude, setLatitude] = useState<number | undefined>(51.505);
    // const [longitude, setLongitude] = useState<number | undefined>(-0.09);
    const [latitude, setLatitude] = useState<number | undefined>();
    const [longitude, setLongitude] = useState<number | undefined>();

    const lat = getFieldMeta("listingLocation.latitude")
    const lng = useRef<number>();

    const handleSearchChange = (e: any) => {
        setValue(e.target.value);
    };
    const debouncedHandler = useDebounce(handleSearchChange, 500);

    const provider = useMemo(() => {
        return new LocationIQProvider({
            params: {
                key: apikey!,
                countrycodes: "gb",
                addressdetails: 1,
                normalizeaddress: 1,
            },
        });
    }, [apikey])

    const baseMap = L.tileLayer(locationIQLink, {
        maxZoom: 19,
        attribution: '&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
    })

    const fetchData = useCallback(async () => {
        try {
            const results = await provider.search({ query: value });
            setRawData(results);
        } catch (error) {
            console.log(error);
        }
    }, [provider, value])

    useEffect(() => {
        if (value.length > 0) fetchData();
    }, [value, fetchData]);

    // useEffect(() => {
    //     var map = L.map('minimap').setView([latitude!, longitude!], 13);
    //     baseMap.addTo(map);

    //     var listingMarker = L.marker([latitude!, longitude!], {
    //         draggable: true,
    //         autoPan: true
    //     })
    //     listingMarker.addTo(map);

    //     return () => {
    //         map.removeLayer(baseMap);
    //         map.removeLayer(listingMarker);
    //         map.off();
    //         map.remove();
    //     };
    // }, [])

    const handleRawData = useCallback((item: LocationRaw) => {
        setDisplayAddress(item.raw.display_name ? item.raw.display_name : "");
        setLatitude(item.y ? item.y : 0);
        setLongitude(item.x ? item.x : 0);
        setRawData(null);
    }, [])

    useEffect(() => {
        if (latitude && longitude) {
            var map = L.map('minimap').setView([latitude!, longitude!], 13);
            baseMap.addTo(map);
            var marker = L.marker([latitude!, longitude!], {
                draggable: true,
                autoPan: true
            })
            marker.addTo(map);
            return () => {
                map.removeLayer(baseMap);
                map.off();
                map.remove();
            };
        }
    }, [latitude, longitude, baseMap])

    const [displayAddress, setDisplayAddress] = useState<string>("");
    // const [name, setName] = useState<string>("");
    // const [house_number, setHouse_number] = useState<string>("");
    // const [road, setRoad] = useState<string>("");
    // const [neighbourhood, setNeighbourhood] = useState<string>("");
    // const [suburb, setSuburb] = useState<string>("");
    // const [island, setIsland] = useState<string>("");
    // const [city, setCity] = useState<string>("");
    // const [county, setCounty] = useState<string>("");
    // const [state, setState] = useState<string>("");
    // const [postcode, setPostcode] = useState<string>("");
    // const [country, setCountry] = useState<string>("");

    // const propertyNumberOrName = name ? (house_number ? `${name}, ${house_number}` : name) : house_number;
    // const streetName = road ? (neighbourhood ? `${road}, ${neighbourhood}` : road) : neighbourhood;
    // const locality = suburb ? (island ? `${suburb}, ${island}` : suburb) : island;
    // const countyValue = county ? (state ? `${county}, ${state}` : county) : state;

    const setValues = useCallback(() => {
        setFieldValue("listingLocation.latitude", latitude);
        setFieldValue("listingLocation.longitude", longitude);
        setFieldValue("listingLocation.displayAddress", displayAddress);
    }, [setFieldValue, latitude, longitude, displayAddress])

    useEffect(() => {
        setValues();
    }, [setValues])

    return (
        <div style={{ position: "relative" }}>
            <br />
            <MyTextInput
                inputclassname="register-address-search"
                errorclassname='register-form-error'
                type="text"
                onChange={debouncedHandler}
                placeholder="Start typing the address or postcode..."
                name="addressSearch"
            />

            {rawData ?
                <div className="address-search-dropdown">
                    {rawData.map((item: LocationRaw) => (
                        <div className="address-search-item-container" key={item.raw.place_id}>
                            <p className="address-search-item"
                                onClick={() => {
                                    handleRawData(item);
                                    // setting the state variables from Geocoding raw data
                                    // setName(item.raw.address.name ? item.raw.address.name : "");
                                    // setHouse_number(item.raw.address.house_number ? item.raw.address.house_number : "");
                                    // setRoad(item.raw.address.road ? item.raw.address.road : "");
                                    // setNeighbourhood(item.raw.address.neighbourhood ? item.raw.address.neighbourhood : "");
                                    // setSuburb(item.raw.address.suburb ? item.raw.address.suburb : "");
                                    // setIsland(item.raw.address.island ? item.raw.address.island : "");
                                    // setCity(item.raw.address.city ? item.raw.address.city : "");
                                    // setCounty(item.raw.address.county ? item.raw.address.county : "");
                                    // setState(item.raw.address.state ? item.raw.address.state : "");
                                    // setPostcode(item.raw.address.postcode ? item.raw.address.postcode : "");
                                    // setCountry(item.raw.address.country ? item.raw.address.country : "");


                                    // set field values from state variables
                                    // setFieldValue("listingLocation.displayAddress", displayAddress);
                                    // setFieldValue("listingLocation.propertyNumberOrName", propertyNumberOrName);
                                    // setFieldValue("listingLocation.locality", locality);
                                    // setFieldValue("listingLocation.streetName", streetName);
                                    // setFieldValue("listingLocation.townOrCity", city);
                                    // setFieldValue("listingLocation.county", countyValue);
                                    // setFieldValue("listingLocation.postalCode", postcode);
                                    // setFieldTouched("listingLocation.postalCode", true);
                                    // setFieldValue("listingLocation.country", country);
                                    // setFieldValue("listingLocation.latitude", latitude);
                                    // setFieldValue("listingLocation.longitude", longitude);
                                    // setShowAddressInputs(true);
                                }}
                            >{item.raw.display_name}</p>
                        </div>
                    ))}
                </div>
                : null
            }
            <br />
            <p>Lat: {latitude}</p>
            <p>Lng: {longitude}</p>
            {latitude && longitude ?
                <>
                    <div id="minimap"></div>
                    <br />
                    <div>
                        <MyTextInput
                            inputclassname='listing-location__input-style'
                            errorclassname='register-form-error'
                            labelclassname="listing-location__input-label"
                            name="listingLocation.latitude"
                            label="Latitude"
                        />

                        <MyTextInput
                            inputclassname='listing-location__input-style'
                            errorclassname='register-form-error'
                            labelclassname="listing-location__input-label"
                            name="listingLocation.longitude"
                            label="Longitude"
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
                </> : null}

        </div>
    )
})