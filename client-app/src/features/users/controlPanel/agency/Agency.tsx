import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Company } from "../../../../app/model/CompanyAggregate/Company";
import { RedressScheme, User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import './Agency.css';
import BranchForm from "./BranchForm";
import Collection from "./Collection";
import ListingForm from "./ListingForm";
import Portfolio from "./Portfolio";

interface Props {
    user: User | null;
}

export default observer(function Agency({ user }: Props) {
    const { listingStore, featureStore } = useStore();
    const { companies } = listingStore;
    const { activeAgencyPanel, setActiveAgencyPanel } = featureStore;
    const [branchForm, setBranchForm] = useState(false);
    const [listingForm, setListingForm] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState<Company | null>(null);
    const [portfolio, setPortfolio] = useState(false);

    useEffect(() => {
        listingStore.loadCompanies();
    }, [listingStore])

    const titles = [
        <p className="agency-toolbar-title">
            {user?.username} Portfolio
        </p>,

        <div style={{ position: "relative" }}>
            <p className="agency-toolbar-title">Create a new branch</p>
            <button className="back" onClick={() => setActiveAgencyPanel(0)}>Back</button>
        </div>,

        <div style={{ position: "relative" }}>
            <p className="agency-toolbar-title">{selectedPortfolio?.companyName}</p>
            <button className="back" onClick={() => setActiveAgencyPanel(0)}>Back</button>
        </div>,

        <div style={{ position: "relative" }}>
            <p className="agency-toolbar-title">Create a new listing</p>
            <button className="back" onClick={() => setActiveAgencyPanel(2)}>Back</button>
        </div>,
    ]

    const features = [
        <Collection
            user={user}
            setBranchForm={setBranchForm}
            setPortfolio={setPortfolio}
            companies={companies}
            setSelectedPortfolio={setSelectedPortfolio}
        />,
        <BranchForm setBranchForm={setBranchForm} />,
        <Portfolio selectedPortfolio={selectedPortfolio} listingForm={listingForm} setListingForm={setListingForm} />,
        <ListingForm />
    ]

    const added = new Date(user?.registrationDate!).toLocaleDateString();
    const addedNewDate = new Date(user?.registrationDate!);
    const addedTimeStamp = `${addedNewDate.getHours()}:${addedNewDate.getMinutes()}:${addedNewDate.getSeconds()}`;
    const lastLogin = new Date(user?.lastLoginTime!).toLocaleDateString();
    const lastLoginNewDate = new Date(user?.lastLoginTime!);
    const lastLoginTimeStamp = `${lastLoginNewDate.getHours()}:${lastLoginNewDate.getMinutes()}:${lastLoginNewDate.getSeconds()}`;

    return (
        <div className="agency-container">
            <section className="agency-section-one">
                <article>
                    <button className="agency-button-edit">
                        <img className="branch-button-icon" src="/assets/edit.svg" alt="edit" />
                    </button>
                    <p className="agency-title">{user?.companyName}</p>
                    <p>Username: {user?.username}</p>
                    <p>Date registered: {added} {addedTimeStamp}</p>
                    <p>Last login: {lastLogin} {lastLoginTimeStamp}</p>
                    <p>Email: {user?.email}</p>
                    <p>Company name: {user?.companyName}</p>
                    <p>Company postcode: {user?.companyPostalCode}</p>
                    <p>Company reference: {user?.companyPostalCode}</p>
                    {user && <p>Redress scheme: {RedressScheme[user.redressScheme]}</p>}
                </article>
                <article>
                    <button className="agency-button-edit">
                        <img className="branch-button-icon" src="/assets/edit.svg" alt="edit" />
                    </button>
                    <p>Subscription</p>
                    <p>Payment plan</p>
                    <p>Billing</p>
                </article>
            </section>
            <section className="agency-section-two">
                <article className="agency-section-toolbar">
                    {titles[activeAgencyPanel]}
                </article>
                <article className="agency-section-content">
                    {features[activeAgencyPanel]}
                </article>
            </section>
        </div>
    )
})