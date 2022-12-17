import React, { useRef } from "react";
import './Nav.css';
import { Link } from "react-router-dom";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import ModalContainer from "../common/ModalContainer";
import UserDropdown from "../../features/users/UserDropdown";
import Dropdown from "./Dropdown";
import OrderBy from "../../features/listings/filters/parameters/OrderBy";

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
                {/* <li className="nav-bar-item"><img className="logo" src="/assets/logo3.svg" alt="logo" /></li> */}
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
                
                {activeFeature === 0 ? <li className="nav-bar-item-right">
                    <button className="lock-button" onClick={() => setLocked()}>
                        {isLocked === true ?
                            <div>
                                <img className="lock-icon" src="/assets/static.svg" alt="lock" />
                                <span className="lock-tooltip">Static list </span>
                            </div>
                            : <div>
                                <img className="lock-icon" src="/assets/dynamic.svg" alt="lock" />
                                <span className="lock-tooltip">Dynamic list</span>
                            </div>}
                    </button>
                </li> : null}
                {activeFeature === 0 ? <li className="nav-bar-item-right">
                    <div className="sort-button-container" ref={sortingRef}>
                        <button className="sort-button" onClick={toggleSorting}>
                            <img className="sort-icon" src="/assets/sort.svg" alt="sort" />
                            <span className="sort-tooltip">Order by</span>
                        </button>
                        {sortingActive && <OrderBy />}
                    </div>
                </li> : null}

                {isLoggedIn
                    ? (
                        <>
                            <li className="nav-bar-item-right">
                                <div className="dropdown-container" ref={dropdownRef}>
                                    <button className="svg-button profile" onClick={toggle}>
                                        <img className="svg-icon" src="/assets/user.svg" alt="user" />
                                        <span className="svg-tooltip">User menu</span>
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
                                    <button className="svg-button profile" onClick={toggle}>
                                        <img className="svg-icon" src="/assets/user.svg" alt="user" />
                                        <span className="svg-tooltip">User menu</span>
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
