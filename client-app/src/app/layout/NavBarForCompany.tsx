import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

export default observer(function NavBarForCompany() {
    const { companyStore, featureStore } = useStore();
    const { loadedCompany } = companyStore;
    const { setDescription, setContacts } = featureStore;

    const address = `
        ${loadedCompany?.companyAddress.townOrCity && (loadedCompany?.companyAddress.townOrCity + ", ")}
        ${loadedCompany?.companyAddress.county && (loadedCompany?.companyAddress.county + ", ")}
        ${loadedCompany?.companyAddress.postalCode && (loadedCompany?.companyAddress.postalCode)}
        `;

    return (
        <div>
            <ul className="nav-bar2">
                {/* <li className="nav-bar-item"><img className="logo" src="/assets/logo3.svg" alt="logo" /></li> */}
                <li className="nav-bar2-item"><Link to="/">SANCTUM</Link></li>
                <li className="nav-bar2-item"><p className="gist-style">
                    {loadedCompany?.displayName}
                </p></li>
                <li className="nav-bar2-item"><p className="gist-style">
                    #{loadedCompany?.companyReference}
                </p></li>
                <li className="nav-bar2-item"><p className="address-style">{address}</p></li>

                {/* {isLoggedIn ? <li className="nav-bar2-item-right" ><button className="nav-bar-user">Logged in as: {user?.username}</button></li> : null} */}
                <li className="nav-bar2-item-right"><button className="nav-bar-button" onClick={() => setContacts()}>Contact agent</button></li>
                <li className="nav-bar2-item-right"><button className="nav-bar-button" onClick={() => setDescription()}>Description</button></li>
            </ul>
        </div>
    );
});
