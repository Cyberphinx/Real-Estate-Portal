import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import { User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import './Agency.css';
import MyJobPosts from "../common/MyJobPosts";
import Messages from "../common/Messages";
import AgentBranches from "./branches/AgencyBranches";
import AccountSettings from "./account/AccountSettings";
import AgentListings from "./listings/AgentListings";
import MembershipTab from "./membership/MembershipTab";
import ProfileTab from "./profile/ProfileTab";
import PropertyWatchlist from "../common/PropertyWatchlist";

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
            setActiveTab(2);
        }
    }, [loadProfile, loadHeadquarter, user!.username, setActiveTab])

    const panes = [
        <AccountSettings />,
        <AgentBranches />,
        <AgentListings />,
        <MyJobPosts />,
        <Messages />,
        <MembershipTab />,
        <ProfileTab />
    ]

    function getTab() {
        switch (activeTab) {
            case 0:
                return (<AccountSettings />)
            case 1:
                return (<AgentBranches />)
            case 2:
                return (<AgentListings />)
            case 3:
                return (<MembershipTab />)
            case 4:
                return (<ProfileTab />)
            case 5:
                return (<Messages />)
            case 6:
                return (<MyJobPosts />)
            case 7:
                return (<PropertyWatchlist />)
            default:
                return (<AgentListings />)
        }
    }

    return (
        <div className="agent-container">
            {loadingProfile ? <LoadingComponent content='Loading profile...' /> :
                <>
                    <section className="agent-section-one">
                        {/* <h1 className="agent-title">{user?.displayName ? capitalizeFirstLetter(user?.displayName) : capitalizeFirstLetter(user!.username)}'s control panel</h1> */}
                        <ul className="agent-menu">
                            <li>
                                <button
                                    className="agent-menu-button"
                                    style={activeTab === 2 ? { background: "#FFC300", color: "#000", cursor: "default", borderLeft: "2px solid #000" } : {}}
                                    disabled={activeTab === 2 ? true : false}
                                    onClick={() => setActiveTab(2)}>Portfolio</button>
                            </li>

                            <li>
                                <button
                                    className="agent-menu-button"
                                    style={activeTab === 1 ? { background: "#FFC300", color: "#000", cursor: "default", borderLeft: "2px solid #000" } : {}}
                                    disabled={activeTab === 1 ? true : false}
                                    onClick={() => setActiveTab(1)}>Branches</button>
                            </li>
                        </ul>

                        <hr className="agent-divider" />

                        <ul className="agent-menu">
                            <li>
                                <button
                                    className="agent-menu-button"
                                    style={activeTab === 7 ? { background: "#FFC300", color: "#000", cursor: "default", borderLeft: "2px solid #000" } : {}}
                                    disabled={activeTab === 7 ? true : false}
                                    onClick={() => setActiveTab(7)}>Watchlist</button>
                            </li>
                            <li>
                                <button
                                    className="agent-menu-button"
                                    style={activeTab === 6 ? { background: "#FFC300", color: "#000", cursor: "default", borderLeft: "2px solid #000" } : {}}
                                    disabled={activeTab === 6 ? true : false}
                                    onClick={() => setActiveTab(6)}>Job posts</button>
                            </li>

                        </ul>

                        <hr className="agent-divider" />

                        <ul className="agent-menu">
                            <li>
                                <button
                                    className="agent-menu-button"
                                    style={activeTab === 4 ? { background: "#FFC300", color: "#000", cursor: "default", borderLeft: "2px solid #000" } : {}}
                                    disabled={activeTab === 4 ? true : false}
                                    onClick={() => setActiveTab(4)}>Profile</button>
                            </li>
                            <li>
                                <button
                                    className="agent-menu-button"
                                    style={activeTab === 3 ? { background: "#FFC300", color: "#000", cursor: "default", borderLeft: "2px solid #000" } : {}}
                                    disabled={activeTab === 3 ? true : false}
                                    onClick={() => setActiveTab(3)}>Membership</button>
                            </li>
                            <li>
                                <button
                                    className="agent-menu-button"
                                    style={activeTab === 0 ? { background: "#FFC300", color: "#000", cursor: "default", borderLeft: "2px solid #000" } : {}}
                                    disabled={activeTab === 0 ? true : false}
                                    onClick={() => setActiveTab(0)}>Settings</button>
                            </li>
                        </ul>

                        <div style={{ position: "absolute", bottom: "1rem" }}>
                            <p style={{ textAlign: "center", fontSize: "0.85rem" }}>Contact us: info@sanctum.co.uk</p>
                            <p style={{ textAlign: "center", fontSize: "0.75rem" }}>© {new Date().getFullYear()} Cerberus Cybernetics Ltd., All Rights Reserved.</p>
                        </div>

                    </section>
                    <section className="agent-section-two">
                        {getTab()}
                    </section>
                </>
            }
        </div>
    )
})