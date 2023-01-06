import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../../../app/stores/store";
import './AccountSettings.css';import AccountTab from "./AccountTab";
import MembershipTab from "./MembershipTab";
import ProfileTab from "./ProfileTab";
;


export default observer(function AccountSettings() {
    const { profileStore, userStore, modalStore } = useStore();
    const { profile, headquarter } = profileStore;
    const { user } = userStore;
    const { openModal, step, setStep } = modalStore;

    useEffect(() => {
        if (step !== 2) setStep(2);
    }, [])

    const tabs = [
        <MembershipTab />,
        <AccountTab />,
        <ProfileTab />
    ]

    const [tabNumber, setTabNumber] = useState<number>(0);

    return (
        <div className="account-settings-container">
            <div className="account-settings-toolbar">
                <p className="account-settings-title">Account settings</p>
                <section>
                    <button className={tabNumber === 0 ? "account-button-active" : "account-button"} onClick={() => setTabNumber(0)}>Membership</button>
                    <button className={tabNumber === 1 ? "account-button-active" : "account-button"} onClick={() => setTabNumber(1)}>Account</button>
                    <button className={tabNumber === 2 ? "account-button-active" : "account-button"} onClick={() => setTabNumber(2)}>Profile</button>
                </section>
            </div>

            <div className="account-contents-container">
                {tabs[tabNumber]}
            </div>

        </div>
    )
})