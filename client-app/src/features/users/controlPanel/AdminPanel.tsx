import React, { useEffect } from "react";
import './AdminPanel.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { User } from "../../../app/model/User";
import { Company } from "../../../app/model/Company";
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
            {user?.role.includes("Admin") &&
                <div className="admin-grid-container">
                    <div className="admin-grid-panel">
                        <p>Total rent/sale listings: {pagination?.totalItems}</p>
                        <div style={{ position: "relative" }}>
                            <p>Total user accounts: {users?.length}</p>
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
                            <p>Total companies: {companies.length}</p>
                            {loadingInitial && <LoadingComponent content={null} />}
                            <h3>List of companies:</h3>
                            <ol>
                                {companies?.map((company: Company) => (
                                    <li key={company.id}>
                                        <div>{company.companyReference} - {company.displayName} :
                                            <div>Owner: {company.username}</div></div>
                                        <span>: {company.companyContacts.email} </span>
                                        <button className="admin-delete-button" onClick={() => deleteCompany(company.id)}>Delete</button>
                                    </li>
                                ))}
                            </ol>
                        </div>

                    </div>
                    <div className="admin-grid-panel">
                        <p>Total branches: </p>
                    </div>
                </div>
            }
        </div>
    );
});