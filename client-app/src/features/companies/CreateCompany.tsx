import './CreateCompany.css';
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { ServiceCategory } from "../../app/model/ServiceCategory";
import { AccessStatus } from "../../app/model/AccessStatus";
import { Country } from "../../app/model/LocationAggregate/Location";
import { Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import MySelectInput from '../../app/common/form/MySelectInput';
import ValidationErrors from '../errors/ValidationErrors';
import { categoryOptions } from '../../app/common/form/categoryOptions';
import { observer } from 'mobx-react-lite';



export default observer(function CreateCompany() {
    const { companyStore, userStore, modalStore } = useStore();
    const { createCompany } = companyStore;
    const { user } = userStore;
    const { closeModal } = modalStore;

    const initialValues = {
        id: uuid(),
        companyName: "",
        companyReference: "",
        displayName: "",
        usernames: [user!.username],
        accessStatus: AccessStatus.Private,
        addedOn: new Date(),
        serviceCategory: ServiceCategory.Moving,
        // companyMembership: {},
        companyAddress: {
            propertyNumberOrName: "",
            streetName: "",
            locality: "",
            townOrCity: "",
            county: "",
            postalCode: "",
            country: Country.unitedkingdom,
            coordinates: {
                latitude: 0,
                longitude: 0
            },
            PafUdprn: "",
            what3words: "",
        },
        // companyDetails: {},
        companyContacts: {
            phone: "",
            email: user!.email,
            website: ""
        },
        brief: "",
        description: "",
        serviceLocations: "",
        serviceScope: "",
        logo: "",
        // companyContents: [],
        // availabilities: [],
        // insurances: [],
        // orders: [],
        error: null,
    }

    const validationSchema = Yup.object({
        companyName: Yup.string().required('The company name is required'),
        category: Yup.string().required(),
        postcode: Yup.string().required(),
        email: Yup.string().required("The email is required").email(),
        phone: Yup.string().required("The phone is required"),
    })

    return (
        <div className="company-form">
            <div className="form-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { setErrors }) => createCompany(values).catch(error => setErrors({ error }))}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit, isSubmitting, isValid, dirty, errors }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <p>Company Name: </p>
                            <MyTextInput inputclassname='input-style' errorclassname='error-style' name="companyName" placeholder="Company Name" />
                            <p>Business Category: </p>
                            <MySelectInput selectclassname='input-style' name="category" placeholder="Select..." options={categoryOptions} />
                            <div style={{ display: "grid" }}>
                                <div>
                                    <p>Address: </p>
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="address.address1" placeholder="Address1" />
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="address.address2" placeholder="Address2" />
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="address.address3" placeholder="Address3" />
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="address.city" placeholder="City" />
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="address.state" placeholder="State" />
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="postcode" placeholder="Zip" />
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="address.country" placeholder="Country" />
                                </div>
                                <div>
                                    <p>Contacts: </p>
                                    {/* <MyTextInput name="email" placeholder="Email" /> */}
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="phone" placeholder="Phone" />
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="mobile" placeholder="Mobile" />
                                    <MyTextInput inputclassname='input-style' errorclassname='error-style' name="website" placeholder="Website" />
                                </div>
                            </div>
                            <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                                <span className={"button-" + (isSubmitting ? "loading" : "text")}>Create</span>
                            </button>
                            {errors.error && <ValidationErrors errors={errors.error} />}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
})