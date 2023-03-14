import { observer } from "mobx-react-lite";
import React from "react";
import "./JobInvoices.css";
import { Job } from "../../../../../app/model/Job";
import { JobInvoice } from "../../../../../app/model/Invoice";
import { dateFormatter } from "../../../../../app/common/HelperFunctions";
import PriceFormatter from "../../../../../app/common/PriceFormatter";
import { Link } from "react-router-dom";

interface Props {
    job: Job;
    showInvoices: boolean;
    currentJobId: string | undefined;
}

export default observer(function JobInvoices({ job, currentJobId }: Props) {

    return (
        <div className="removals-jobs__invoices">
            {currentJobId === job.invoices[0].jobId &&
                <>
                    <p>Job invoices ({job.invoicesCount} items)</p>
                    <div className="removals-jobs__invoices-items">
                        <table cellPadding="10px" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Invoice date</th>
                                    <th>Total due</th>
                                    <th>Payment status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {job.invoices.map((invoice: JobInvoice) => (
                                    <tr key={invoice.id}>
                                        <td>{invoice.index}</td>
                                        <td>{invoice.isQuotation ? 'Quotation' : 'Invoice'}</td>
                                        <td>{dateFormatter(invoice.invoiceDate)}</td>
                                        <th>{PriceFormatter(invoice.amount, invoice.currency)}</th>
                                        <td>{invoice.paymentStatus}</td>
                                        <td><Link to={`/view-job-invoice/${invoice.id}`} target="_blank"
                                        >View invoice</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    )
})