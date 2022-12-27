import React from "react";
import './NavBarForJob.css';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

export default observer(function NavBarForJob() {
    const { jobStore, featureStore, userStore } = useStore();
    const { selectedJob: job } = jobStore;
    const { setDescription, setContacts } = featureStore;

    const address = `
        ${job?.jobLocation.townOrCity && (job?.jobLocation.townOrCity + ", ")}
        ${job?.jobLocation.county && (job?.jobLocation.county + ", ")}
        ${job?.jobLocation.postalCode && (job?.jobLocation.postalCode)}
        `;

    const addedDate = new Date(job!.addedOn).toLocaleDateString();

    return (
        <div>
            <ul className="nav-bar-job">
                <li className="nav-bar-job-item"><img className="logo-large" src="/assets/sanctum.svg" alt="S" /></li>
                <li className="nav-bar-job-item"><Link to="/">SANCTUM</Link></li>
                {userStore.isLoggedIn ?
                    <li className="nav-bar2-item-right" >
                        <button className="nav-bar-user">Logged in as: {userStore.user?.username}
                        </button>
                    </li>
                    : null}
            </ul>
        </div>
    );
});
