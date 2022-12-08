import { observer } from "mobx-react-lite";
import React from "react";
import './Dropdown.css';
import { useStore } from "../stores/store";
import LoginForm from "../../features/users/LoginForm";
import Register from "../../features/users/tabs/Register";

export default observer(function Dropdown() {
    const { modalStore } = useStore();
    const { openModal } = modalStore;

    return (
        <div className="dropdown">
            <button className="drop-button" onClick={() => openModal(<LoginForm />)}>Login</button>
            {/* <li className="dropdown-item"><button className="drop-button" onClick={() => openModal(<RegisterForm />)}>Register</button></li> */}
            <button className="drop-button" onClick={() => openModal(<Register />)}>Register</button>
            <button className="drop-button" >Dark Mode</button>
        </div>
    );
});