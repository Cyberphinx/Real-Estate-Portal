import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Job } from "../../app/model/JobAggregate/Job";
import { ServiceCategory } from "../../app/model/ServiceCategory";
import { useStore } from "../../app/stores/store";
import './Companies.css';
import ServicesHub from "./servicesHub/ServicesHub";
import SideBar from "./SideBar";

export default observer(function Companies() {
    const { jobStore } = useStore();
    const { jobs, loadingJobs, jobRegistry, loadJobs } = jobStore;

    return (
        <div className="companies-grid">
            <SideBar />
            <ServicesHub />
        </div>
    );
});