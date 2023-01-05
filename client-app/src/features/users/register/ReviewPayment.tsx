import './ReviewPayment.css';
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from 'react';
import { dateFormatter, dateFormatterShort } from '../../../app/common/HelperFunctions';

interface Props {
    setStep: (value: number) => void;
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: any;
    handleChange: (e: any) => void;
}

export default observer(function ReviewPayment({ isValid, dirty, isSubmitting, setFieldValue, handleChange, setStep }: Props) {
    const [paymentType, setPaymentType] = useState<number>(0);

    useEffect(() => {
        setFieldValue("invoiceAmount", 600000);
        setFieldValue("invoiceDescription", `One-off payment of £6000.`);
        setFieldValue("invoiceDescription", `One-off payment of £6000.`);
    }, [])

    const amount = [
        6000,
        1000,
        500
    ]

    const duration = [
        "one-off payment",
        "for 6 months",
        "for 1 year"
    ]

    const today = new Date();
    const day = new Date();
    const endDate = new Date(day.setMonth(day.getMonth() + 12));

    return (
        <div>
            <p className='form-section-title'>Sanctum lifetime membership</p>
            <div className='payment-details'>
                <div className='payment-details__plan'>
                    <button
                        type="button"
                        className='payment-details__tab'
                        onClick={() => {
                            setPaymentType(0);
                            setFieldValue("invoiceAmount", 600000);
                            setFieldValue("invoiceDescription", `One-off payment of £6000.`);
                        }}
                        style={paymentType === 0 ? { backgroundColor: "#fff" } : {}}
                    >
                        One-off payment
                    </button>
                    <button
                        type="button"
                        className='payment-details__tab'
                        onClick={() => {
                            setPaymentType(1);
                            setFieldValue("invoiceAmount", 100000);
                            setFieldValue("invoiceDescription", `Payment of £1000 per month for 6 months.`);
                        }}
                        style={paymentType === 1 ? { backgroundColor: "#fff" } : {}}
                    >
                        6-month plan
                    </button>
                    <button
                        type="button"
                        className='payment-details__tab'
                        onClick={() => {
                            setPaymentType(2);
                            setFieldValue("invoiceAmount", 50000);
                            setFieldValue("invoiceDescription", `Payment of £500 per month for 12 months.`);
                        }}
                        style={paymentType === 2 ? { backgroundColor: "#fff" } : {}}
                    >
                        1-year plan
                    </button>
                </div>
                <br />
                {/* <hr className='payment-details__hr' /> */}

                <div>
                    <p className='payment-details__amount' >
                        <span style={{ fontSize: "1rem", fontWeight: "bold" }}>£ </span>
                        {amount[paymentType]}
                        {paymentType > 0 && <span style={{ fontSize: "0.75rem", fontWeight: "normal" }}>/ mo</span>}
                    </p>
                    <p style={{ fontSize: "0.75rem", fontWeight: "normal" }}>VAT included</p>
                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>{duration[paymentType]}</p>
                </div>
                <hr className='payment-details__hr' />
                <div>
                    <p className='payment-details__title'>Sanctum membership benefits:</p>
                    <p className='payment-details__desc'>- unlimited listings</p>
                    <p className='payment-details__desc'>- permanently free access</p>
                    <p className='payment-details__desc'>- free and fair featuring system</p>
                    <p className='payment-details__desc'>- put agencies back onto the map</p>
                    <p className='payment-details__desc'>- book real estate related services</p>
                    <p className='payment-details__desc'>- plus many more to come...</p>
                    <br />
                </div>
            </div>
            <br />
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }} >
                <button
                    className='payment-register-button'
                    type="button"
                    onClick={() => setStep(0)}
                >
                    Back to account
                </button>
                <button
                    className={isSubmitting ? 'payment-register-submitting-button' : 'payment-register-button'}
                    type="submit"
                    disabled={!isValid || !dirty || isSubmitting}
                >
                    {isSubmitting && <span className="payment-register-submitting"></span>}
                    Proceed to payment
                </button>
            </div>

        </div>

    )
});