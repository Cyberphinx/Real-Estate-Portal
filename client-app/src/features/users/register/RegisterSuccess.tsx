import { observer } from "mobx-react-lite";
import React from "react";
import agent from "../../../app/api/agent";
import useQuery from "../../../app/hooks/hooks";
import { useStore } from "../../../app/stores/store";
import './SignUp.css';

export default observer(function RegisterSuccessModal() {
    const { featureStore, modalStore } = useStore();
    const { setToast } = featureStore;
    const { closeModal } = modalStore;

    const email = useQuery().get('email') as string;

    function handleConfirmEmailResend() {
        agent.Account.resendVerifyLink(email).then(() => {
            setToast('show success', 'Verification email resent - please check your email');
        }).catch(error => console.log(error));
    }

    return (
        <div className="register-form">
            <div className="modal-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                <div style={{ padding: "2rem 1.25rem" }}>
                    <img src="https://res.cloudinary.com/dwcsdudyn/image/upload/v1673305279/Icons/greentick_ubm9ce.svg" alt="succeeded" style={{ width: "5rem" }} />
                    <p style={{ fontSize: "1.25rem", fontWeight: "bold", padding: "0rem 1.25rem" }}>
                        Successfully registered!
                    </p>
                    <p style={{ padding: "0rem 1.25rem", lineHeight: "1.5rem", color:"grey" }}>Please check your email (including junk email) for the verification email</p>
                    {email &&
                        <>
                            <p style={{ padding: "0rem 1.25rem", lineHeight: "1.5rem", color:"grey" }}>Didn't receive the email? Click below button to resend</p>
                            <button onClick={handleConfirmEmailResend} className="resend-button">Resend email</button>
                        </>
                    }
                </div>
            </div>
        </div>

    )
})