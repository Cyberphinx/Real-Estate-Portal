import { observer } from "mobx-react-lite";
import React from "react";


export default observer(function ProfileTab() {

    return (
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
        </section>
    )
})