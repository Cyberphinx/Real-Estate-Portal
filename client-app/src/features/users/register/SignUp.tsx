import './SignUp.css';
import { observer } from "mobx-react-lite";
import { useStore } from '../../../app/stores/store';
import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import PaymentWrapper from './payment/PaymentWrapper';
import Stepper from './agent/agentStepper/Stepper';


export default observer(function SignUp() {
    const { modalStore, invoiceStore } = useStore();
    const { closeModal, formType, setFormType, paymentForm, setPaymentForm } = modalStore;
    const { clientSecret } = invoiceStore;


    return (
        <div className="register-form">
            <div className="modal-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                <SignUpForm formType={formType} setFormType={setFormType} />
            </div>
        </div>
    )
});