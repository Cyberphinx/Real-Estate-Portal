import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { dateFormatter, dateFormatterShort } from "../../../../app/common/HelperFunctions";
import priceFormatter from "../../../../app/common/PriceFormatter";
import InvoiceStatusTag from "../../../../app/common/tags/InvoiceStatusTag";
import { Invoice, InvoiceItem } from "../../../../app/model/Profile";
import { useStore } from "../../../../app/stores/store";
import './AgentUserSettings.css';


export default observer(function AgentUserSettings() {
    const { profileStore, userStore } = useStore();
    const { profile, headquarter } = profileStore;
    const { user } = userStore;

    const address = `${headquarter?.companyAddress.propertyNumberOrName && (headquarter?.companyAddress.propertyNumberOrName + ", ")}
        ${headquarter?.companyAddress.streetName && (headquarter?.companyAddress.streetName + ", ")}
        ${headquarter?.companyAddress.locality && (headquarter?.companyAddress.locality + ", ")}
        ${headquarter?.companyAddress.townOrCity && (headquarter?.companyAddress.townOrCity + ", ")}
        ${headquarter?.companyAddress.county && (headquarter?.companyAddress.county + ", ")}
        ${headquarter?.companyAddress.postalCode && (headquarter?.companyAddress.postalCode)}
        `;

    const accountTab =
        <section>
            <p className="account-tab-title">Account settings</p>
            <p className="account-tab-subtitle">Account preferences</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Email address</p>
                <p className="account-tab-value">{user?.email}</p>
                <button className="account-edit-button">Change</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Change password</p>
                <p className="account-tab-value">Password must be at least 8 characters long</p>
                <button className="account-edit-button">Change</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Language</p>
                <p className="account-tab-value">Select the language you'd like to experience the Sanctum interface in. Note that this won't change the language of user-generated content </p>
                <select className="account-edit-button">
                    <option>English</option>
                </select>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Country</p>
                <p className="account-tab-value">This is your primary location</p>
                <select className="account-edit-button">
                    <option>United Kingdom</option>
                </select>
            </div>
            <p className="account-tab-subtitle">Account type</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Property Agent</p>
                <p className="account-tab-value">This is the property agent account.</p>
                {/* <button className="account-edit-button">Upgrade</button> */}
            </div>
            <p className="account-tab-subtitle">Connected accounts</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Connect to Google</p>
                <p className="account-tab-value">Connect account to log in to Sanctum with Google</p>
                <button className="account-edit-button">Connect to Google</button>
            </div>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label">Connect to Facebook</p>
                <p className="account-tab-value">Connect account to log in to Sanctum with Facebook</p>
                <button className="account-edit-button">Connect to Facebook</button>
            </div>
        </section>;

    const profileTab =
        <section>
            <p className="account-tab-title">Customize profile</p>
            <p className="account-tab-subtitle">Profile information</p>

            <p className="account-tab-label">Display name (optional)</p>
            <p className="account-tab-value">Set a display name. This does not change your username</p>
            <input className="account-tab-input" placeholder="Display name (optional)" />
            <p className="account-tab-value">20 Characters remaining</p>

            <p className="account-tab-label">About (optional)</p>
            <p className="account-tab-value">A brief description of yourself shown on your profile</p>
            <textarea className="account-tab-textarea" placeholder="About (optional)" />
            <p className="account-tab-value">200 Characters remaining</p>

            <p className="account-tab-subtitle">Images</p>
            <p className="account-tab-label">Avatar and banner image</p>
            <p className="account-tab-value">Images must be .png or .jpg format</p>
            <img className="large-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
            <div>
                <p className="account-tab-value">Drag and Drop or Upload <b>Banner</b> Image</p>
            </div>
        </section>;

    const memberTab =
        <section>
            <p className="account-tab-title">Membership details</p>
            <p className="account-tab-subtitle">Basic information</p>
            <div style={{ position: "relative" }}>
                <p className="account-tab-label" style={{ paddingBottom: "40px" }}>Membership status</p>
                {profile?.membership.isActive ? <p className="status-active">Active</p> : <p className="status-inactive">Inactive</p>}
            </div>
            <p className="account-tab-label">Membership type</p>
            <p className="account-tab-value">{profile?.membership.description}</p>
            <p className="account-tab-label">Member since</p>
            <p className="account-tab-value">{profile && dateFormatterShort(profile.membership.memberSince)}</p>
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
                                    <tr>
                                        <th>No.</th>
                                        <th>Item Title</th>
                                        <th>Item Description</th>
                                        <th>Price</th>
                                        <th>Qty.</th>
                                        <th>Total</th>
                                    </tr>
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
                                </table>
                                <article style={{ textAlign: "right", width: "50%", float: "right" }}>
                                    <p className="invoice-text">Sub Total: {priceFormatter(((invoice.amount / 100) / ((invoice.vatPercentage + 100) / 100)), invoice.currency)}</p>
                                    <p className="invoice-text">
                                    {invoice.vatPercentage}% VAT: {priceFormatter((invoice.amount / 100) - (invoice.amount / 100) / ((invoice.vatPercentage + 100) / 100), invoice.currency)}
                                    </p>
                                    <p className="invoice-subtitle" style={{ borderTop: "1px solid grey", padding: "20px 0px" }}>
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
                        <button className="invoice-button payment">Make Payment</button>
                    </div>
                ))}
            </div>

        </section>;

    const tabs = [
        memberTab,
        accountTab,
        profileTab
    ]

    const [tabNumber, setTabNumber] = useState<number>(0);

    return (
        <div className="account-settings-container">
            <div className="account-settings-toolbar">
                <p className="account-settings-title">User settings</p>
                <section>
                    <button className={tabNumber === 0 ? "account-button-active" : "account-button"} onClick={() => setTabNumber(0)}>Membership</button>
                    <button className={tabNumber === 1 ? "account-button-active" : "account-button"} onClick={() => setTabNumber(1)}>Account</button>
                    <button className={tabNumber === 2 ? "account-button-active" : "account-button"} onClick={() => setTabNumber(2)}>Profile</button>
                </section>
            </div>

            <div className="account-contents-container">
                {tabs[tabNumber]}
            </div>

        </div>
    )
})