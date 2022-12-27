import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

export default observer(function NavBarForCompany() {
    const { companyStore, featureStore } = useStore();
    const { selectedCompany: company } = companyStore;
    const { setDescription, setContacts } = featureStore;

    const address = `
        ${company?.companyAddress.townOrCity && (company?.companyAddress.townOrCity + ", ")}
        ${company?.companyAddress.county && (company?.companyAddress.county + ", ")}
        ${company?.companyAddress.postalCode && (company?.companyAddress.postalCode)}
        `;

    return (
        <div>
            <ul className="nav-bar2">
                <li className="nav-bar-item"><img className="logo-large" src="/assets/sanctum.svg" alt="S" /></li>
                <li className="nav-bar2-item"><Link to="/">SANCTUM</Link></li>
                <li className="nav-bar2-item"><p className="gist-style">
                    {company?.displayName}
                </p></li>
                <li className="nav-bar2-item"><p className="gist-style">
                    #{company?.companyReference}
                </p></li>
                <li className="nav-bar2-item"><p className="address-style">{address}</p></li>

                {/* {isLoggedIn ? <li className="nav-bar2-item-right" ><button className="nav-bar-user">Logged in as: {user?.username}</button></li> : null} */}
                <li className="nav-bar2-item-right"><button className="nav-bar-button" onClick={() => setContacts()}>Contact agent</button></li>
                <li className="nav-bar2-item-right"><button className="nav-bar-button" onClick={() => setDescription()}>Description</button></li>
            </ul>
        </div>
    );
});
