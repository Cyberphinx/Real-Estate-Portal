import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import './RegisterToolbar.css';

export default observer(function RegisterToolbar() {
    const {featureStore} = useStore();
    const {activeRegister, setActiveRegister} = featureStore;

    return (
        <div className="register-toolbar">
            <section className={activeRegister === 0 ? "individual-selected" : "individual"} onClick={() => setActiveRegister(0)}>
                    <p>Individual</p>
            </section>
            <section className={activeRegister === 1 ? "agent-selected" : "agent"} onClick={() => setActiveRegister(1)}>
                    <p>Property Agent</p>
            </section>
        </div>
    )
})