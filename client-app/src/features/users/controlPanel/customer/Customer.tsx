import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import { AccessStatus } from "../../../../app/model/AccessStatus";
import { User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import './Customer.css';
import { capitalizeFirstLetter } from "../../../../app/common/HelperFunctions";
import UserSettings from "./UserSettings";
import PropertyWatchlist from "../common/PropertyWatchlist";
import MyJobPosts from "../common/MyJobPosts";
import Messages from "../common/Messages";

interface Props {
    user: User | null;
}

export default observer(function Customer({ user }: Props) {
    const { profileStore } = useStore();
    const { loadProfile, loadingProfile, activeTab, setActiveTab } = profileStore;

    useEffect(() => {
        loadProfile(user!.username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, user!.username, setActiveTab])

    const panes = [
        <UserSettings />,
        <PropertyWatchlist />,
        <MyJobPosts />,
        <Messages />
    ]

    return (
        <div className="customer-container">
            {loadingProfile ? <LoadingComponent content='Loading profile...' /> :
                <>
                    <section className="customer-section-one">
                        <h1 className="customer-title">{user?.displayName ? capitalizeFirstLetter(user?.displayName) : capitalizeFirstLetter(user!.username)}'s control panel</h1>
                        <ul className="customer-menu">
                            <li>
                                <button
                                    className={activeTab === 0 ? "customer-menu-button-active" : "customer-menu-button"}
                                    onClick={() => setActiveTab(0)}>User settings</button>
                            </li>
                            <li>
                                <button
                                    className={activeTab === 1 ? "customer-menu-button-active" : "customer-menu-button"}
                                    onClick={() => setActiveTab(1)}>Property watchlist</button>
                            </li>
                            <li>
                                <button
                                    className={activeTab === 2 ? "customer-menu-button-active" : "customer-menu-button"}
                                    onClick={() => setActiveTab(2)}>My job posts</button>
                            </li>
                            {/* <li>
                                <button
                                    className={activeTab === 3 ? "customer-menu-button-active" : "customer-menu-button"}
                                    onClick={() => setActiveTab(3)}>Messages</button>
                            </li> */}
                        </ul>
                    </section>
                    <section className="customer-section-two">
                        {panes[activeTab]}
                    </section>
                </>
            }
        </div>
    )
})