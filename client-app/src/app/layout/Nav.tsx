import React, { useRef } from "react";
import './Nav.css';
import { Link } from "react-router-dom";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import ModalContainer from "../common/ModalContainer";
import UserDropdown from "../../features/users/UserDropdown";
import Dropdown from "../../features/users/Dropdown";

export default observer(function Nav() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const toggle = () => setIsActive(!isActive);
    // const [testError, setTestError] = useState(false);

    const sortingRef = useRef(null);
    const [sortingActive, setSortingActive] = useDetectOutsideClick(sortingRef, false);
    const toggleSorting = () => setSortingActive(!sortingActive);

    const { listingStore, featureStore, userStore, companyStore } = useStore();
    const { cancelSelectListing } = listingStore;
    const { cancelSelectCompany } = companyStore;
    const { activeFeature, setActiveFeature, isLocked, setLocked } = featureStore;
    const { isLoggedIn } = userStore;

    return (
        <div>
            <ModalContainer />
            <ul className="nav-bar">
                <li className="nav-bar-item"><img className="logo" src="/assets/sanctum.svg" alt="S" /></li>
                <li className="nav-bar-item"><Link to="/">SANCTUM</Link></li>
                <li className="nav-bar-item">
                    <button className={activeFeature === 0 ? "nav-button-selected" : "nav-button"}
                        onClick={() => { setActiveFeature(0) }}>
                        Map
                    </button>
                </li>
                <li className="nav-bar-item">
                    <button className={activeFeature === 1 ? "nav-button-selected" : "nav-button"}
                        onClick={() => { cancelSelectListing(); cancelSelectCompany(); setActiveFeature(1) }}>
                        Services
                    </button>
                </li>
                <li className="nav-bar-item">
                    <button className="nav-button"
                        onClick={() => { cancelSelectListing(); cancelSelectCompany(); }}>
                        Get Agent
                    </button>
                </li>
                <li className="nav-bar-item">
                    <button className="nav-button"
                        onClick={() => { cancelSelectListing(); cancelSelectCompany(); }}>
                        Get Moving
                    </button>
                </li>

                {isLoggedIn
                    ? (
                        <>
                            <li className="nav-bar-item-right">
                                <div className="dropdown-container" ref={dropdownRef}>
                                    <button className="user-button profile" onClick={toggle}>
                                        <img className="user-icon" src="/assets/user.svg" alt="user" />
                                        {/* <span className="user-tooltip">User menu</span> */}
                                    </button>
                                    {isActive && <UserDropdown />}
                                </div>
                            </li>
                        </>
                    )
                    : (
                        <>
                            <li className="nav-bar-item-right">
                                <div className="dropdown-container" ref={dropdownRef}>
                                    <button className="user-button profile" onClick={toggle}>
                                        <img className="user-icon" src="/assets/user.svg" alt="user" />
                                        <img className="hamburger-icon" src="/assets/hamburger.svg" alt="dropdown" />
                                        {/* <span className="user-tooltip">User menu</span> */}
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
