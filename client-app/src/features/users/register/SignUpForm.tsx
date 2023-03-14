import React from 'react';
import './SignUp.css';
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';
import LoginForm from '../LoginForm';
import { AccountType } from '../../../app/model/User';
import Switcher from './Switcher';
import RegisterAgentStepThree from './agent/RegisterAgentStepThree';
import RegisterSuccess from './RegisterSuccess';

interface Props {
    formType: number;
    setFormType: (value: number) => void;
}

export default observer(function SignUpForm({ formType, setFormType }: Props) {
    const { userStore, featureStore, modalStore } = useStore();
    const { register } = userStore;
    const { setActiveFeature } = featureStore;
    const { openModal, closeModal } = modalStore;

    const initialValues = [{
        // number 0 is for Customer sign up
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
        accountType: AccountType.Customer,
        addedOn: new Date(),
        country: "United Kingdom",
        language: "English",
        displayName: "",
        companyAccessStatus: 0,
        companyLegalName: "",
        isMainCompany: true,
        legalCompanyAddress: undefined,
        companyNumber: "",
        icoNumber: "",
        redressScheme: "",
        invoiceDescription: "",
        invoiceAmount: 0,
        invoiceCurrency: "gbp",
        error: null
    },
    // number 1 is for Agent sign up
    {
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
        accountType: AccountType.Agent,
        addedOn: new Date(),
        country: "United Kingdom",
        language: "English",
        displayName: "",
        companyAccessStatus: 0,
        companyLegalName: "",
        isMainCompany: true,
        legalCompanyAddress: {
            id: uuid(),
            displayAddress: "",
            propertyNumberOrName: "",
            streetName: "",
            locality: "",
            townOrCity: "",
            county: "",
            postalCode: "",
            country: "United Kingdom",
            latitude: 0,
            longitude: 0,
        },
        companyNumber: "",
        icoNumber: "",
        redressScheme: "",
        invoiceDescription: "",
        invoiceAmount: 0,
        invoiceCurrency: "gbp",
        error: null
    },
    // number 2 is for Customer sign up
    {
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
        accountType: AccountType.Company,
        addedOn: new Date(),
        country: "United Kingdom",
        language: "English",
        displayName: "",
        companyAccessStatus: 0,
        companyLegalName: "",
        isMainCompany: true,
        legalCompanyAddress: {
            id: uuid(),
            displayAddress: "",
            propertyNumberOrName: "",
            streetName: "",
            locality: "",
            townOrCity: "",
            county: "",
            postalCode: "",
            country: "United Kingdom",
            latitude: 0,
            longitude: 0,
        },
        companyNumber: "",
        icoNumber: "",
        redressScheme: "",
        invoiceDescription: "",
        invoiceAmount: 0,
        invoiceCurrency: "gbp",
        error: null
    }]

    const registerValidation = [
        // number 0 is for Customer sign up
        Yup.object({
            username: Yup.string().required("Username is required"),
            displayName: Yup.string().required("Display name is required").max(20, "Display name must be under 20 characters"),
            email: Yup.string().required("Email is required").email("Email must be a valid email"),
            password: Yup.string().required("Password is required"),
        }),
        // number 1 is for Agent sign up
        Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().required("Email is required").email("Email must be a valid email"),
            password: Yup.string().required("Password is required"),
            companyLegalName: Yup.string().required("Legal business name is required"),
            displayName: Yup.string().required("Display name is required").max(20, "Display name must be under 20 characters"),
            legalCompanyAddress: Yup.object({
                postalCode: Yup.string().required("Postcode is required")
            })
        }),
        // number 2 is for Tradesperson sign up
        Yup.object({
            username: Yup.string().required("Username is required"),
            displayName: Yup.string().required("Display name is required").max(20, "Display name must be under 20 characters"),
            email: Yup.string().required("Email is required").email("Email must be a valid email"),
            password: Yup.string().required("Password is required"),
        })
    ]

    const currentValidationSchema = registerValidation[formType];

    const paymentModal = <RegisterAgentStepThree />;
    const successModal = <RegisterSuccess />;


    return (
        <Formik
            initialValues={initialValues[formType]}
            onSubmit={(values, { setErrors, setSubmitting }) => {
                register(values, setSubmitting, paymentModal, successModal).catch(error => setErrors({ error }));
                setActiveFeature(0);
            }}
            validationSchema={currentValidationSchema}
        >
            {({
                handleSubmit, isSubmitting, errors, isValid, dirty, setFieldValue,
                handleChange, setFieldTouched, validateField, getFieldMeta, values
            }) => {
                return (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <div style={{ position: "relative" }}>
                            <p style={{ textAlign: "left", fontSize: "1.125rem", fontWeight: "bold", padding: "0rem 1.25rem" }}>
                                Sign Up
                            </p>
                            {/* <h3>{getFieldMeta("accountType").value!.toString()}</h3> */}
                            {/* <Field as="select" name="accountType" className='account-select-style'>
                                <option value={AccountType.Customer} >( Individual )</option>
                                <option value={AccountType.Agent} >( Estate Agent )</option>
                                <option value={AccountType.Company} >( Tradesperson )</option>
                            </Field> */}
                        </div>

                        <p style={{ textAlign: "left", fontSize: "0.75rem", fontWeight: "normal", padding: "0rem 1.25rem" }}>
                            By continuing, you are setting up a Sanctum account and agree to our <span className='register-legal-text'>User Agreement</span> and <span className='register-legal-text'>Privacy Policy</span>.
                        </p>

                        <Switcher
                            isValid={isValid}
                            dirty={dirty}
                            isSubmitting={isSubmitting}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            formType={formType}
                            setFormType={setFormType}
                            setFieldTouched={setFieldTouched}
                            validateField={validateField}
                            getFieldMeta={getFieldMeta}
                        />

                        {errors.error && <p className="register-form-submission-error">{errors.error}</p>}

                        <div className='register-suggestion'>Already on Sanctum? <button className='register-suggestion-button'
                            type='button'
                            onClick={() => {
                                closeModal();
                                openModal(<LoginForm />);
                            }}>
                            Log In</button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
});