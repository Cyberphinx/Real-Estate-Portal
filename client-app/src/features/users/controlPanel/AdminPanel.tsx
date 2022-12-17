import React, { useEffect } from "react";
import './AdminPanel.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { User } from "../../../app/model/User";
import { Company } from "../../../app/model/CompanyAggregate/Company";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";

export default observer(function AdminPanel() {
    const { listingStore, userStore, companyStore } = useStore();
    const { pagination, loadingInitial } = listingStore;
    const { companies, deleteCompany } = companyStore;
    const { user, users, getAllUsers, isLoggedIn, loadingUsers } = userStore;

    // useEffect(() => {
    //     companyStore.loadCompanies();
    // }, [companyStore])

    useEffect(() => {
        if (isLoggedIn && user?.role.includes("Admin")) getAllUsers();
    }, [userStore])

    return (
        <div className="control-panel-container">
            {user?.role}
            {user?.role.includes("Admin") &&
                <div className="admin-grid-container">
                    <div style={{ border: "1px solid gray", width: "calc(100vw / 2)" }}>
                        <h1>Total listings: {pagination?.totalItems}</h1>
                        <div style={{ position: "relative" }}>
                            <h1>Total user accounts: {users?.length}</h1>
                            {loadingUsers && <LoadingComponent content={null} />}
                            <h3>List of user accounts:</h3>
                            <>
                                {users?.map((user: User, index: number) => (
                                    <div key={user.username}>
                                        {index + 1} - {user.username} -
                                        {user.role.map((role: any) => <span key={role}>{role} - </span>)}
                                        {user.email}
                                    </div>
                                ))}
                            </>
                        </div>

                        <div style={{ position: "relative" }}>
                            <h1>Total companies: {companies.length}</h1>
                            {loadingInitial && <LoadingComponent content={null} />}
                            <h3>List of companies:</h3>
                            <ol>
                                {companies?.map((company: Company) => (
                                    <li key={company.id}>
                                        <div>{company.companyReference} - {company.displayName} :
                                            <div>Owner: {company.username}</div></div>
                                        <span>: {company.companyContacts.email} </span>
                                        <button onClick={() => deleteCompany(company.id)}>Delete</button>
                                    </li>
                                ))}
                            </ol>
                        </div>

                    </div>
                    <div style={{ border: "1px solid gray", width: "calc(100vw / 2)" }}>
                        <h1>Total branches: </h1>
                        <h3>Savills</h3>
                        <p>---</p>
                        <h3>Hunters</h3>
                        <p>---</p>
                        <h3>Roger Parry</h3>
                        <p>---</p>
                    </div>
                </div>
            }
        </div>
    );
});