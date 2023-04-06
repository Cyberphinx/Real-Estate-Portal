import React, { useEffect } from "react";
import "./ViewJobInvoice.css";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { NetworkDto } from "../../../app/model/Job";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import Nav from "../../../app/layout/Nav";
import { InvoiceItem } from "../../../app/model/Invoice";
import PriceFormatter from "../../../app/common/PriceFormatter";
import { dateFormatterShort } from "../../../app/common/HelperFunctions";

export default observer(function ViewJobInvoice() {
    const { invoiceId } = useParams<string>();
    const { jobInvoiceStore, jobStore, userStore, profileStore } = useStore();
    const { loadInvoiceAsSeller, invoice, loadingInvoice } = jobInvoiceStore;
    const { loadJobWithLeads, selectedJob, loadingJob } = jobStore;
    const { user, isLoggedIn } = userStore;
    const { loadHeadquarter, loadingProfile, headquarter } = profileStore;

    useEffect(() => {
        if (invoiceId) {
            loadInvoiceAsSeller(invoiceId).then(values => {
                if (values) loadJobWithLeads(values.jobId);
            });
        }
    }, [invoiceId, loadInvoiceAsSeller, loadJobWithLeads])

    useEffect(() => {
        if (isLoggedIn && user) loadHeadquarter(user.username);
    }, [isLoggedIn, user, loadHeadquarter])

    function retrieveCustomer() {
        if (selectedJob) {
            if (selectedJob.customerName) {
                let customer = {
                    displayName: selectedJob.customerName,
                    email: selectedJob.customerEmail,
                    phone: selectedJob.customerPhone
                }
                return customer;
            } else {
                let customer: NetworkDto = selectedJob.networks.find(x => x.role.toString() === "Customer")!;
                return customer;
            }
        } else {
            return null;
        }
    }

    const address = `${headquarter?.companyAddress.propertyNumberOrName && (headquarter?.companyAddress.propertyNumberOrName + ", ")}
    ${headquarter?.companyAddress.streetName && (headquarter?.companyAddress.streetName + ", ")}
    ${headquarter?.companyAddress.locality && (headquarter?.companyAddress.locality + ", ")}
    ${headquarter?.companyAddress.townOrCity && (headquarter?.companyAddress.townOrCity + ", ")}
    ${headquarter?.companyAddress.county && (headquarter?.companyAddress.county + ", ")}
    ${headquarter?.companyAddress.postalCode && (headquarter?.companyAddress.postalCode)}
    `;


    function addDays(date: Date, days: number) {
        var result: Date = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    return (
        <div>
            <Nav />
            <div style={{ backgroundImage: "linear-gradient(to top left, #FFCEFE, #AEE2FF)" }}>
                <div style={{ margin: 'auto', padding: '5rem 0 2.5rem 0', width: '60rem' }}>

                    {loadingJob || !selectedJob ? <LoadingComponent content={"Loading job..."} />
                        :
                        <div className="job-invoice__header">
                            {/* {headquarter && <div className="job-invoice__company-info">
                                    <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{headquarter?.legalName}</p>
                                    <p>Company Number {headquarter.companyRegistrationNumber}</p>
                                    <p>VAT Number {headquarter.vatNumber}</p>
                                </div>} */}
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: 'bold', letterSpacing: '0.5rem', fontSize: '2rem' }}>{invoice && invoice.isQuotation ? 'QUOTATION' : 'INVOICE'}</p>
                                {/* <p className="job-invoice__attribute">{invoice && invoice.id}</p> */}
                                <table cellPadding="10px" className="job-invoice__attribute-table">
                                    <tbody>
                                        <tr>
                                            <th>Move date : </th>
                                            <td>{dateFormatterShort(selectedJob.finishBy)}</td>
                                        </tr>
                                        <tr>
                                            <th>{invoice && invoice.isQuotation ? 'Quotation' : 'Invoice'} date : </th>
                                            <td>{invoice && dateFormatterShort(invoice.invoiceDate)}</td>
                                        </tr>
                                        {invoice && invoice.isQuotation ? null : <tr>
                                            <th>DUE DATE : </th>
                                            <td>{invoice && dateFormatterShort(addDays(invoice.invoiceDate, 10))}</td>
                                        </tr>}
                                        <tr>
                                            <th>{invoice && invoice.isQuotation ? 'Quotation' : 'Invoice'} # : </th>
                                            <td style={{ fontSize: '0.85rem' }}>{invoice && invoice.id}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2.5rem' }}>
                                <p style={{ fontWeight: 'bold', width: '6rem', paddingTop: '0', marginTop: '0', fontSize: '1rem' }}>BILLED TO</p>
                                <article style={{ width: '20rem' }}>
                                    <p style={{ fontWeight: 'bold', paddingTop: '0', marginTop: '0', fontSize: '1rem' }}>{retrieveCustomer()?.displayName}</p>
                                    <p style={{ fontSize: '1rem' }}>{selectedJob && selectedJob.jobLocations[0].displayAddress}</p>
                                    <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>(Phone) {retrieveCustomer()?.phone}</p>
                                    <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>(Email) {retrieveCustomer()?.email}</p>
                                </article>
                            </div>
                        </div>
                    }
                    {loadingInvoice || !invoice ? <LoadingComponent content={"Loading invoice..."} />
                        :
                        <div style={{ background: '#fff', padding: '2.5rem 2.5rem 0 2.5rem' }}>
                            <table className="job-invoice__table" cellPadding="15px">
                                <thead style={{ textAlign: 'left' }}>
                                    <tr>
                                        <th style={{ width: '10%' }}>#</th>
                                        <th style={{ width: '50%' }}>DESCRIPTION</th>
                                        <th style={{ width: '15%' }}>PRICE</th>
                                        <th style={{ width: '10%' }}>VAT</th>
                                        <th style={{ width: '15%' }}>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.items.map((item: InvoiceItem) => (
                                        <tr key={item.id}>
                                            <td>{item.index}</td>
                                            <td>{item.description}</td>
                                            <td>{PriceFormatter(item.amount, item.currency)}</td>
                                            <td>{item.vatPercentage}%</td>
                                            <td>{PriceFormatter(item.amount + (item.amount * (item.vatPercentage / 100)), item.currency)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <table cellPadding="15px" style={{ display: 'block', width: '40%', textAlign: 'left', marginLeft: 'auto', marginRight: '0' }}>
                                <tbody>
                                    <tr>
                                        <th style={{ width: '73.75%' }}>TOTAL NET : </th>
                                        <th>{PriceFormatter(invoice.amount / (1 + (invoice.vatPercentage / 100)), invoice.currency)}</th>
                                    </tr>
                                    <tr>
                                        <th>TOTAL VAT : </th>
                                        <th>{PriceFormatter(invoice.amount * (invoice.vatPercentage / 100), invoice.currency)}</th>
                                    </tr>
                                    <tr>
                                        <th>TOTAL AMOUNT DUE : </th>
                                        <th>{PriceFormatter(invoice.amount, invoice.currency)}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    {loadingProfile || !headquarter
                        ? <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Loading company details...</p>
                        : <div style={{ background: '#fff' }}>
                            {/* <div className="job-invoice__company-info">
                                <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{headquarter?.legalName}</p>
                                <p>Company Number {headquarter.companyRegistrationNumber}</p>
                                <p>VAT Number {headquarter.vatNumber}</p>
                            </div> */}
                            <div className="job-invoice__footer">
                                <article>
                                    <p style={{ fontWeight: 'bold' }}>Questions?</p>
                                    <table cellPadding="8px" style={{textAlign:'left'}}>
                                        <tbody>
                                            <tr>
                                                <th style={{width:'5rem'}}>Email us: </th>
                                                <td style={{width:'10rem'}}>{headquarter.companyContacts.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Call us: </th>
                                                <td>{headquarter.companyContacts.phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Address: </th>
                                                <td>{address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </article>

                                <article style={{ borderLeft: '1px solid #ccc', paddingLeft: '1rem' }}>
                                    <p style={{ fontWeight: 'bold'}}>{headquarter?.legalName}</p>
                                    <p>Company Number {headquarter.companyRegistrationNumber}</p>
                                    <p>VAT Number {headquarter.vatNumber}</p>
                                </article>

                                <article style={{ borderLeft: '1px solid #ccc', paddingLeft: '1rem' }}>
                                    <p style={{ fontWeight: 'bold'}}>Terms & Conditions / Insurance:</p>
                                    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap:'1rem' }}>
                                        <a
                                            href={headquarter.termsAndConditions}
                                            target="_blank" rel="noreferrer" >
                                            Click to view terms & conditions
                                        </a>
                                        <a
                                            href={headquarter.insurances.find(x => x.index === 0)?.insurancePolicy}
                                            target="_blank" rel="noreferrer" >
                                            Click to view insurance policy
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
})