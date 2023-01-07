import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../../../app/stores/store";
import StripeForm from "./StripeForm";
import './PaymentWrapper.css';

const stripePromise = loadStripe('pk_test_51L6i4NELV0KnfWeJgoqaVUo7jOES7YMDlWgtdHdwAXRsd2ExfVwP7sU9DhIyjES0JN7yly88c9HKpp0lBvtjIakX00pl6UGKM9');

export default observer(function PaymentWrapper() {
    const { userStore, invoiceStore } = useStore();
    const { isLoggedIn, user } = userStore;
    const { loadFirstInvoice, loadingInvoice, clientSecret } = invoiceStore;

    useEffect(() => {
        if (isLoggedIn && user?.accountType.toString() === "Agent") {
            loadFirstInvoice();
        }
    }, [loadFirstInvoice, isLoggedIn]);

    const appearance: any = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (<>
        {loadingInvoice || !clientSecret ?
            <div style={{ position: "relative" }}>
                <span className="payment-form-loader" />
                <p className="payment-form-loading__text">Loading secure payment function...</p>
            </div>
            :
            <Elements options={options} stripe={stripePromise}>
                <StripeForm />
            </Elements>
        }
    </>
    )
})