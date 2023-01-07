import '.././SignUp.css';
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from 'react';
import { useStore } from '../../../../app/stores/store';
import Stepper from './agentStepper/Stepper';
import PaymentWrapper from '../payment/PaymentWrapper';


export default observer(function RegisterAgentStepThree() {
    const { modalStore, invoiceStore } = useStore();
    const { closeModal, formType, setFormType, paymentForm, setPaymentForm } = modalStore;
    const { clientSecret } = invoiceStore;

    useEffect(() => {
        if (formType !== 3) setFormType(3);
    }, [formType])

    return (
        <div className="register-form">
            <div className="modal-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                <div style={{ position: "relative" }}>
                    <p style={{ textAlign: "left", fontSize: "18px", fontWeight: "600", padding: "0px 20px 0px 20px" }}>
                        Sign Up
                    </p>
                    <p style={{ textAlign: "left", fontSize: "12px", fontWeight: "400", padding: "0px 20px 0px 20px" }}>
                        By continuing, you agree are setting up a Sanctum account and agree to our <span className='register-legal-text'>User Agreement</span> and <span className='register-legal-text'>Privacy Policy</span>.
                    </p>
                </div>
                <Stepper />
                <PaymentWrapper />
            </div>
        </div>
    )
});