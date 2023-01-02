import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import agent from "../../../app/api/agent";
import RegisterForm from "./RegisterForm";

const stripePromise = loadStripe('pk_test_51L6i4NELV0KnfWeJgoqaVUo7jOES7YMDlWgtdHdwAXRsd2ExfVwP7sU9DhIyjES0JN7yly88c9HKpp0lBvtjIakX00pl6UGKM9');


export default function CheckoutWrapper() {

   

    const appearance: any = {
        theme: 'stripe',
    };

    const options = {
        // clientSecret,
        appearance,
    };

    return (
        <Elements options={options} stripe={stripePromise}>
            <RegisterForm />
        </Elements>
    )
}