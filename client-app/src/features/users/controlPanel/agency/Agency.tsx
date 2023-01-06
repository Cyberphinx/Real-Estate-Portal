import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import { User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import './Agency.css';
import { capitalizeFirstLetter } from "../../../../app/common/HelperFunctions";
import MyJobPosts from "../common/MyJobPosts";
import Messages from "../common/Messages";
import AgentListings from "./AgentListings";
import UserCompanies from "./AgencyBranches";
import AccountSettings from "./account/AccountSettings";

interface Props {
    user: User | null;
}

export default observer(function Customer({ user }: Props) {
    const { profileStore } = useStore();
    const { loadProfile, loadingProfile, activeTab, setActiveTab, loadHeadquarter } = profileStore;

    useEffect(() => {
        loadProfile(user!.username);
        loadHeadquarter(user!.username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, loadHeadquarter, user!.username, setActiveTab])

    const panes = [
        <AccountSettings />,
        <UserCompanies />,
        <AgentListings />,
        <MyJobPosts />,
        <Messages />
    ]

    return (
        <div className="agent-container">
            {loadingProfile ? <LoadingComponent content='Loading profile...' /> :
                <>
                    <section className="agent-section-one">
                        <h1 className="agent-title">{user?.displayName ? capitalizeFirstLetter(user?.displayName) : capitalizeFirstLetter(user!.username)}'s control panel</h1>
                        <ul className="agent-menu">
                            <li>
                                <button
                                    className={activeTab === 0 ? "agent-menu-button-active" : "agent-menu-button"}
                                    onClick={() => setActiveTab(0)}>Account settings</button>
                            </li>
                            <li>
                                <button
                                    className={activeTab === 1 ? "agent-menu-button-active" : "agent-menu-button"}
                                    onClick={() => setActiveTab(1)}>Agency branches</button>
                            </li>
                            <li>
                                <button
                                    className={activeTab === 2 ? "agent-menu-button-active" : "agent-menu-button"}
                                    onClick={() => setActiveTab(2)}>Property listings</button>
                            </li>
                            {/* <li>
                                <button
                                    className={activeTab === 4 ? "agent-menu-button-active" : "agent-menu-button"}
                                    onClick={() => setActiveTab(4)}>Messages</button>
                            </li> */}
                        </ul>
                        <div style={{ position: "absolute", bottom: "1rem" }}>
                            <p style={{ textAlign: "center", fontSize: "12px" }}>Contact us: info@sanctum.co.uk</p>
                            <p style={{ textAlign: "center", fontSize: "12px" }}>© {new Date().getFullYear()} Cerberus Cybernetics Ltd., All Rights Reserved.</p>
                        </div>
                    </section>
                    <section className="agent-section-two">
                        {panes[activeTab]}
                    </section>
                </>
            }
        </div>
    )
})