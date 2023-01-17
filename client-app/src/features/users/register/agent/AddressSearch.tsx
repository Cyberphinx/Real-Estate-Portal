import { useEffect, useState } from "react";
import 'leaflet-geosearch/dist/geosearch.css';
import { LocationIQProvider } from 'leaflet-geosearch';
import { LocationRaw } from "../../../../app/model/LocationRaw";
import { useDebounce } from "../../../../app/hooks/useDebounce";
import '.././SignUp.css';
import MyTextInput from "../../../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";

interface Props {
    setFieldValue: any;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    getFieldMeta: any;
}

export default observer(function AddressSearch({ setFieldValue, setFieldTouched, getFieldMeta }: Props) {

    const apikey = process.env.REACT_APP_LOCATION_IQ;

    const [value, setValue] = useState<string>("");
    const [rawResults, setRawResults] = useState<any>();
    const [showAddressInputs, setShowAddressInputs] = useState<boolean>(false);

    const [displayAddress, setDisplayAddress] = useState<string | undefined>("");
    const [name, setName] = useState<string | undefined>("");
    const [house_number, setHouse_number] = useState<string | undefined>("");
    const [road, setRoad] = useState<string | undefined>("");
    const [neighbourhood, setNeighbourhood] = useState<string | undefined>("");
    const [suburb, setSuburb] = useState<string | undefined>("");
    const [island, setIsland] = useState<string | undefined>("");
    const [city, setCity] = useState<string | undefined>("");
    const [county, setCounty] = useState<string | undefined>("");
    const [state, setState] = useState<string | undefined>("");
    const [postcode, setPostcode] = useState<string | undefined>("");
    const [country, setCountry] = useState<string | undefined>("");
    const [latitude, setLatitude] = useState<number | undefined>(0);
    const [longitude, setLongitude] = useState<number | undefined>(0);

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

    const propertyNumberOrName = name ? (house_number ? `${name}, ${house_number}` : name) : house_number;
    const streetName = road ? (neighbourhood ? `${road}, ${neighbourhood}` : road) : neighbourhood;
    const locality = suburb ? (island ? `${suburb}, ${island}` : suburb) : island;
    const countyValue = county ? (state ? `${county}, ${state}` : county) : state;


    useEffect(() => {
        setFieldValue("legalCompanyAddress.propertyNumberOrName", propertyNumberOrName)
    }, [propertyNumberOrName])

    useEffect(() => {
        setFieldValue("legalCompanyAddress.streetName", streetName)
    }, [streetName])

    useEffect(() => {
        setFieldValue("legalCompanyAddress.locality", locality)
    }, [locality])

    useEffect(() => {
        setFieldValue("legalCompanyAddress.townOrCity", city)
    }, [city])

    useEffect(() => {
        setFieldValue("legalCompanyAddress.county", countyValue)
    }, [countyValue])

    useEffect(() => {
        setFieldValue("legalCompanyAddress.postalCode", postcode);
    }, [postcode])

    useEffect(() => {
        setFieldValue("legalCompanyAddress.country", country);
    }, [country])

    const postalCodeValue = getFieldMeta("legalCompanyAddress.postalCode").value.toString();

    useEffect(() => {
        if (postalCodeValue) setFieldTouched("legalCompanyAddress.postalCode", true);
    }, [postalCodeValue])

    useEffect(() => {
        setFieldValue("legalCompanyAddress.latitude", latitude);
    }, [latitude])

    useEffect(() => {
        setFieldValue("legalCompanyAddress.longitude", longitude);
    }, [longitude])

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
                                    setDisplayAddress(item.raw.display_name ? item.raw.display_name : "");
                                    setName(item.raw.address.name ? item.raw.address.name : "");
                                    setHouse_number(item.raw.address.house_number ? item.raw.address.house_number : "");
                                    setRoad(item.raw.address.road ? item.raw.address.road : "");
                                    setNeighbourhood(item.raw.address.neighbourhood ? item.raw.address.neighbourhood : "");
                                    setSuburb(item.raw.address.suburb ? item.raw.address.suburb : "");
                                    setIsland(item.raw.address.island ? item.raw.address.island : "");
                                    setCity(item.raw.address.city ? item.raw.address.city : "");
                                    setCounty(item.raw.address.county ? item.raw.address.county : "");
                                    setState(item.raw.address.state ? item.raw.address.state : "");
                                    setPostcode(item.raw.address.postcode ? item.raw.address.postcode : "");
                                    setCountry(item.raw.address.country ? item.raw.address.country : "");
                                    setLatitude(item.y ? item.y : 0);
                                    setLongitude(item.x ? item.x : 0);
                                    // set field values from state variables
                                    setFieldValue("legalCompanyAddress.displayAddress", displayAddress);
                                    setFieldValue("legalCompanyAddress.propertyNumberOrName", propertyNumberOrName);
                                    setFieldValue("legalCompanyAddress.locality", locality);
                                    setFieldValue("legalCompanyAddress.streetName", streetName);
                                    setFieldValue("legalCompanyAddress.townOrCity", city);
                                    setFieldValue("legalCompanyAddress.county", countyValue);
                                    setFieldValue("legalCompanyAddress.postalCode", postcode);
                                    setFieldTouched("legalCompanyAddress.postalCode", true);
                                    setFieldValue("legalCompanyAddress.country", country);
                                    setFieldValue("legalCompanyAddress.latitude", latitude);
                                    setFieldValue("legalCompanyAddress.longitude", longitude);
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
            <div style={showAddressInputs ? {} : { display: "none" }} >
                <MyTextInput
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.propertyNumberOrName"
                    placeholder="Property number or name"
                />

                <MyTextInput
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.streetName"
                    placeholder="Street name"
                />

                <MyTextInput
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.locality"
                    placeholder="Locality"
                />

                <MyTextInput
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.townOrCity"
                    placeholder="Town or city"
                    type="text"
                />

                <MyTextInput
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.county"
                    placeholder="County"
                />

                <MyTextInput
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.postalCode"
                    placeholder="Postcode"
                />

                <MyTextInput
                    inputclassname='register-input-style'
                    errorclassname='register-form-error'
                    name="legalCompanyAddress.country"
                    placeholder="Country"
                />

            </div>
        </div>
    )
})