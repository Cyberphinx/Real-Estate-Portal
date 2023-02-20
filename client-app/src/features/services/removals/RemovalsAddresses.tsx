import React, { useEffect, useState } from "react";
import "./RemovalsJobForm";
import { observer } from "mobx-react-lite";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { JobFormValues } from "../../../app/model/Job";
import { useDebounce } from "../../../app/hooks/useDebounce";
import { LocationIQProvider } from "leaflet-geosearch";
import { LocationRaw } from "../../../app/model/LocationRaw";

interface Props {
    values: JobFormValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export default observer(function RemovalsAddresses({ values, setFieldValue }: Props) {
    useEffect(() => {
        if (!values.jobLocations || values.jobLocations.length < 1) {

        }
    }, [values.jobLocations])

    const apikey = process.env.REACT_APP_LOCATION_IQ;

    const [value0, setValue0] = useState<string>("");
    const [value1, setValue1] = useState<string>("");

    const [address0Results, setAddress0Results] = useState<any>();
    const [address1Results, setAddress1Results] = useState<any>();

    const [showAddress0Inputs, setShowAddress0Inputs] = useState<boolean>(false);
    const [showAddress1Inputs, setShowAddress1Inputs] = useState<boolean>(false);

    const handleSearchAddress0 = (e: any) => {
        setValue0(e.target.value);
    };
    const handleSearchAddress1 = (e: any) => {
        setValue1(e.target.value);
    };

    const debouncedHandler0 = useDebounce(handleSearchAddress0, 500);
    const debouncedHandler1 = useDebounce(handleSearchAddress1, 500);

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
                const results = await provider.search({ query: value0 });
                setAddress0Results(results);
            } catch (error) {
                console.log(error);
            }
        }
        if (value0.length > 0) fetchData();
    }, [value0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await provider.search({ query: value1 });
                setAddress1Results(results);
            } catch (error) {
                console.log(error);
            }
        }
        if (value1.length > 0) fetchData();
    }, [value1]);


    return (
        <div>
            <div>
                <p className="removals-forms__title" style={{ marginBottom: '2rem' }}>
                    {values.jobLocations![0].addressType}:
                </p>
                <MyTextInput
                    inputclassname="removals-forms__input-long"
                    labelclassname="removals-forms__input-label"
                    errorclassname='removals-forms__input-error'
                    type="text"
                    onChange={debouncedHandler0}
                    placeholder="Start typing the address or postcode..."
                    name="originAddressSearch"
                    label="Search origin address"
                />
                {address0Results
                    ?
                    <div className="removals-forms__search">
                        {address0Results.map((item: LocationRaw) => (
                            <div
                                className="removals-forms__search-item"
                                key={item.raw.place_id}
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
                                    setFieldValue("jobLocations[0].displayAddress", item.raw.display_name ? item.raw.display_name : '');
                                    setFieldValue("jobLocations[0].propertyNumberOrName", propertyNumberOrName);
                                    setFieldValue("jobLocations[0].locality", locality);
                                    setFieldValue("jobLocations[0].streetName", streetName);
                                    setFieldValue("jobLocations[0].townOrCity", item.raw.address.city ? item.raw.address.city : '');
                                    setFieldValue("jobLocations[0].county", countyValue);
                                    setFieldValue("jobLocations[0].postalCode", item.raw.address.postcode ? item.raw.address.postcode : '');
                                    setFieldValue("jobLocations[0].country", item.raw.address.country ? item.raw.address.country : '');
                                    setFieldValue("jobLocations[0].latitude", item.y ? item.y : 0);
                                    setFieldValue("jobLocations[0].longitude", item.x ? item.x : 0);
                                    setAddress0Results(null);
                                    setShowAddress0Inputs(true);
                                }}>
                                <p className="removals-forms__search-item-name">{item.raw.display_name}</p>
                            </div>
                        ))}
                    </div>
                    : null
                }
                <br />
                {showAddress0Inputs &&
                    <>
                        <MyTextInput
                            inputclassname="removals-forms__input-long"
                            labelclassname="removals-forms__input-label"
                            errorclassname="removals-forms__input-error"
                            name='jobLocations[0].propertyNumberOrName'
                            placeholder=""
                            label="Property number or name"
                        />
                        <MyTextInput
                            inputclassname="removals-forms__input-long"
                            labelclassname="removals-forms__input-label"
                            errorclassname="removals-forms__input-error"
                            name='jobLocations[0].streetName'
                            placeholder=""
                            label="Street name"
                        />
                        <MyTextInput
                            inputclassname="removals-forms__input-long"
                            labelclassname="removals-forms__input-label"
                            errorclassname="removals-forms__input-error"
                            name='jobLocations[0].locality'
                            placeholder=""
                            label="Locality"
                        />

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'stretch', justifyContent: 'space-between' }}>
                            <MyTextInput
                                inputclassname="removals-forms__input-medium"
                                labelclassname="removals-forms__input-label"
                                errorclassname="removals-forms__input-error"
                                name='jobLocations[0].townOrCity'
                                placeholder=""
                                label="Town or city"
                            />
                            <MyTextInput
                                inputclassname="removals-forms__input-medium"
                                labelclassname="removals-forms__input-label"
                                errorclassname="removals-forms__input-error"
                                name='jobLocations[0].county'
                                placeholder=""
                                label="County"
                            />
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'stretch', justifyContent: 'space-between' }}>
                            <MyTextInput
                                inputclassname="removals-forms__input-medium"
                                labelclassname="removals-forms__input-label"
                                errorclassname="removals-forms__input-error"
                                name='jobLocations[0].postalCode'
                                placeholder=""
                                label="Postcode"
                            />
                            <MyTextInput
                                inputclassname="removals-forms__input-medium"
                                labelclassname="removals-forms__input-label"
                                errorclassname="removals-forms__input-error"
                                name='jobLocations[0].country'
                                placeholder=""
                                label="Country"
                            />
                        </div>
                    </>
                }
            </div>

            <div>
                <p className="removals-forms__title" style={{ marginBottom: '2rem' }}>
                    {values.jobLocations![1].addressType}:
                </p>
                <MyTextInput
                    inputclassname="removals-forms__input-long"
                    labelclassname="removals-forms__input-label"
                    errorclassname='removals-forms__input-error'
                    type="text"
                    onChange={debouncedHandler1}
                    placeholder="Start typing the address or postcode..."
                    name="originAddressSearch"
                    label="Search destination address"
                />
                {address1Results
                    ?
                    <div className="removals-forms__search">
                        {address1Results.map((item: LocationRaw) => (
                            <div
                                className="removals-forms__search-item"
                                key={item.raw.place_id}
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
                                    setFieldValue("jobLocations[1].displayAddress", item.raw.display_name ? item.raw.display_name : '');
                                    setFieldValue("jobLocations[1].propertyNumberOrName", propertyNumberOrName);
                                    setFieldValue("jobLocations[1].locality", locality);
                                    setFieldValue("jobLocations[1].streetName", streetName);
                                    setFieldValue("jobLocations[1].townOrCity", item.raw.address.city ? item.raw.address.city : '');
                                    setFieldValue("jobLocations[1].county", countyValue);
                                    setFieldValue("jobLocations[1].postalCode", item.raw.address.postcode ? item.raw.address.postcode : '');
                                    setFieldValue("jobLocations[1].country", item.raw.address.country ? item.raw.address.country : '');
                                    setFieldValue("jobLocations[1].latitude", item.y ? item.y : 0);
                                    setFieldValue("jobLocations[1].longitude", item.x ? item.x : 0);
                                    setAddress1Results(null);
                                    setShowAddress1Inputs(true);
                                }}>
                                <p className="removals-forms__search-item-name">{item.raw.display_name}</p>
                            </div>
                        ))}
                    </div>
                    : null
                }
                <br />
                {showAddress1Inputs &&
                    <>
                        <MyTextInput
                            inputclassname="removals-forms__input-long"
                            labelclassname="removals-forms__input-label"
                            errorclassname="removals-forms__input-error"
                            name='jobLocations[1].propertyNumberOrName'
                            placeholder=""
                            label="Property number or name"
                        />
                        <MyTextInput
                            inputclassname="removals-forms__input-long"
                            labelclassname="removals-forms__input-label"
                            errorclassname="removals-forms__input-error"
                            name='jobLocations[1].streetName'
                            placeholder=""
                            label="Street name"
                        />
                        <MyTextInput
                            inputclassname="removals-forms__input-long"
                            labelclassname="removals-forms__input-label"
                            errorclassname="removals-forms__input-error"
                            name='jobLocations[1].locality'
                            placeholder=""
                            label="Locality"
                        />

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'stretch', justifyContent: 'space-between' }}>
                            <MyTextInput
                                inputclassname="removals-forms__input-medium"
                                labelclassname="removals-forms__input-label"
                                errorclassname="removals-forms__input-error"
                                name='jobLocations[1].townOrCity'
                                placeholder=""
                                label="Town or city"
                            />
                            <MyTextInput
                                inputclassname="removals-forms__input-medium"
                                labelclassname="removals-forms__input-label"
                                errorclassname="removals-forms__input-error"
                                name='jobLocations[1].county'
                                placeholder=""
                                label="County"
                            />
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'stretch', justifyContent: 'space-between' }}>
                            <MyTextInput
                                inputclassname="removals-forms__input-medium"
                                labelclassname="removals-forms__input-label"
                                errorclassname="removals-forms__input-error"
                                name='jobLocations[1].postalCode'
                                placeholder=""
                                label="Postcode"
                            />
                            <MyTextInput
                                inputclassname="removals-forms__input-medium"
                                labelclassname="removals-forms__input-label"
                                errorclassname="removals-forms__input-error"
                                name='jobLocations[1].country'
                                placeholder=""
                                label="Country"
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    )
})