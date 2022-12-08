import React from "react";
import { RedressScheme, User } from "../../../../app/model/User";
import './Company.css';

interface Props {
    user: User | null;
}

export default function Company({ user }: Props) {
    return (
        <div className="agency-container">
            <section className="section-one">
                <article>
                    <p className="agency-title">{user?.companyName}</p>
                    <p>Username: {user?.username}</p>
                    <p>Email: {user?.email}</p>
                    {user && <p>Redress scheme: {RedressScheme[user.redressScheme]}</p>}
                    <p>Subscription</p>
                    <p>Payment plan</p>
                    <p>Billing</p>
                </article>
                {/* <article>
                    <p className="agency-title">Branch</p>
                    <button>Create</button>
                    <p>Total: </p>
                </article> */}
            </section>
            <section className="section-two">
                <article>
                    <p className="agency-title">Listing</p>
                    <button>Create</button>
                    <p>Total: </p>
                </article>
            </section>
        </div>
    )
}