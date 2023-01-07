import React, { useState } from 'react';
import './SignUp.css';
import { Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';
import LoginForm from '../LoginForm';
import { AccountType, Language } from '../../../app/model/User';
import Switcher from './Switcher';
import { Currency } from '../../../app/model/ListingAggregate/ListingEnums';
import RegisterAgentStepThree from './agent/RegisterAgentStepThree';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { accountTypeOptions } from '../../../app/common/form/options';

interface Props {
    formType: number;
    setFormType: (value: number) => void;
}

export default observer(function SignUpForm({ formType, setFormType }: Props) {
    const { userStore: { register }, featureStore: { setActiveFeature }, modalStore: { openModal, closeModal, setPaymentForm } } = useStore();

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
        invoiceCurrency: Currency.gbp,
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

    const paymentModal = <RegisterAgentStepThree />;


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setErrors, setSubmitting }) => {
                register(values, setSubmitting, paymentModal).catch(error => setErrors({ error }));
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
                            <p style={{ textAlign: "left", fontSize: "18px", fontWeight: "600", padding: "0px 20px 0px 20px" }}>
                                Sign Up
                            </p>
                            {/* <h3>{getFieldMeta("accountType").value!.toString()}</h3> */}
                            <Field as="select" name="accountType" className='account-select-style'>
                                <option value={AccountType.Customer} >( Individual )</option>
                                <option value={AccountType.Agent} >( Estate Agent )</option>
                                <option value={AccountType.Company} >( Tradesperson )</option>
                            </Field>
                        </div>

                        <p style={{ textAlign: "left", fontSize: "12px", fontWeight: "400", padding: "0px 20px 0px 20px" }}>
                            By continuing, you agree are setting up a Sanctum account and agree to our <span className='register-legal-text'>User Agreement</span> and <span className='register-legal-text'>Privacy Policy</span>.
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
    )
});