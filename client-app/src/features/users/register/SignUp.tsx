import React from 'react';
import './SignUp.css';
import { observer } from "mobx-react-lite";
import { useStore } from '../../../app/stores/store';
import SignUpForm from './SignUpForm';


export default observer(function SignUp() {
    const { modalStore } = useStore();
    const { closeModal, formType, setFormType } = modalStore;

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