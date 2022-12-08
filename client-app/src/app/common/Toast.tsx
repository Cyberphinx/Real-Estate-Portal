import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../stores/store";
import './Toast.css';

export default observer(function Toast() {
    const { featureStore : {toastMessage, toastClassName} } = useStore();

    return (
        <div>
            <div className={toastClassName} id="toast">{toastMessage}</div>
        </div>
    );
});