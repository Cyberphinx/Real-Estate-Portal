import { useEffect, useState } from "react";
import 'leaflet-geosearch/dist/geosearch.css';
import { LocationIQProvider } from 'leaflet-geosearch';
import { LocationRaw } from "../../../app/model/LocationRaw";
import { useDebounce } from "../../../app/hooks/useDebounce";
import './RegisterForm.css';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { countryOptions } from "../../../app/common/form/countryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";

interface Props {
    setFieldValue: any;
    handleChange: (e: any) => void;
}

export default function AddressSearch({ setFieldValue, handleChange }: Props) {

    const apikey = process.env.REACT_APP_LOCATION_IQ;
    const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    const [value, setValue] = useState<string>("");
    const [rawResults, setRawResults] = useState<any>();
    const [showAddressInputs, setShowAddressInputs] = useState<boolean>(false);

    // const [displayAddress, setDisplayAddress] = useState<string>("");

    const [name, setName] = useState<string | undefined>("");
    const [house_number, setHouse_number] = useState<string | undefined>("");
    const [road, setRoad] = useState<string | undefined>("");
    const [neighbourhood, setNeighbourhood] = useState<string | undefined>("");
    const [suburb, setSuburb] = useState<string | undefined>("");
    const [island, setIsland] = useState<string | undefined>("");
    const [city, setCity] = useState<string | undefined>("");
    const [county, setCounty] = useState<string | undefined>("");
    const [state, setState] = useState<string | undefined>("");
    // const [state_code, setState_code] = useState<string | undefined>("");
    const [postcode, setPostcode] = useState<string | undefined>("");
    // const [country, setCountry] = useState<string | undefined>("");
    // const [country_code, setCountry_code] = useState<string | undefined>("");
    // const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09])

    const handleSearchChange = (e: any) => {
        setValue(e.target.value);
    };
    const debouncedHandler = useDebounce(handleSearchChange, 500);

    const provider = new LocationIQProvider({
        params: {
            key: apikey!,
            countrycodes: "gb",
            addressdetails: 1,
            normalizeaddress: 1,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await provider.search({ query: value });
                setRawResults(results);
            } catch (error) {
                console.log(error);
            }
        }
        if (value.length > 0) fetchData();
    }, [value]);

    // useEffect(() => {
    //     if (rawResults) console.log(rawResults);
    // }, [rawResults])

    const [address1, setAddress1] = useState<string | undefined>("");
    const propertyNumberOrName = name ? (house_number ? `${name}, ${house_number}` : name) : house_number;

    const [address2, setAddress2] = useState<string | undefined>("");
    const streetName = road ? (neighbourhood ? `${road}, ${neighbourhood}` : road) : neighbourhood;

    const [address3, setAddress3] = useState<string | undefined>("");
    const locality = suburb ? (island ? `${suburb}, ${island}` : suburb) : island;

    const [address4, setAddress4] = useState<string | undefined>("");

    const [address5, setAddress5] = useState<string | undefined>("");
    const countyValue = county ? (state ? `${county}, ${state}` : county) : state;

    const [address6, setAddress6] = useState<string | undefined>("");


    useEffect(() => {
        setAddress1(propertyNumberOrName);
    }, [propertyNumberOrName])

    useEffect(() => {
        setAddress2(streetName);
    }, [streetName])

    useEffect(() => {
        setAddress3(locality);
    }, [locality])

    useEffect(() => {
        setAddress4(city);
    }, [city])

    useEffect(() => {
        setAddress5(countyValue);
    }, [countyValue])

    useEffect(() => {
        setAddress6(postcode);
        setFieldValue("legalCompanyAddress.postalCode", postcode);
    }, [postcode])

    return (
        <div>
            <MyTextInput
                inputclassname="register-address-search"
                errorclassname='register-form-error'
                type="text"
                onChange={debouncedHandler}
                placeholder="Start typing the address or postcode..."
                name="addressSearch"
            />


            {rawResults
                ?
                <div className="address-search-dropdown">
                    {rawResults.map((item: LocationRaw) => (
                        <div className="address-search-item-container" key={item.raw.place_id}>
                            <p className="address-search-item"
                                onClick={() => {
                                    // setting the state variables from Geocoding raw data
                                    setName(item.raw.address.name ? item.raw.address.name : "");
                                    setHouse_number(item.raw.address.house_number ? item.raw.address.house_number : "");
                                    setRoad(item.raw.address.road ? item.raw.address.road : "");
                                    setNeighbourhood(item.raw.address.neighbourhood ? item.raw.address.neighbourhood : "");
                                    setSuburb(item.raw.address.suburb ? item.raw.address.suburb : "");
                                    setIsland(item.raw.address.island ? item.raw.address.island : "");
                                    setCity(item.raw.address.city ? item.raw.address.city : "");
                                    setCounty(item.raw.address.county ? item.raw.address.county : "");
                                    setState(item.raw.address.state ? item.raw.address.state : "");
                                    // setState_code(item.raw.address.state_code ? item.raw.address.state_code : "");
                                    setPostcode(item.raw.address.postcode ? item.raw.address.postcode : "");
                                    // setCountry(item.raw.address.country ? item.raw.address.country : "");
                                    // setCountry_code(item.raw.address.country_code ? item.raw.address.country_code : "");
                                    // setPosition([item.y, item.x]);
                                    setFieldValue("legalCompanyAddress.latitude", item.y);
                                    setFieldValue("legalCompanyAddress.longitude", item.x);
                                    setRawResults(null);
                                    setShowAddressInputs(true);
                                }}
                            >{item.raw.display_name}</p>
                        </div>
                    ))}
                </div>
                : null
            }

            <br />
            {/* {rawResults &&
                <>
                    <p className="display-address-field" style={{ background: "#FFDFD3" }}>1 - name: {name}</p>
                    <p className="display-address-field" style={{ background: "#FFDFD3" }}>2 - house_number: {house_number}</p>
                    <p className="display-address-field" style={{ background: "#D291BC" }}>3 - road: {road}</p>
                    <p className="display-address-field" style={{ background: "#FAFFC7" }}>4 - neighbourhood: {neighbourhood}</p>
                    <p className="display-address-field" style={{ background: "#FFCCE1" }}>5 - suburb: {suburb}</p>
                    <p className="display-address-field" style={{ background: "#FFCCE1" }}>6 - island: {island}</p>
                    <p className="display-address-field" style={{ background: "#E0D7FF" }}>7 - city: {city}</p>
                    <p className="display-address-field" style={{ background: "#CCF1FF" }}>8 - county: {county}</p>
                    <p className="display-address-field" style={{ background: "#CCF1FF" }}>9 - state: {state}</p>
                    <p className="display-address-field" style={{ textDecoration: "line-through" }}>10 - state_code: {state_code}</p>
                    <p className="display-address-field" style={{ background: "yellow" }}>11 - postcode: {postcode}</p>
                    <p className="display-address-field" style={{ background: "blue", color: "#fff" }}>12 - country: {country}</p>
                    <p className="display-address-field" style={{ textDecoration: "line-through" }}>13 - country_code: {country_code}</p>
                </>
            } */}

            <div style={showAddressInputs ? {} : { display: "none" }} >
                <MyTextInput
                    value={address1}
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.propertyNumberOrName"
                    placeholder="Property number or name"
                    onChange={(e: any) => {
                        setAddress1(e.currentTarget.value);
                        handleChange(e);
                    }}
                    type="text"
                />

                <MyTextInput
                    value={address2}
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.streetName"
                    placeholder="Street name"
                    onChange={(e: any) => {
                        setAddress2(e.currentTarget.value);
                        handleChange(e);
                    }}
                    type="text"
                />

                <MyTextInput
                    value={address3}
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.locality"
                    placeholder="Locality"
                    onChange={(e: any) => {
                        setAddress3(e.currentTarget.value);
                        handleChange(e);
                    }}
                    type="text"
                />

                <MyTextInput
                    value={address4}
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.townOrCity"
                    placeholder="Town or city"
                    onChange={(e: any) => {
                        setAddress4(e.currentTarget.value);
                        handleChange(e);
                    }}
                    type="text"
                />

                <MyTextInput
                    value={address5}
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.county"
                    placeholder="County"
                    onChange={(e: any) => {
                        setAddress5(e.currentTarget.value);
                        handleChange(e);
                    }}
                    type="text"
                />

                <MyTextInput
                    value={address6}
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.postalCode"
                    placeholder="Postcode"
                    onChange={(e: any) => {
                        setAddress6(e.currentTarget.value);
                        handleChange(e);
                    }}
                />

                <MySelectInput
                    selectclassname='register-select-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.country"
                    placeholder="Country"
                    options={countryOptions}
                />
            </div>

        </div>
    )
}