import React, { useRef } from "react";
import './Nav.css';
import { Link, useLocation } from "react-router-dom";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import ModalContainer from "../common/ModalContainer";
import UserDropdown from "../../features/users/UserDropdown";
import Dropdown from "../../features/users/Dropdown";

export default observer(function Nav() {
    let location = useLocation();

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const toggle = () => setIsActive(!isActive);
    // const [testError, setTestError] = useState(false);

    // const sortingRef = useRef(null);
    // const [sortingActive, setSortingActive] = useDetectOutsideClick(sortingRef, false);
    // const toggleSorting = () => setSortingActive(!sortingActive);

    const { listingStore, featureStore, userStore, companyStore } = useStore();
    const { cancelSelectListing } = listingStore;
    const { cancelSelectCompany } = companyStore;
    const { setActiveFeature } = featureStore;
    const { isLoggedIn, user } = userStore;



    return (
        <div>
            <ModalContainer />
            <ul className="nav-bar">
                <li className="nav-bar-item"><img className="logo" src="/assets/sanctum.svg" alt="S" /></li>
                <li className="nav-bar-item" style={{ paddingTop: '0.25rem' }}>
                    <Link className="home-button" to={'/map'} onClick={() => { setActiveFeature(0) }}>SANCTUM</Link>
                </li>
                <li className="nav-bar-item">
                    <button
                        className={location.pathname === "/map" ? "nav-button-selected" : "nav-button"}
                        onClick={() => { setActiveFeature(0) }}>
                        <Link to={'/map'} style={{ color: '#000', textDecoration: 'none' }}>Map</Link>
                    </button>
                </li>
                <li className="nav-bar-item">
                    <button
                        className={location.pathname === "/services" ? "nav-button-selected" : "nav-button"}
                        onClick={() => {
                            cancelSelectListing();
                            cancelSelectCompany();
                            setActiveFeature(1);
                        }}>
                        <Link to={'/services'} style={{ color: '#000', textDecoration: 'none' }}>Services</Link>
                    </button>
                </li>
                <li className="nav-bar-item">
                    <button
                        className={location.pathname === "/get-agent" ? "nav-button-selected" : "nav-button"}
                        onClick={() => {
                            cancelSelectListing();
                            cancelSelectCompany();
                        }}>
                        Get agent
                    </button>
                </li>

                <li className="nav-bar-item">
                    <button
                        className={location.pathname === "/create-removals-job" ? "nav-button-selected" : "nav-button"}
                        onClick={() => {
                            cancelSelectListing();
                            cancelSelectCompany();
                        }}>
                        <Link to={'/create-removals-job'} style={{ color: '#000', textDecoration: 'none' }}>Book moving company</Link>
                    </button>
                </li>

                {isLoggedIn
                    ? (
                        <>
                            <li className="nav-bar-item-right">
                                <div className="dropdown-container" ref={dropdownRef}>
                                    <button
                                        className={location.pathname === "/control-panel" ? "user-button-selected" : "user-button"}
                                        onClick={toggle}>
                                        <img className="user-icon" src="/assets/user.svg" alt="user" />
                                        <img className="hamburger-icon" src="/assets/hamburger.svg" alt="dropdown" />
                                    </button>
                                    {isActive && <UserDropdown />}
                                </div>
                            </li>
                            {user && user.username ? <li className="nav-bar-item-right">
                                <button
                                    className="username-button"
                                >
                                    <span>Logged in as </span> <b>{user.username}</b>
                                </button>
                            </li> : null}
                        </>
                    )
                    : (
                        <>
                            <li className="nav-bar-item-right">
                                <div className="dropdown-container" ref={dropdownRef}>
                                    <button className="user-button" onClick={toggle}>
                                        <img className="user-icon" src="/assets/user.svg" alt="user" />
                                        <img className="hamburger-icon" src="/assets/hamburger.svg" alt="dropdown" />
                                    </button>
                                    {isActive && <Dropdown />}
                                </div>
                            </li>
                        </>
                    )}
                {/* <li className="nav-bar-item-right signin"><button onClick={() => openModal(<TestError />)}>Errors</button></li> */}
                {/* <li className="nav-bar-item-right"><button className="about-button">&#63;</button></li> */}
            </ul>

        </div>
    );
});
