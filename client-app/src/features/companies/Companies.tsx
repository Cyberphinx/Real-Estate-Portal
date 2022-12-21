import { observer } from "mobx-react-lite";
import React from "react";
import './Companies.css';
import ServicesHub from "./servicesHub/ServicesHub";
import SideBar from "./SideBar";

export default observer(function Companies() {

    return (
        <div className="companies-grid">
            <SideBar />
            <ServicesHub />
        </div>
    );
});