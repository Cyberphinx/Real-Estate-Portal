import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import '.././SignUp.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";


export default observer(function StripeForm() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const {featureStore} = useStore();
    const {setToast} = featureStore;

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
                return_url: "https://sanctum.co.uk",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
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