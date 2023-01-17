import { observer } from "mobx-react-lite";
import React from "react";
import { dateFormatter, dateFormatterShort } from "../../../../../app/common/HelperFunctions";
import priceFormatter from "../../../../../app/common/PriceFormatter";
import InvoiceStatusTag from "../../../../../app/common/tags/InvoiceStatusTag";
import { Invoice, InvoiceItem } from "../../../../../app/model/Profile";
import { useStore } from "../../../../../app/stores/store";
import PaymentModal from "../PaymentModal";
import './AccountSettings.css';


export default observer(function MembershipTab() {
    const { profileStore, modalStore } = useStore();
    const { profile, headquarter } = profileStore;
    const { openModal } = modalStore;

    const address = `${headquarter?.companyAddress.propertyNumberOrName && (headquarter?.companyAddress.propertyNumberOrName + ", ")}
        ${headquarter?.companyAddress.streetName && (headquarter?.companyAddress.streetName + ", ")}
        ${headquarter?.companyAddress.locality && (headquarter?.companyAddress.locality + ", ")}
        ${headquarter?.companyAddress.townOrCity && (headquarter?.companyAddress.townOrCity + ", ")}
        ${headquarter?.companyAddress.county && (headquarter?.companyAddress.county + ", ")}
        ${headquarter?.companyAddress.postalCode && (headquarter?.companyAddress.postalCode)}
        `;

    return (
        <section>
            <p className="account-tab-title">Membership details</p>
            <p className="account-tab-subtitle">Status</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label" style={{ paddingBottom: "40px" }}>Membership status</p>
                {profile?.membership?.isActive ? 
                <p className="status-active">Active</p> 
                : 
                <div>
                    <p className="status-inactive">Inactive</p>
                    <p className="account-tab-value">Please fill in the Compliance section below to activate the account.</p>
                </div>
                }
            </div>

            <p className="account-tab-subtitle">Compliance</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Redress Scheme</p>
                <p className="account-tab-value">All UK estate agents must register with a property redress scheme</p>
                <button className="account-edit-button">Add</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Professional Indemnity Insurance</p>
                <p className="account-tab-value">All UK estate agents must have PI</p>
                <button className="account-edit-button">Add</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">ICO Registration</p>
                <p className="account-tab-value">All companies that process personal information must have ICO</p>
                <button className="account-edit-button">Add</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Client Money Protection Scheme/Insurance</p>
                <p className="account-tab-value">Different rules for England / Scotland / Northern Ireland</p>
                <button className="account-edit-button">Add</button>
            </div>

            <p className="account-tab-subtitle">Invoices</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Invoices</p>
                <p className="account-tab-value">Total invoices for this account: {profile?.invoices.length}</p>
                {profile?.invoices.map((invoice: Invoice) => (
                    <div key={invoice.id} className="invoice-container">
                        <InvoiceStatusTag invoice={invoice} />
                        <div style={{ paddingRight: "20px" }}>
                            <p className="invoice-title">Sanctum</p>
                            <div className="invoice-header">
                                <article>
                                    <p className="invoice-subtitle">Invoice to:</p>
                                    <p className="invoice-text">{headquarter?.legalName}</p>
                                    <p className="invoice-text">{address}</p>
                                </article>
                                <article>
                                    <p className="invoice-subtitle">Invoice</p>
                                    <p className="invoice-text">Invoice #: {invoice.invoiceNumber}</p>
                                    <p className="invoice-text">Invoice date: {dateFormatter(invoice.invoiceDate)}</p>
                                </article>
                            </div>
                            <div style={{ padding: "40px 40px 40px 20px" }}>
                                <table className="invoice-table">
                                    <caption className="invoice-subtitle" style={{ paddingBottom: "0.5rem" }}>Invoice Items:</caption>
                                    <thead className="invoice-table__thead">
                                        <tr>
                                            <th>No.</th>
                                            <th>Item Title</th>
                                            <th>Item Description</th>
                                            <th>Price</th>
                                            <th>Qty.</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="invoice-table__tbody">
                                        {invoice.items.map((item: InvoiceItem, index: number) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{priceFormatter(((item.amount / 100) / ((item.vatPercentage + 100) / 100)), item.currency)}</td>
                                                <td>1</td>
                                                <td>{priceFormatter(((item.amount / 100) / ((item.vatPercentage + 100) / 100)), item.currency)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <article style={{ textAlign: "right", width: "50%", float: "right" }}>
                                    <p className="invoice-text">Sub Total: {priceFormatter(((invoice.amount / 100) / ((invoice.vatPercentage + 100) / 100)), invoice.currency)}</p>
                                    <p className="invoice-text">
                                        {invoice.vatPercentage}% VAT: {priceFormatter((invoice.amount / 100) - (invoice.amount / 100) / ((invoice.vatPercentage + 100) / 100), invoice.currency)}
                                    </p>
                                    <p className="invoice-total" style={{ borderTop: "1px solid grey", padding: "20px 0px" }}>
                                        Total: {priceFormatter((invoice.amount / 100), invoice.currency)}
                                    </p>
                                </article>
                            </div>
                            <article>
                                <p className="invoice-subtitle">Invoice description:</p>
                                <p className="invoice-text" style={{ padding: "0px 10px 10px 20px" }}>{invoice.description}</p>
                            </article>
                            <article>
                                <p className="invoice-subtitle">Payment info: </p>
                                <div style={{ padding: "0px 10px 10px 20px" }}>
                                    <p className="invoice-text">Account name: Sanctum</p>
                                    <p className="invoice-text">Account number: 67827128</p>
                                    <p className="invoice-text">Sort code: 73-94-10</p>
                                    <p className="invoice-text">Bank name: HSBC UK</p>
                                </div>
                            </article>
                        </div>
                        <button className="invoice-button print">Print</button>
                        <button
                            className="invoice-button payment"
                            onClick={() => {
                                openModal(<PaymentModal invoice={invoice} />);
                            }}
                            disabled={invoice.paymentStatus.toString() === "Paid" ? true : false}
                        >
                            Make Payment
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
})