import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStore } from "../../../../app/stores/store";
import './UserSettings.css';


export default observer(function UserSettings() {
    const { userStore } = useStore();
    const { user } = userStore;

    const accountTab =
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
                <p className="account-tab-label">General</p>
                <p className="account-tab-value">This is the general user account. If you are operating as a Real Estate Agent or Tradesperson, please submit a request to upgrade.</p>
                <button className="account-edit-button">Upgrade</button>
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
        </section>;

    const profileTab =
        <section>
            <p className="account-tab-title">Customize profile</p>
            <p className="account-tab-subtitle">Profile information</p>

            <p className="account-tab-label">Display name (optional)</p>
            <p className="account-tab-value">Set a display name. This does not change your username</p>
            <input className="account-tab-input" placeholder="Display name (optional)" />
            <p className="account-tab-value">20 Characters remaining</p>

            <p className="account-tab-label">About (optional)</p>
            <p className="account-tab-value">A brief description of yourself shown on your profile</p>
            <textarea className="account-tab-textarea" placeholder="About (optional)" />
            <p className="account-tab-value">200 Characters remaining</p>

            <p className="account-tab-subtitle">Images</p>
            <p className="account-tab-label">Avatar and banner image</p>
            <p className="account-tab-value">Images must be .png or .jpg format</p>
            <img className="large-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
            <div>
                <p className="account-tab-value">Drag and Drop or Upload <b>Banner</b> Image</p>
            </div>
        </section>;

    const tabs = [
        accountTab,
        profileTab
    ]

    const [tabNumber, setTabNumber] = useState<number>(0);

    return (
        <div className="account-settings-container">
            <div className="account-settings-toolbar">
                <p className="account-settings-title">User settings</p>
                <section>
                    <button className={tabNumber === 0 ? "account-button-active" : "account-button"} onClick={() => setTabNumber(0)}>Account</button>
                    <button className={tabNumber === 1 ? "account-button-active" : "account-button"} onClick={() => setTabNumber(1)}>Profile</button>
                </section>
            </div>

            <div className="account-contents-container">
                {tabs[tabNumber]}
            </div>

        </div>
    )
})