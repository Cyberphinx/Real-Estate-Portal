import './RegisterForm.css';
import { observer } from "mobx-react-lite";
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useEffect, useState } from 'react';
import AddressSearch from './AddressSearch';
import ReviewPayment from './ReviewPayment';
import Stepper from './stepper/Stepper';
import { Language } from '../../../app/model/User';
import Payment from './Payment';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    handleChange: (e: any) => void;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    validateField: (field: string) => void;
    getFieldMeta: any;
    step: number;
    setStep: (value: number) => void;
}

export default observer(function RegisterAgentForm({ isValid, dirty, isSubmitting, setFieldValue, handleChange, 
    setFieldTouched, validateField, getFieldMeta, step, setStep }: Props) {

    useEffect(() => {
        setFieldValue("country", "United Kingdom");
        setFieldValue("language", Language.English);
    }, [])

    return (
        <div>
            <Stepper step={step} setStep={setStep} />

            {step === 0 && <>
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
                    handleChange={handleChange}
                    setFieldTouched={setFieldTouched}
                    validateField={validateField}
                    getFieldMeta={getFieldMeta}
                />
                <br />
                <button
                    className='register-button'
                    type="button"
                    disabled={!isValid || !dirty || isSubmitting}
                    onClick={() => setStep(1)}
                >
                    Continue to membership
                </button>
            </>}

            {step === 1 &&
                <ReviewPayment isValid={isValid} dirty={dirty} isSubmitting={isSubmitting} setFieldValue={setFieldValue} handleChange={handleChange} setStep={setStep} />
            }

            {step === 2 &&
                <Payment />
            }
        </div>
    )
});