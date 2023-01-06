import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
    CardNumberElement
} from "@stripe/react-stripe-js";
import { StripeError, StripePaymentElementOptions } from "@stripe/stripe-js";
import { useStore } from "../../../app/stores/store";
import './SignUp.css';
import { observer } from "mobx-react-lite";


export default observer(function PaymentForm() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { featureStore, modalStore, userStore } = useStore();
    const { setToast } = featureStore;
    const { closeModal, step, setStep } = modalStore;
    const { user } = userStore;

    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState<string | undefined>('');
    const [message, setMessage] = useState<string | undefined | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent!.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        });

        
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={(e: any) => setEmail(e.target.value)}
            />
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <br />
            <button
                className={isLoading ? 'register-submitting-button' : 'register-button'}
                disabled={isLoading || !stripe || !elements}
                id="submit"
            >
                {isLoading && <span className="register-submitting"></span>}
                Pay now
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message" className="register-form-error">{message}</div>}
        </form>
    );
})