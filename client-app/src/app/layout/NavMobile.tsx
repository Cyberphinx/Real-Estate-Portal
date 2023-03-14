import React from "react";
import './Nav.css';
import { observer } from "mobx-react-lite";
import ModalContainer from "../common/ModalContainer";

export default observer(function NavMobile() {
    return (
        <div>
            <ModalContainer />
            <ul className="nav-bar">
                <li className="nav-bar-item"><img className="logo" src="/assets/sanctum.svg" alt="S" /></li>
                <li className="nav-bar-item" style={{ paddingTop: '0.25rem' }}>
                    <span className="home-button">SANCTUM</span>
                </li>
            </ul>
        </div>
    );
});
