import React, { useEffect } from 'react';
import '.././SignUp.css';
import { observer } from "mobx-react-lite";
import MyTextInput from '../../../../app/common/form/MyTextInput';
import AddressSearch from './AddressSearch';
import { AccountType } from '../../../../app/model/User';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    handleChange: (e: any) => void;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    validateField: (field: string) => void;
    getFieldMeta: any;
    formType: number;
    setFormType: (value: number) => void;
}

export default observer(function RegisterAgentStepOne({ isValid, dirty, isSubmitting, setFieldValue, handleChange,
    setFieldTouched, validateField, getFieldMeta, formType, setFormType }: Props) {

    useEffect(() => {
        setFieldValue("country", "United Kingdom");
        setFieldValue("language", "English");
        setFieldValue("accountType", AccountType.Agent);
        setFieldValue("invoiceAmount", 660000);
        setFieldValue("invoiceDescription", "Payment in 1 installment");
        if (formType !== 1) setFormType(1);
    }, [formType])

    return (
        <div>
            <p className='form-section-title'>Account information</p>
            <br />
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="username" placeholder="Username" />
            <br />
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="email" placeholder="Email" />
            <br />
            <p className='form-section-value'>Minimum 8 characters, a mix of letters, number and special character: </p>
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="password" placeholder="Password" type="password" />

            <hr className='form-hr' />

            <p className='form-section-title'>Estate agent details</p>
            <br />
            <p className='form-section-value'>The legal name of the estate agent company: </p>
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="companyLegalName" placeholder="Legal business name" />
            <br />
            <p className='form-section-value'>The name will be displayed as a tag on listings: </p>
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="displayName" placeholder="Display name" />
            <p className='form-section-value' style={{ paddingBottom: "3px" }}>(20 characters maximum)</p>

            <hr className='form-hr' />
            <p className='form-section-title'>Estate agent address</p>
            <br />
            <p className='form-section-value'>The legal address of the estate agent business</p>
            <AddressSearch
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                getFieldMeta={getFieldMeta}
            />
            <br />
            <button
                className='register-button'
                type="button"
                disabled={!isValid || !dirty || isSubmitting}
                onClick={() => setFormType(2)}
            >
                Continue to membership
            </button>
        </div>
    )
});