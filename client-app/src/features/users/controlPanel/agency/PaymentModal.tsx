import './PaymentModal.css';
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';
import { useStore } from '../../../../app/stores/store';
import PaymentWrapper from '../../register/payment/PaymentWrapper';
import { Invoice } from '../../../../app/model/Profile';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import priceFormatter from '../../../../app/common/PriceFormatter';
import StripeForm from '../../register/payment/StripeForm';

const stripePromise = loadStripe('pk_test_51L6i4NELV0KnfWeJgoqaVUo7jOES7YMDlWgtdHdwAXRsd2ExfVwP7sU9DhIyjES0JN7yly88c9HKpp0lBvtjIakX00pl6UGKM9');

interface Props {
    invoice: Invoice;
}

export default observer(function SignUp({invoice}:Props) {
    const { userStore, modalStore } = useStore();
    const { closeModal } = modalStore;
    const { isLoggedIn, user } = userStore;

    const clientSecret = invoice.clientSecret;

    const appearance: any = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="payment-modal-form">
            <div className="payment-modal-content">
                <div className="close-modal-container" onClick={() => closeModal()}>
                    <p className="payment-modal__close-button">&times;</p>
                </div>
                <div style={{ position: "relative", paddingBottom: "1rem" }}>
                    <p style={{ textAlign: "left", fontSize: "1.125rem", fontWeight: "bold", padding: "0px 10px 0px 10px" }}>
                        Make Payment: {priceFormatter((invoice.amount / 100), invoice.currency)}
                    </p>
                    <p style={{ textAlign: "left", fontSize: "0.75rem", fontWeight: "normal", padding: "0px 10px 0px 10px" }}>
                        By continuing, you are setting up a Sanctum account and agree to our <span className='register-legal-text'>User Agreement</span> and <span className='register-legal-text'>Privacy Policy</span>.
                    </p>
                </div>
                <br />
                    {clientSecret && <Elements options={options} stripe={stripePromise}>
                        <StripeForm />
                    </Elements>}
                <br />
            </div>
        </div>
    )
});