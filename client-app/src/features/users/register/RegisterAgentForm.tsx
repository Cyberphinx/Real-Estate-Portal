import './RegisterForm.css';
import { observer } from "mobx-react-lite";
import { useStore } from '../../../app/stores/store';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { countryOptions } from '../../../app/common/form/countryOptions';
import { AddressElement, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { StripeElementType } from '@stripe/stripe-js';
import StripeForm from './StripeForm';
import AddressSearch from './AddressSearch';
import ReviewPayment from './ReviewPayment';
import Stepper from './stepper/Stepper';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: any;
    handleChange: (e: any) => void;
}

export default observer(function RegisterAgentForm({ isValid, dirty, isSubmitting, setFieldValue, handleChange }: Props) {
    const [step, setStep] = useState<number>(0);



    return (
        <div>
            {/* <Stepper step={step} /> */}

            {step === 0 ? <>
                <p className='form-section-title'>Account information</p>
                <br />
                <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="username" placeholder="Username" />
                <br />
                <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="email" placeholder="Email" />
                <br />
                <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="password" placeholder="Password" type="password" />

                <hr className='form-hr' />

                <p className='form-section-title'>Estate agent details</p>
                <br />
                <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="companyLegalName" placeholder="Legal business name" />
                <p className='form-section-value'>The legal name of the estate agent company</p>
                <br />
                <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="displayName" placeholder="Display name" />
                <p className='form-section-value' style={{ paddingBottom: "3px" }}>(20 characters remaining)</p>
                <p className='form-section-value'>The name will be displayed as a tag on listings</p>
                <hr className='form-hr' />
                <p className='form-section-title'>Estate agent address</p>
                <br />
                <p className='form-section-value'>The legal address of the estate agent business</p>
                <br />
                <AddressSearch setFieldValue={setFieldValue} handleChange={handleChange} />
                <br />
                <button
                    className='register-button'
                    type="button"
                    disabled={!isValid || !dirty || isSubmitting}
                    onClick={() => setStep(1)}
                >
                    Continue to payment
                </button>
            </>
                : <ReviewPayment isValid={isValid} dirty={dirty} isSubmitting={isSubmitting} setFieldValue={setFieldValue} handleChange={handleChange} />
            }
        </div>
    )
});