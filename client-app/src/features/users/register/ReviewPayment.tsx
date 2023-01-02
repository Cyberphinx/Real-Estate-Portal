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

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: any;
    handleChange: (e: any) => void;
}

export default observer(function ReviewPayment({ isValid, dirty, isSubmitting, setFieldValue, handleChange }: Props) {

    return (
        <div>
            <p className='form-section-title'>Sanctum one-time membership fee</p>
            <p>Total due: £6000</p>
            <select>
                <option>Payment in one installment</option>
                <option>Payment in 6 installment</option>
                <option>Payment in 12 installment ()</option>
            </select>
            <button
                className='register-button'
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
            >
                Sign up and make payment
            </button>
        </div>

    )
});