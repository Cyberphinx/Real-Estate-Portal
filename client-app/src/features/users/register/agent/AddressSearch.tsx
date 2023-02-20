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
                                    let name = item.raw.address.name ? item.raw.address.name : '';
                                    let house_number = item.raw.address.house_number ? item.raw.address.house_number : '';
                                    let road = item.raw.address.road ? item.raw.address.road : '';
                                    let neighbourhood = item.raw.address.neighbourhood ? item.raw.address.neighbourhood : '';
                                    let suburb = item.raw.address.suburb ? item.raw.address.suburb : '';
                                    let island = item.raw.address.island ? item.raw.address.island : '';
                                    let county = item.raw.address.county ? item.raw.address.county : '';
                                    let state = item.raw.address.state ? item.raw.address.state : '';

                                    let propertyNumberOrName = name ? (house_number ? `${name}, ${house_number}` : name) : house_number;
                                    let streetName = road ? (neighbourhood ? `${road}, ${neighbourhood}` : road) : neighbourhood;
                                    let locality = suburb ? (island ? `${suburb}, ${island}` : suburb) : island;
                                    let countyValue = county ? (state ? `${county}, ${state}` : county) : state;

                                    // filling in the form with these values
                                    setFieldValue("legalCompanyAddress.displayAddress", item.raw.display_name ? item.raw.display_name : '');
                                    setFieldValue("legalCompanyAddress.propertyNumberOrName", propertyNumberOrName);
                                    setFieldValue("legalCompanyAddress.locality", locality);
                                    setFieldValue("legalCompanyAddress.streetName", streetName);
                                    setFieldValue("legalCompanyAddress.townOrCity", item.raw.address.city ? item.raw.address.city : '');
                                    setFieldValue("legalCompanyAddress.county", countyValue);
                                    setFieldValue("legalCompanyAddress.postalCode", item.raw.address.postcode ? item.raw.address.postcode : '');
                                    setFieldValue("legalCompanyAddress.country", item.raw.address.country ? item.raw.address.country : '');
                                    setFieldValue("legalCompanyAddress.latitude", item.y ? item.y : 0);
                                    setFieldValue("legalCompanyAddress.longitude", item.x ? item.x : 0);
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