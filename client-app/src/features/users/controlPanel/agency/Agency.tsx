import React, { useEffect } from "react";
import './Agency.css';
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import { User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import AgentBranches from "./branches/AgentBranches";
import AgentListings from "./listings/AgentListings";
import AgentDashboard from "./AgentDashboard";
import AgentEmployees from "./employees/AgentEmployees";

interface Props {
    user: User | null;
}

export default observer(function Agency({ user }: Props) {
    const { profileStore } = useStore();
    const { activeTab, setActiveTab, loadHeadquarter, loadProfile, loadingProfile } = profileStore;

    useEffect(() => {
        loadProfile(user!.username);
        loadHeadquarter(user!.username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, loadHeadquarter, user!.username, setActiveTab])

    function getTab() {
        switch (activeTab) {
            case 0:
                return (<AgentListings />)
            case 1:
                return (<AgentBranches />)
            case 2:
                return (<AgentEmployees />)
        }
    }

    return (
        <div className="agent-container" style={{ backgroundImage: 'linear-gradient(to bottom left, rgba(246,117,168, 0.5), rgba(177,178,255,0.5))' }}>
            {loadingProfile ? <LoadingComponent content='Loading profile...' /> :
                <>
                    <section className="agent-section-one">
                        
                        <ul className="agent-menu">
                            <li>
                                <button
                                    className={activeTab === 0 ? "agent-menu-button__active" : "agent-menu-button"}
                                    disabled={activeTab === 0 ? true : false}
                                    onClick={() => setActiveTab(0)}>Portfolio</button>
                            </li>

                            <li>
                                <button
                                    className={activeTab === 1 ? "agent-menu-button__active" : "agent-menu-button"}
                                    disabled={activeTab === 1 ? true : false}
                                    onClick={() => setActiveTab(1)}>Branches</button>
                            </li>

                            <li>
                                <button
                                    className={activeTab === 2 ? "agent-menu-button__active" : "agent-menu-button"}
                                    disabled={activeTab === 2 ? true : false}
                                    onClick={() => setActiveTab(2)}>Employees</button>
                            </li>
                        </ul>

                        {/* <hr className="agent-divider" />

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
                                    style={activeTab === 2 ? { background: "#FFC300", color: "#000", cursor: "default", borderLeft: "2px solid #000" } : {}}
                                    disabled={activeTab === 2 ? true : false}
                                    onClick={() => setActiveTab(2)}>Settings</button>
                            </li>
                        </ul> */}

                    </section>

                    <section className="agent-section-two">
                        {getTab()}
                    </section>

                    <section className="agent-section-three">
                            <AgentDashboard user={user} />
                    </section>
                </>
            }
        </div>
    )
})