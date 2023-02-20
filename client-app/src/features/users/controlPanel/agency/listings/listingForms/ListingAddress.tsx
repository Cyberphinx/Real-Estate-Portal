import { useEffect, useState } from "react";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, LocationIQProvider } from 'leaflet-geosearch';
import { observer } from "mobx-react-lite";
import L from "leaflet";
import './ListingForms.css';
import MyTextInput from "../../../../../../app/common/form/MyTextInput";
import { Link } from "react-router-dom";
import { useStore } from "../../../../../../app/stores/store";


interface Props {
    step: number;
    setStep: (value: number) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    getFieldMeta: any;
}

export default observer(function ListingAddress({ step, setStep, setFieldValue, setFieldTouched, getFieldMeta }: Props) {
    const {profileStore : {setActiveTab} } = useStore();
    
    // LEAFLET START
    const apikey = process.env.REACT_APP_LOCATION_IQ;
    const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    const apikeyTomtom = process.env.REACT_APP_TOMTOM;
    const tomtomLink = `https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${apikeyTomtom}`;

    const mapView = L.tileLayer(locationIQLink, { attribution: '&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>' });
    const satelliteView = L.tileLayer(tomtomLink, { attribution: '&copy <a href="https://www.tomtom.com/products/satellite-imagery/">TomTom</a>' });

    var baseMaps = {
        "Map view": mapView,
        "Satellite view": satelliteView
    };
    var layerControl = L.control.layers(baseMaps);

    const currentLat: number = getFieldMeta("listingLocation.latitude").value;
    const currentLng: number = getFieldMeta("listingLocation.longitude").value;
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

    // const baseMap = L.tileLayer(locationIQLink, {
    //     maxZoom: 19,
    //     attribution: '&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
    // });

    var customIcon = L.icon({
        iconUrl: 'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674084107/Icons/here_celvne.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60]
    });

    useEffect(() => {
        var map = L.map('minimap', {
            layers: [mapView, satelliteView]
        }).setView(
            [currentLat ? currentLat : latitude!, currentLng ? currentLng : longitude!],
            13);
        layerControl.addTo(map);
        map.addControl(searchControl);

        var markerGroup = L.layerGroup().addTo(map);

        if (currentLat && currentLng) {
            var prevMarker = L.marker([currentLat, currentLng], {
                draggable: true,
                autoPan: true,
                icon: customIcon
            })
            prevMarker.addTo(markerGroup);
            prevMarker.on('dragend', function (e: any) {
                setLatitude(prevMarker.getLatLng().lat);
                setLongitude(prevMarker.getLatLng().lng);
                setFieldValue("listingLocation.latitude", prevMarker.getLatLng().lat);
                setFieldValue("listingLocation.longitude", prevMarker.getLatLng().lng);
            })
        }

        map.on('geosearch/showlocation', function (e: any) {
            markerGroup.clearLayers();
            console.log(e);

            // setting the variables from Geocoding raw data
            let rawData = e.location;

            let name = rawData.raw.address.name ? rawData.raw.address.name : '';
            let house_number = rawData.raw.address.house_number ? rawData.raw.address.house_number : '';
            let road = rawData.raw.address.road ? rawData.raw.address.road : '';
            let neighbourhood = rawData.raw.address.neighbourhood ? rawData.raw.address.neighbourhood : '';
            let suburb = rawData.raw.address.suburb ? rawData.raw.address.suburb : '';
            let island = rawData.raw.address.island ? rawData.raw.address.island : '';
            let county = rawData.raw.address.county ? rawData.raw.address.county : '';
            let state = rawData.raw.address.state ? rawData.raw.address.state : '';

            let propertyNumberOrName = name ? (house_number ? `${name}, ${house_number}` : name) : house_number;
            let streetName = road ? (neighbourhood ? `${road}, ${neighbourhood}` : road) : neighbourhood;
            let locality = suburb ? (island ? `${suburb}, ${island}` : suburb) : island;
            let countyValue = county ? (state ? `${county}, ${state}` : county) : state;

            // filling the form from Geocoding raw data
            setFieldValue("listingLocation.displayAddress", rawData.label ? rawData.label : '');
            setFieldValue("listingLocation.propertyNumberOrName", propertyNumberOrName);
            setFieldValue("listingLocation.streetName", streetName);
            setFieldValue("listingLocation.locality", locality);
            setFieldValue("listingLocation.townOrCity", rawData.raw.address.city ? rawData.raw.address.city : '');
            setFieldValue("listingLocation.county", countyValue);
            setFieldValue("listingLocation.postalCode", rawData.raw.address.postcode ? rawData.raw.address.postcode : '');
            setFieldValue("listingLocation.country", rawData.raw.address.country ? rawData.raw.address.country : '');
            setFieldValue("listingLocation.latitude", rawData.y ? rawData.y : 0);
            setFieldValue("listingLocation.longitude", rawData.x ? rawData.x : 0);

            var newMarker = L.marker([e.location.y, e.location.x], {
                draggable: true,
                autoPan: true,
                icon: customIcon
            })
            newMarker!.addTo(markerGroup);
            newMarker!.on('dragend', function (e: any) {
                setLatitude(newMarker!.getLatLng().lat);
                setLongitude(newMarker!.getLatLng().lng);
                setFieldValue("listingLocation.latitude", newMarker!.getLatLng().lat);
                setFieldValue("listingLocation.longitude", newMarker!.getLatLng().lng);
            })
        });

        return () => {
            map.removeControl(layerControl);
            map.removeControl(searchControl);
            map.removeLayer(markerGroup);
            map.off();
            map.remove();
        };
    }, [])

    // LEAFLET END


    return (
        <div style={{ position: "relative", padding:'0 2.5rem 1.5rem 2.5rem' }}>
            <p className="minimap__title">Start typing the address in the <b>map</b> search box to locate the <b>marker</b>:</p>
            <div id="minimap"></div>
            <br />
            {/* <p style={{ fontSize: "0.75rem" }}>Latitude meta: {getFieldMeta("listingLocation.latitude").value.toString()}</p> */}
            <div>
                <div className="listing-forms__container">
                    <div style={{ position: "relative" }}>
                        <MyTextInput
                            inputclassname='listing-forms__input-medium'
                            errorclassname='listing-forms__input-error'
                            labelclassname="listing-forms__input-label"
                            name="listingLocation.latitude"
                            label="Latitude for map marker"
                        />
                        <i className="listing-forms__tooltip" style={{ left: "11rem" }}>
                            (drag the marker in the map to change)
                        </i>
                    </div>
                    <div style={{ position: "relative" }}>
                        <MyTextInput
                            inputclassname='listing-forms__input-medium'
                            errorclassname='listing-forms__input-error'
                            labelclassname="listing-forms__input-label"
                            name="listingLocation.longitude"
                            label="Longitude for map marker"
                        />
                        <i className="listing-forms__tooltip" style={{ left: "11.75rem" }}>
                            (drag the marker in the map to change)
                        </i>
                    </div>
                </div>

                <div style={{ position: "relative" }}>
                    <MyTextInput
                        inputclassname='listing-forms__input-long'
                        errorclassname='listing-forms__input-error'
                        labelclassname="listing-forms__input-label"
                        name="listingLocation.displayAddress"
                        label="Display address"
                    />
                    <i className="listing-forms__tooltip" style={{ left: "7.5rem" }}>
                        (address which should be displayed on the property. The full detailed address will only be visible to the agent)
                    </i>
                </div>

                <MyTextInput
                    inputclassname='listing-forms__input-long'
                    errorclassname='listing-forms__input-error'
                    labelclassname="listing-forms__input-label"
                    name="listingLocation.propertyNumberOrName"
                    label="Property number or name"
                />
                <MyTextInput
                    inputclassname='listing-forms__input-long'
                    errorclassname='listing-forms__input-error'
                    labelclassname="listing-forms__input-label"
                    name="listingLocation.streetName"
                    label="Street name"
                />

                <MyTextInput
                    inputclassname='listing-forms__input-long'
                    errorclassname='listing-forms__input-error'
                    labelclassname="listing-forms__input-label"
                    name="listingLocation.locality"
                    label="Locality"
                />
                <div className="listing-forms__container">
                    <MyTextInput
                        inputclassname='listing-forms__input-medium'
                        errorclassname='listing-forms__input-error'
                        labelclassname="listing-forms__input-label"
                        name="listingLocation.townOrCity"
                        label="Town or city"
                        type="text"
                    />
                    <MyTextInput
                        inputclassname='listing-forms__input-medium'
                        errorclassname='listing-forms__input-error'
                        labelclassname="listing-forms__input-label"
                        name="listingLocation.county"
                        label="County / State"
                    />
                </div>

                <div className="listing-forms__container">
                    <MyTextInput
                        inputclassname='listing-forms__input-medium'
                        errorclassname='listing-forms__input-error'
                        labelclassname="listing-forms__input-label"
                        name="listingLocation.postalCode"
                        label="Postcode"
                    />
                    <MyTextInput
                        inputclassname='listing-forms__input-medium'
                        errorclassname='listing-forms__input-error'
                        labelclassname="listing-forms__input-label"
                        name="listingLocation.country"
                        label="Country"
                    />
                </div>
            </div>

            <div className="listing-forms__buttons-container">
                <button
                    type="button"
                    className="listing-forms__button"
                    onClick={() => setActiveTab(0)}
                ><Link to={"/control-panel"} style={{color:'#fff',textDecoration:'none'}}>Cancel</Link></button>
                <button
                    className="listing-forms__button"
                    onClick={() => setStep(1) }
                    type="button"
                >Continue to basic info</button>
            </div>
        </div>
    )
})