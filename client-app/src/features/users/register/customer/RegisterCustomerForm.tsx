import React, { useEffect } from 'react';
import '.././SignUp.css';
import { observer } from "mobx-react-lite";
import MyTextInput from '../../../../app/common/form/MyTextInput';
import { AccountType } from '../../../../app/model/User';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    formType: number;
    setFormType: (value: number) => void;
}

export default observer(function RegisterCustomerForm({isValid, dirty, isSubmitting, formType, setFormType, setFieldValue}: Props) {

    useEffect(() => {
        if (formType !== 0) setFormType(0);
    }, [formType])

    return (
        <div>
            <br />
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="username" placeholder="Username" />
            <br />
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="email" placeholder="Email" />
            <br />
            <p className='form-section-value'>Maximum 20 characters: </p>
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="displayName" placeholder="Display name" />
            <br />
            <p className='form-section-value'>Minimum 8 characters, a mix of letters, number and special character: </p>
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="password" placeholder="Password" type="password" />
            <br />
            <button
                className={isSubmitting ? 'register-submitting-button' : 'register-button'}
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
            >
                {isSubmitting && <span className="register-submitting"></span>}
                Sign Up
            </button>
        </div>

    )
});