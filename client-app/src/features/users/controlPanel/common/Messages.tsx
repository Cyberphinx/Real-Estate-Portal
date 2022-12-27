import React from "react";
import './Messages.css';


export default function Messages() {
    return(
        <div className="direct-messages-container">
            <div className="direct-messages-toolbar">
                <p className="direct-messages-title">Messages</p>
                <section>
                    <button className="direct-messages-master-button">Sent</button>
                    <button className="direct-messages-master-button">Inbox</button>
                </section>
                <section>
                    <button className="direct-messages-button">All</button>
                    <button className="direct-messages-button">Unread</button>
                    <button className="direct-messages-button">Direct Messages</button>
                    <button className="direct-messages-button">Job Post Replies</button>
                </section>
            </div>
            <div className="direct-messages-contents-container">
                <p>Message</p>
                <p>Message</p>
                <p>Message</p>
            </div>
        </div>
    )
}