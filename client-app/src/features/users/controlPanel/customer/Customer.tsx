import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import { User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import './Customer.css';
import CustomerDashboard from "./CustomerDashboard";
import Watchlist from "./Watchlist";
import MyJobs from "./MyJobs";

interface Props {
    user: User | null;
}

export default observer(function Customer({ user }: Props) {
    const { profileStore } = useStore();
    const { loadProfile, loadingProfile, activeTab, setActiveTab } = profileStore;

    useEffect(() => {
        if (user) loadProfile(user.username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, user, setActiveTab])

    function getTab() {
        switch (activeTab) {
            case 0:
                return (<Watchlist />)
            case 1:
                return (<MyJobs />)
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
                                    onClick={() => setActiveTab(0)}>Watchlist</button>
                            </li>

                            <li>
                                <button
                                    className={activeTab === 1 ? "agent-menu-button__active" : "agent-menu-button"}
                                    disabled={activeTab === 1 ? true : false}
                                    onClick={() => setActiveTab(1)}>My jobs</button>
                            </li>

                            <li>
                                <button
                                    className={activeTab === 2 ? "agent-menu-button__active" : "agent-menu-button"}
                                    disabled={activeTab === 2 ? true : false}
                                    onClick={() => setActiveTab(2)}>Notifications</button>
                            </li>
                        </ul>

                    </section>

                    <section className="agent-section-two">
                        {getTab()}
                    </section>

                    <section className="agent-section-three">
                            <CustomerDashboard user={user} />
                    </section>
                </>
            }
        </div>
    )
})