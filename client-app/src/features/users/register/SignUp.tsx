import './SignUp.css';
import { observer } from "mobx-react-lite";
import { useStore } from '../../../app/stores/store';
import React, { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm';
import PaymentWrapper from './PaymentWrapper';
import Stepper from './stepper/Stepper';
import LegalChecks from './LegalChecks';


export default observer(function SignUp() {
    const { modalStore } = useStore();
    const { closeModal, step, setStep } = modalStore;
    const [formType, setFormType] = useState<number>(0);

    useEffect(() => {
        if (step !== 0) setStep(0);
    }, [])

    return (<>
        {step === 1 &&
            <div className="register-form">
                <div className="modal-content">
                    <div className="close-container" onClick={() => closeModal()}>
                        <p className="close-modal-button">&times;</p>
                    </div>
                    <SignUpForm formType={formType} setFormType={setFormType} step={step} setStep={setStep} />
                </div>
            </div>
        }
        {step === 2 &&
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
                    <Stepper step={step} setStep={setStep} />
                    <PaymentWrapper />
                </div>
            </div>}
    </>
    )
});