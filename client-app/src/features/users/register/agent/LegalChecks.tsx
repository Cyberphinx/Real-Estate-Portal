import './ReviewPayment.css';
import { observer } from "mobx-react-lite";
import React from 'react';
import { useStore } from '../../../../app/stores/store';

export default observer(function LegalChecks() {
    const { modalStore } = useStore();
    const { closeModal } = modalStore;

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
                <p>Do you have property redress scheme?</p>
            </div>
        </div>
    )
});