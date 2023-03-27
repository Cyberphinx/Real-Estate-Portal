import React, { useEffect, useState } from "react";
import "./CreateRemovalsJob.css";
import { observer } from "mobx-react-lite";
import { Job } from "../../../app/model/Job";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import Nav from "../../../app/layout/Nav";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";


export default observer(function CreateRemovalsJob() {
    const { id } = useParams<string>();
    const { removalistJobStore, jobStore, userStore } = useStore();
    const { selectedJob, loadJobWithLeads, loadingJob } = jobStore;
    const { isLoggedIn } = userStore;

    const [currentJob, setCurrentJob] = useState<Job>();

    useEffect(() => {
        if (id) loadJobWithLeads(id);
    }, [id, loadJobWithLeads]);

    const name = selectedJob?.customerName ? selectedJob?.customerName : selectedJob?.networks.find(x => x.role.toString() === "Customer")?.displayName;
    const email = selectedJob?.customerEmail ? selectedJob?.customerEmail : selectedJob?.networks.find(x => x.role.toString() === "Customer")?.email;
    const phone = selectedJob?.customerPhone ? selectedJob?.customerPhone : selectedJob?.networks.find(x => x.role.toString() === "Customer")?.phone;


    return (
        <div>
            <Nav />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundImage: "linear-gradient(to top left, #FFCEFE, #AEE2FF)",
                height: '100vh'
            }}>

                {loadingJob && !selectedJob ?
                    <LoadingComponent content={'Loading listing form values...'} />
                    :
                    <div className="removals-form__contents">
                        <div style={{ padding: '5rem 2.5rem 0rem 2.5rem', textAlign: 'center' }}>
                            <img src="https://res.cloudinary.com/dwcsdudyn/image/upload/v1673305279/Icons/greentick_ubm9ce.svg" alt="succeeded" style={{ width: "5rem" }} />
                            <p style={{ paddingTop: '2rem' }}>
                                Booking received!
                            </p>

                            <p style={{ fontSize: '1.25rem', paddingTop: '2.5rem' }}>Thank you for your booking, {name}! We'll contact you shortly!</p>
                            <p style={{ fontSize: '1.25rem', paddingTop: '0.5rem' }}>Please check the confirmation email sent to {email}</p>

                            <p style={{ padding: "1.5rem 1.25rem 0 1.25rem",fontSize: '1rem', color: "grey" }}>Didn't receive the email? Click below button to resend</p>
                            <button className="resend-button">Resend email</button>

                            <p style={{ padding: "0.5rem 1.25rem 0 1.25rem",fontSize: '1rem', color: "grey" }}>Wrong email? Click below button to change email</p>
                            <button className="resend-button">Change and resend verification email</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
})