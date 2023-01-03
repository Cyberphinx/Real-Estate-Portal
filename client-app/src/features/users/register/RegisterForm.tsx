import './RegisterForm.css';
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';
import LoginForm from '../LoginForm';
import { AccountType, Language } from '../../../app/model/User';
import Switcher from './Switcher';
import React, { useEffect, useState } from 'react';


export default observer(function RegisterForm() {
    const { userStore: { register }, featureStore: { setActiveFeature }, modalStore: { openModal, closeModal } } = useStore();

    const apikey = process.env.REACT_APP_LOCATION_IQ;
    const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    const [formType, setFormType] = useState<number>(0);
    const [step, setStep] = useState<number>(0);

    const initialValues = {
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
        accountType: 0,
        addedOn: new Date(),
        country: "United Kingdom",
        language: Language.English,
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
        invoiceDescription: "",
        invoiceAmount: 0,
        error: null
    }

    const registerValidation = [
        Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().required("Email is required").email("Email must be a valid email"),
            password: Yup.string().required("Password is required"),
        }),
        Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().required("Email is required").email("Email must be a valid email"),
            password: Yup.string().required("Password is required"),
            companyLegalName: Yup.string().required("Legal business name is required"),
            displayName: Yup.string().required("Displayname is required").max(20, "Display name must be under 20 characters"),
            legalCompanyAddress: Yup.object({
                postalCode: Yup.string().required("Postcode is required")
            })
        }),
        Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().required("Email is required").email("Email must be a valid email"),
            password: Yup.string().required("Password is required"),
        })
    ]

    const currentValidationSchema = registerValidation[formType];

    console.log(currentValidationSchema);

    return (
        <div className="register-form">
            <div className="modal-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        register(values, setSubmitting, formType, setStep).catch(error => setErrors({ error }));
                        setActiveFeature(0);
                    }}
                    validationSchema={currentValidationSchema}
                >
                    {({
                        handleSubmit, isSubmitting, errors, isValid, dirty, setFieldValue,
                        handleChange, setFieldTouched, validateField, getFieldMeta
                    }) => {
                        return (
                            <Form onSubmit={handleSubmit} autoComplete="off">
                                <div style={{ position: "relative" }}>
                                    <p style={{ textAlign: "left", fontSize: "18px", fontWeight: "600", padding: "0px 20px 0px 20px" }}>
                                        Sign Up
                                    </p>
                                    <select name="accountType" className='account-select-style'>
                                        <option
                                            value={AccountType.Customer}
                                            onClick={() => {
                                                setFormType(0);
                                                setFieldValue("accountType", AccountType.Customer);
                                            }}>( Individual )</option>
                                        <option
                                            value={AccountType.Agent}
                                            onClick={() => {
                                                setFormType(1);
                                                setFieldValue("accountType", AccountType.Agent);
                                                setFieldValue("invoiceAmount", 600000);
                                                setFieldValue("invoiceDescription", "Payment in 1 installment");
                                            }}>( Estate Agent )</option>
                                        <option
                                            value={AccountType.Company}
                                            onClick={() => {
                                                setFormType(2);
                                                setFieldValue("accountType", AccountType.Company);
                                            }}>( Tradesperson )</option>
                                    </select>
                                </div>

                                <p style={{ textAlign: "left", fontSize: "12px", fontWeight: "400", padding: "0px 20px 0px 20px" }}>
                                    By continuing, you agree are setting up a Sanctum account and agree to our <span className='register-legal-text'>User Agreement</span> and <span className='register-legal-text'>Privacy Policy</span>.
                                </p>
                                
                                {/* <p style={{fontSize:"0.75rem"}}>Username errors: {getFieldMeta("username").error?.toString()}</p>
                                <p style={{fontSize:"0.75rem"}}>Email errors: {getFieldMeta("email").error?.toString()}</p>
                                <p style={{fontSize:"0.75rem"}}>Password errors: {getFieldMeta("password").error?.toString()}</p> */}

                                <Switcher
                                    isValid={isValid}
                                    dirty={dirty}
                                    isSubmitting={isSubmitting}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    accountType={formType}
                                    setFieldTouched={setFieldTouched}
                                    validateField={validateField}
                                    getFieldMeta={getFieldMeta}
                                    step={step}
                                    setStep={setStep}
                                />

                                {errors.error && <p className="register-form-submission-error">{errors.error}</p>}
                                <div className='register-suggestion'>Already on Sanctum? <button className='register-suggestion-button'
                                    type='button'
                                    onClick={() => {
                                        {
                                            closeModal();
                                            openModal(<LoginForm />);
                                        }
                                    }}>
                                    Log In</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>

    )
});