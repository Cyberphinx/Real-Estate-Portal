import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dateFormatterShort } from "../../../../../app/common/HelperFunctions";
import LoadingComponent from "../../../../../app/common/loading/LoadingComponent";
import priceFormatter from "../../../../../app/common/PriceFormatter";
import DateTag from "../../../../../app/common/tags/DateTag";
import { Job, JobLifeCycle, JobLocation } from "../../../../../app/model/Job";
import { useStore } from "../../../../../app/stores/store";
import JobInvoices from "./JobInvoices";
import "./RemovalsJobs.css";

export default observer(function RemovalsJobs() {
    const { removalistJobStore } = useStore();
    const { jobs, loadingJobs } = removalistJobStore;

    const [showInvoices, setShowInvoices] = useState<boolean>(false);
    const [currentJobId, setCurrentJobId] = useState<string | undefined>(undefined);

    // function handleShowInvoices(jobId: string) {
    //     if (jobId === currentJobId) {
    //         setShowInvoices(true);
    //     }
    // }

    const address = (address: JobLocation) =>
        `${address.propertyNumberOrName && (address.propertyNumberOrName + ", ")}
        ${address.streetName && (address.streetName + ", ")}
        ${address.locality && (address.locality + ", ")}
        ${address.townOrCity && (address.townOrCity + ", ")}
        ${address.county && (address.county + ", ")}
        ${address.postalCode && (address.postalCode)}
        `;

    // const username = (job: Job) => {
    //     return job.customerName ? job.customerName : job.networks.find(x => x.role.toString() === "Customer")?.username;
    // }

    const displayName = (job: Job) => {
        return job.customerName ? job.customerName : job.networks.find(x => x.role.toString() === "Customer")?.displayName;
    }

    const phone = (job: Job) => {
        return job.customerPhone ? job.customerPhone : job.networks.find(x => x.role.toString() === "Customer")?.phone;
    }

    const email = (job: Job) => {
        return job.customerEmail ? job.customerEmail : job.networks.find(x => x.role.toString() === "Customer")?.email;
    }

    const image = (job: Job) => {
        return job.customerImage ? job.customerImage : job.networks.find(x => x.role.toString() === "Customer")?.image;
    }

    // function switchLifeCycleTag(cycle: JobLifeCycle) {
    //     switch (cycle.toString()) {
    //         case 'Open':
    //             return { background: '#000' }
    //         case 'InProgress':
    //             return { background: '#000' }
    //         case 'Cancelled':
    //             return { background: '#000' }
    //         case 'Completed':
    //             return { background: '#000' }
    //         case 'Paid':
    //             return { background: '#000' }
    //         case 'InDispute':
    //             return { background: '#000' }
    //         case 'Refunded':
    //             return { background: '#000' }
    //     }
    // }

    return (
        <div className="removals-jobs" id="agent-listings">
            {/* <div className='view-listings__filters-item'>
                    <input className="view-listings__input" placeholder="Enter job reference" onChange={() => { }} />
                    <button className="view-listings__search-button">
                        <img src="/assets/search.svg" alt="ref" className="view-listings__search-icon" />
                    </button>
                </div> */}

            <div style={{ padding: '0 2.5rem' }}>
                {loadingJobs ?
                    <div style={{ position: 'absolute', left: '40%', top: '60%' }}>
                        <LoadingComponent content={'Loading...'} />
                    </div>
                    :
                    jobs.map((job: Job) => (
                        <div key={job.id} className="removals-jobs__item">
                            <div style={{ display: 'grid', gridTemplateColumns: '6.5rem auto' }}>
                                <div>
                                    {job.customerImage || job.networks.find(x => x.role.toString() === "Customer")?.image
                                        ? <img src={image(job)} alt="user" className="removals-jobs__icon" />
                                        : <img alt="user" className="removals-jobs__icon"
                                            src="https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849709/Placeholder/UserIcons/Creative-Tail-Animal-sheep_civgh4.svg"
                                        />}
                                </div>
                                <div>
                                    <p style={{ fontSize: '1.125rem' }}>
                                        <b>{displayName(job)}</b>
                                        <span> - {phone(job)}</span>
                                        <span> - {email(job)}</span>
                                    </p>
                                    <div style={{ position: 'absolute', top: '5.5rem', left: '8.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <span className="removals-jobs__tag" style={{ background: '#000' }}>
                                            {job.jobReference}
                                        </span>
                                        <span className="removals-jobs__tag" style={{ background: '#FF78F0' }}>
                                            Move date: {dateFormatterShort(job.finishBy)}
                                        </span>
                                        {/* <span className="removals-jobs__tag" style={{ background: '#2192FF' }}>
                                            Invoices: {job.invoicesCount}
                                        </span> */}
                                        <span className="removals-jobs__tag" style={{ background: '#00FFD1', color: '#000' }}>
                                            {job.jobLifeCycle}
                                        </span>
                                    </div>

                                    <div style={{ margin: '5rem 0 2.5rem 0' }}>
                                        {job.jobLocations.map((item: JobLocation) => (
                                            <div key={item.id}>
                                                <p className="removals-jobs__subtitle">{item.addressType}:</p>
                                                <p className="removals-jobs__address">{address(item)}</p>
                                            </div>
                                        ))}
                                        <p className="removals-jobs__subtitle">Job description:</p>
                                        <p className="removals-jobs__description">{job.description}</p>
                                    </div>
                                    {showInvoices && <JobInvoices job={job} showInvoices={showInvoices} currentJobId={currentJobId} />}
                                </div>

                            </div>

                            <div className="removals-jobs__footer">
                                {/* <button className="removals-jobs__quote-button">Create quotation</button>
                                <button className="removals-jobs__quote-button">View quotations</button> */}
                                <button className="removals-jobs__invoice-button">
                                    <Link to={`/creat-invoice/job/${job.id}`} target="_blank"
                                        style={{ color: '#fff', textDecoration: 'none' }}
                                    >New invoice</Link>
                                </button>
                                <button
                                    className="removals-jobs__invoice-button"
                                    onClick={() => {
                                        setCurrentJobId(job.id);
                                        if (job.invoices[0].jobId === currentJobId && showInvoices === false) setShowInvoices(true);
                                        if (job.invoices[0].jobId === currentJobId && showInvoices === true) setShowInvoices(false);
                                    }}
                                >
                                    <span>{showInvoices && currentJobId === job.invoices[0].jobId ? 'Hide ' : 'Show '}</span>
                                    <span>{job.invoicesCount > 0 && job.invoicesCount} invoices</span>
                                </button>
                            </div>

                            {/* <button className="view-listing__edit-button">
                                <Link to={`/creat-invoice/job/${job.id}`} target="_blank"
                                    style={{ color: '#fff', textDecoration: 'none' }}
                                >Invoice</Link>
                            </button> */}
                        </div>
                    ))
                }
            </div>

        </div>
    )
})