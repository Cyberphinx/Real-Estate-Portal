import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import './Register.css';
import RegisterAgencyForm from "./RegisterAgencyForm";
import RegisterIndividualForm from "./RegisterIndividualForm";
import RegisterToolbar from "./RegisterToolbar";

export default observer(function Register() {
    const { modalStore: { closeModal }, featureStore: { activeRegister } } = useStore();

    const tabs = [
        <RegisterIndividualForm />,
        <RegisterAgencyForm />,
    ]

    return (
        <div className="register-form">
            <div className="register-modal-content">
                <RegisterToolbar />
                <div className="close-sign" onClick={() => closeModal()}>
                    <p className="close-register-button">&times;</p>
                </div>
                <div>
                    { tabs[activeRegister] }
                </div>
            </div>
        </div>
    )
})