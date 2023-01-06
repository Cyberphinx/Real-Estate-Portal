import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../../../app/stores/store";
import './AccountSettings.css';;


export default observer(function AccountTab() {
    const { userStore } = useStore();
    const { user } = userStore;

    return (
        <section>
            <p className="account-tab-title">Account settings</p>
            <p className="account-tab-subtitle">Account preferences</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Email address</p>
                <p className="account-tab-value">{user?.email}</p>
                <button className="account-edit-button">Change</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Change password</p>
                <p className="account-tab-value">Password must be at least 8 characters long</p>
                <button className="account-edit-button">Change</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Language</p>
                <p className="account-tab-value">Select the language you'd like to experience the Sanctum interface in. Note that this won't change the language of user-generated content </p>
                <select className="account-edit-button">
                    <option>English</option>
                </select>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Country</p>
                <p className="account-tab-value">This is your primary location</p>
                <select className="account-edit-button">
                    <option>United Kingdom</option>
                </select>
            </div>
            <p className="account-tab-subtitle">Account type</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Property Agent</p>
                <p className="account-tab-value">This is the property agent account.</p>
                {/* <button className="account-edit-button">Upgrade</button> */}
            </div>
            <p className="account-tab-subtitle">Connected accounts</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Connect to Google</p>
                <p className="account-tab-value">Connect account to log in to Sanctum with Google</p>
                <button className="account-edit-button">Connect to Google</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Connect to Facebook</p>
                <p className="account-tab-value">Connect account to log in to Sanctum with Facebook</p>
                <button className="account-edit-button">Connect to Facebook</button>
            </div>
        </section>
    )
})