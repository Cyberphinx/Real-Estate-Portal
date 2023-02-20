import { observer } from "mobx-react-lite";
import React from "react";
import { accountTypeSwitch } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";

export default observer(function RemovalistSettings() {
    const {userStore} = useStore();
    const {user} = userStore;
    
    return (
        <div className="agency-dashboard__section-two">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0', margin: '0' }}>{user?.displayName ? user.displayName : user?.username}</h1>
            <p>Account type: {user && accountTypeSwitch(user!)}</p>
            <p>Email address: {user?.email}</p>
            <p>Country: {user?.country}</p>
            <p>Language: {user?.language}</p>
            <p>Change password</p>
            <p>Membership status: Active</p>
            <p>Invoices</p>
        </div>
    )
})