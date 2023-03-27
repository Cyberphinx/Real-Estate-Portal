import React, { useEffect } from "react";
import './AgentDashboard.css';
import { observer } from "mobx-react-lite";
import { GeoSearchControl, LocationIQProvider } from "leaflet-geosearch";
import L from "leaflet";
import { accountTypeSwitch, User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";

interface Props {
    user: User | null;
}

export default observer(function AgentDashboard({ user }: Props) {
    const { profileStore } = useStore();
    const { profile, headquarter } = profileStore;
    
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

    const provider = new LocationIQProvider({
        params: {
            key: apikey!,
            countrycodes: "gb",
            addressdetails: 1,
            normalizeaddress: 1,
        },
    });

    const customIcon = L.icon({
        iconUrl: 'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674084107/Icons/here_celvne.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60]
    });

    const searchControl = new (GeoSearchControl as any)({
        provider: provider,
        style: 'bar',
        showMarker: true,
        marker: {
            icon: customIcon,
            draggable: false,
        },
    });

    useEffect(() => {
        var map = L.map('agencymap').setView([51.505, -0.09], 13);
        mapView.addTo(map);
        map.addControl(searchControl);


        return () => {
            map.removeControl(searchControl);
            map.off();
            map.remove();
        };
    }, [])

    // LEAFLET END

    return (
        <div className="agency-dashboard">
            <div id="agencymap" />
            <div>
                <div className="agency-dashboard__section-two">
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0', margin: '0' }}>{user?.displayName ? user.displayName : user?.username}</p>
                    <p>Account type: {user && accountTypeSwitch(user!)}</p>
                    <p>Email address: {user?.email}</p>
                    <p>Country: {user?.country}</p>
                    <p>Language: {user?.language}</p>
                    <p>Change password</p>
                    <p>Membership status: Active</p>
                    <p>Invoices</p>
                </div>
                {/* <div className="agency-dashboard__section-two">
                    <p>Compliance</p>
                    <p>Redress Scheme: The Property Ombudsman</p>
                    <p>Professional Indemnity Insurance</p>
                    <p>ICO Regisgtration</p>
                    <p>Professional Indemnity Insurance</p>
                </div> */}
            </div>
        </div>
    )
})