import { observer } from "mobx-react-lite";
import React from "react";
import './Dropdown.css';
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../../app/stores/store";
import SignUp from "./register/SignUp";

export default observer(function Dropdown() {
    const { modalStore } = useStore();
    const { openModal } = modalStore;

    return (
        <div className="dropdown">
            <button className="drop-button" style={{fontWeight:"600"}} onClick={() => openModal(<SignUp />)}>Sign Up</button>
            <button className="drop-button" onClick={() => openModal(<LoginForm />)}>Login</button>
            <button className="drop-button" >Dark Mode</button>
        </div>
    );
});