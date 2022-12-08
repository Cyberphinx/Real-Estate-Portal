import React from "react";
import { User } from "../../../../app/model/User";
import './Customer.css';

interface Props {
    user: User | null;
}

export default function Customer({ user }: Props) {
    return (
        <div className="agency-container">
            <section className="section-one">
                <article>
                    <p className="agency-title">Welcome {user?.username}</p>
                    <p>Email: {user?.email}</p>
                    <p>Messages</p>
                    <p>Shortlist</p>
                    <p>Bookings</p>
                </article>
            </section>
            <section className="section-two">
                <article>
                    <p className="agency-title">Shortlist</p>
                    <button>Remove</button>
                    <p>Total: </p>
                </article>
            </section>
        </div>
    )
}