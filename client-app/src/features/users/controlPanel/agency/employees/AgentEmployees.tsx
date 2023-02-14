import React from "react";
import './AgentEmployees.css';
import { Link } from "react-router-dom";

export default function AgentEmployees() {
    return (
        <div className="agent-employees" id="agent-employees">
            <div className="agent-employees__toolbar">
                {/* {loadingCompany ? null
                    : <h1 className="view-listings__title">
                        {currentBranch?.displayName} ({currentBranch?.companyReference}):
                        <span style={{ color: '#6807F9', paddingLeft: '1rem' }}>{totalCount} listings</span>
                    </h1>} */}

                <button className="agent-employees__create-button">
                    <Link
                        style={{ textDecoration: 'none', color: '#fff' }}
                        to={'/create-listing'}
                        target="_blank"
                    >Create employee</Link>
                </button>
            </div>
        </div>
    )
}