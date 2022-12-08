import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import './UpdateCompany.css';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { CompanyFormValues } from "../../../app/model/CompanyAggregate/Company";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { categoryOptions } from "../../../app/common/form/categoryOptions";
import Images from "./CompanyImages";

interface Props {
    id: string | undefined;
    initialCompanyValues: CompanyFormValues;
    setInitialCompanyValues: any;
}

export default observer(function UpdateCompany({ id, initialCompanyValues, setInitialCompanyValues }: Props) {
    const { companyStore, userStore, listingStore } = useStore();
    const { selectCompany, selectedCompany } = listingStore;
    const { setEditMode, updateCompany } = companyStore;
    const { user } = userStore;
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (selectedCompany) setInitialCompanyValues(new CompanyFormValues(selectedCompany));
    // }, []);

    const validationSchema = Yup.object({
        companyName: Yup.string().required('The company name is required'),
        category: Yup.string().required(),
        postcode: Yup.string().required(),
        email: Yup.string().required("The email is required").email(),
        phone: Yup.string().required("The phone is required"),
    })

    return (
        <div className="update-company-container" >
            <div className="update-company-contents">
                <div>
                    {user?.role.includes("Company") && selectedCompany?.usernames.includes(user.username) &&
                        <button className="view-company-button" onClick={() => setEditMode(false)}>View Profile</button>
                    }
                    <h1>{selectedCompany?.companyName}</h1>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={initialCompanyValues}
                    onSubmit={(values) => { updateCompany(values).then(() => navigate(`/companies/${id}`)).then(() => selectCompany(id!)); console.log(values) }}
                    validationSchema={validationSchema}>
                    {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <div className="company-update-form-container">
                                <MyTextInput inputclassname="" errorclassname="" label="Business name: " name="companyName" placeholder="Company Name" />
                                <MySelectInput selectclassname="" label="Business category: " name="category" placeholder="Select..." options={categoryOptions} />
                                <MyTextArea name="brief" placeholder="Brief" label="Brief: " rows={8} cols={40} />
                                <MyTextArea name="description" placeholder="Description" label="Description: " rows={8} cols={40} />
                                <MyTextInput inputclassname="" errorclassname="" name="serviceScope" placeholder="Moving, Packing, Storage..." label="Service offered: " />
                                <MyTextInput inputclassname="" errorclassname="" name="serviceLocations" placeholder="London, Bristol, Edinburgh..." label="Area serviced: " />
                                <MyTextInput inputclassname="" errorclassname="" label="Address: " name="address.address1" placeholder="Address1" />
                                <MyTextInput inputclassname="" errorclassname="" name="address.address2" placeholder="Address2" />
                                <MyTextInput inputclassname="" errorclassname="" name="address.address3" placeholder="Address2" />
                                <MyTextInput inputclassname="" errorclassname="" name="address.city" placeholder="City" />
                                <MyTextInput inputclassname="" errorclassname="" name="address.state" placeholder="State" />
                                <MyTextInput inputclassname="" errorclassname="" name="address.zip" placeholder="Zip" />
                                <MyTextInput inputclassname="" errorclassname="" name="address.country" placeholder="Country" />
                                <MyTextInput inputclassname="" errorclassname="" label="Contacts: " name="email" placeholder="Email" />
                                <MyTextInput inputclassname="" errorclassname="" name="phone" placeholder="Phone" />
                                <MyTextInput inputclassname="" errorclassname="" name="website" placeholder="Website" />
                            </div>

                            <button disabled={!isValid || !dirty || isSubmitting} className="edit-button" type="submit">
                                <span className={"edit-button-" + (isSubmitting ? "loading" : "text")}>Save Changes</span>
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
});