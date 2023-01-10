import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import agent from "../../../app/api/agent";
import useQuery from "../../../app/hooks/hooks";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../LoginForm";
import './SignUp.css';

export default observer(function ConfirmEmail() {
    const { modalStore, featureStore } = useStore();
    const { setToast } = featureStore;
    const { closeModal, openModal } = modalStore;

    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;

    const Status = {
        Verifying: 'Verifying',
        Failed: 'Failed',
        Success: 'Success'
    }

    const [status, setStatus] = useState(Status.Verifying);

    function handleConfirmEmailResend() {
        agent.Account.resendVerifyLink(email).then(() => {
            setToast('show success', 'Verification email resent - please check your email');
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        agent.Account.verifyEmail(token, email).then(() => {
            setStatus(Status.Success)
        }).catch(() => {
            setStatus(Status.Failed)
        })
    }, [Status.Failed, Status.Success, token, email])


    function getBody() {
        switch (status) {
            case Status.Verifying:
                return (
                    <div style={{position:"relative"}}>
                        <span className="verification-loader" />
                        <p style={{ padding: "10rem 1.25rem 5rem 1.25rem", lineHeight: "1.5rem" }}>Verifying email address...</p>
                    </div>
                );
            case Status.Failed:
                return (<div>
                    <p>Verification failed.  You can try resending the verify link to your email</p>
                    <button onClick={handleConfirmEmailResend}>Resend email</button>
                </div>);
            case Status.Success:
                return (
                    <div style={{ padding: "2rem 1.25rem" }}>
                        <img src="https://res.cloudinary.com/dwcsdudyn/image/upload/v1673305279/Icons/greentick_ubm9ce.svg" alt="succeeded" style={{ width: "5rem" }} />
                        <p style={{ textAlign: "center", fontSize: "1.25rem", fontWeight: "bold", padding: "0rem 1.25rem" }}>
                            Email has been verified
                        </p>
                        <p style={{ padding: "0rem 1.25rem", lineHeight: "1.5rem" }}>You can now login</p>
                        <button className="resend-button"
                            onClick={() => {
                                closeModal();
                                openModal(<LoginForm />);
                            }}>Login</button>
                    </div>
                );
        }
    }

    return (
        <div className="register-form">
            <div className="modal-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                {getBody()}
            </div>
        </div>
    )

})