import React, { useEffect } from "react";
import './Removalist.css';
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import { User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import RemovalistDashboard from "./RemovalistDashboard";
import RemovalsJobs from "./jobs/RemovalsJobs";

interface Props {
    user: User | null;
}

export default observer(function Removalist({ user }: Props) {
    const { profileStore, removalistJobStore, userStore, calendarStore, jobInvoiceStore } = useStore();
    const { activeTab, setActiveTab, loadHeadquarter, loadProfile, loadingProfile } = profileStore;
    const { jobs, loadRemovalsJobs, allJobs, loadAllRemovalsJobs } = removalistJobStore;
    const { isLoggedIn } = userStore;
    const { loadEvents } = calendarStore;
    // const { loadInvoices, loadingInvoices, invoices } = jobInvoiceStore;

    useEffect(() => {
        if (isLoggedIn && user && user.accountType.toString() === "Removalist") {
            loadProfile(user.username);
            loadHeadquarter(user.username);
            loadRemovalsJobs();
            loadAllRemovalsJobs(); // for calendar
            loadEvents(user.username);
        }
        return () => {
            setActiveTab(0);
        }
    },[isLoggedIn, user, loadRemovalsJobs, loadAllRemovalsJobs, loadEvents, setActiveTab, loadProfile, loadHeadquarter,])

    function getTab() {
        switch (activeTab) {
            case 0:
                return (<RemovalsJobs />)
            case 1:
                return (<></>)
        }
    }

    return (
        <div className="removalist-container" style={{ backgroundImage: 'linear-gradient(to bottom left, rgba(246,117,168, 0.5), rgba(177,178,255,0.5))' }}>
            {loadingProfile ? <LoadingComponent content='Loading profile...' /> :
                <>
                    <section className="agent-section-one">
                        <ul className="agent-menu">
                            <li>
                                <button
                                    className={activeTab === 0 ? "agent-menu-button__active" : "agent-menu-button"}
                                    disabled={activeTab === 0 ? true : false}
                                    onClick={() => setActiveTab(0)}>Jobs</button>
                            </li>
                            <li>
                                <button
                                    className={activeTab === 1 ? "agent-menu-button__active" : "agent-menu-button"}
                                    disabled={activeTab === 1 ? true : false}
                                    onClick={() => setActiveTab(1)}>Statistics</button>
                            </li>
                        </ul>
                    </section>

                    <section className="agent-section-two">
                        {getTab()}
                    </section>

                    <section className="agent-section-three">
                            <RemovalistDashboard user={user} jobs={jobs} allJobs={allJobs} />
                    </section>
                </>
            }
        </div>
    )
})