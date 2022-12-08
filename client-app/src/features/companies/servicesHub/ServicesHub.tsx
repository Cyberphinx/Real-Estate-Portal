import React from "react";
import './ServicesHub.css';

export default function ServicesHub() {

    return (
        <div className="services-hub">
            <div className="forum-toolbar">
                <section>
                    <p style={{ margin: "2px 0px 0px 0px", fontSize: "20px" }}># Central Heating @ Manchester</p>
                </section>
                <section style={{ textAlign: "right", display: "grid", gridTemplateColumns: "auto auto", gridGap: "10px" }}>
                    <input placeholder="Search..." style={{ padding: "5px", width: "calc(100vw / 6)" }} />
                    <button className="post-job-button">CREATE JOB +</button>
                </section>
            </div>
            <div className="forum-container">
                <section>
                    <article className="thread-container">
                        <div className="thread-author">
                            <img className="default-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
                        </div>
                        <div className="thread-post">
                            <p className="posted-by"><span className="thread-location">Manchester</span> - Posted by tess_81 - 32mins ago</p>
                            <p className="thread-title">Kitchen extension open plan timber effect </p>
                            <p className="posted-by">#central-heating, #flooring, #conversion</p>
                            <p className="thread-content">Load bearing wall removed from between living room/dining room also single window converted into double patio doors</p>
                            <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "20px" }}>
                                <button className="thread-button">Apply</button>
                                <button className="thread-button">Share</button>
                            </div>
                        </div>
                    </article>

                    <article className="thread-container">
                        <div className="thread-author">
                            <img className="default-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
                        </div>
                        <div className="thread-post">
                            <p className="posted-by"><span className="thread-location">Liverpool</span> - Posted by ian27359_43 - 1hr ago</p>
                            <p className="thread-title">Remodel top floor</p>
                            <p className="posted-by">#central-heating, #flooring, #conversion</p>
                            <p className="thread-content">We are in the process of conveyancing and we have a completion date of on or before Aug 31st. I am looking to take down non supporting walls and add a dormer window. Re-position electric points. I also need to remove a beam from a room and strengthen the floor. I have a design drawn by a structural engineer for this job. I am also looking for a plumber to take out a bathtub and install a shower. The plumbing will probably need to be improved and also extended to the top floor ready for a sink and dishwasher to be installed. The bathtub upstairs needs to be removed and replaced with a shower. There is a shower in the same bathroom which needs to be removed but not replaced. So I am probably looking for a builder, an electrician and a plumber.</p>
                            <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "20px" }}>
                                <button className="thread-button">Apply</button>
                                <button className="thread-button">Share</button>
                            </div>
                        </div>
                    </article>

                    <article className="thread-container">
                        <div className="thread-author">
                            <img className="default-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
                        </div>
                        <div className="thread-post">
                            <p className="posted-by"><span className="thread-location">London</span> - Posted by mrs_b_10 - 3hrs ago</p>
                            <p className="thread-title">Kitchen extension open plan timber effect </p>
                            <p className="thread-content">Telescopic Security post to be fitted in a block paved driveway for car security</p>
                            <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "20px" }}>
                                <button className="thread-button">Apply</button>
                                <button className="thread-button">Share</button>
                            </div>
                        </div>
                    </article>

                    <article className="thread-container">
                        <div className="thread-author">
                            <img className="default-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
                        </div>
                        <div className="thread-post">
                            <p className="posted-by"><span className="thread-location">London</span> - Posted by coconewty - 6hrs ago</p>
                            <p className="thread-title">Kitchen extension open plan timber effect </p>
                            <p className="thread-content">Planning obtained to put good size extention on side of house for open plan kitchen with timber effect. Looking for a reliable friendly builder / team to complete from start to finnish.</p>
                            <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "20px" }}>
                                <button className="thread-button">Apply</button>
                                <button className="thread-button">Share</button>
                            </div>
                        </div>
                    </article>

                    <article className="thread-container">
                        <div className="thread-author">
                            <img className="default-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
                        </div>
                        <div className="thread-post">
                            <p className="posted-by"><span className="thread-location">Brighton</span> - Posted by michel73905 - 12hrs ago</p>
                            <p className="thread-title">Kitchen extension open plan timber effect</p>
                            <p className="thread-content">Build a 2m high wall on two sides of a 5m x 6m garden, so 11 running m in total. Also knock through/remove existing 5m long garden wall.
                                Added 11th December, 2020: -------------------------- Some leveling inside garden is welcome...
                                There's 30cm...</p>
                            <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "20px" }}>
                                <button className="thread-button">Apply</button>
                                <button className="thread-button">Share</button>
                            </div>
                        </div>
                    </article>
                </section>

                <section className="channel-profile">
                    <article>
                        <p>Jobs Tagged #Central Heating</p>
                        <p style={{ fontSize: "14px" }}>When choosing the right heating engineer, there are some key issues you need to think about. In this article, we’ll take you through them step by step.</p>
                        <ul style={{ fontSize: "14px" }}>
                            <li>Choose someone with lots of specific experience</li>
                            <li>If your job involves gas, check whether the tradesperson is Gas Safe-registered</li>
                            <li>Get a detailed quote from each tradesperson you’re considering</li>
                            <li>Ask each tradesperson to explain what they plan to do</li>
                            <li>Ask about professional qualifications and accreditation</li>
                            <li>Discuss materials before work starts</li>
                        </ul>
                    </article>
                    <article>
                        <p>Price Guide</p>
                        <ul style={{ fontSize: "14px" }}>
                            <li>Underfloor heating costs</li>
                            <li>Cost of installing central heating</li>
                            <li>Boiler installation costs</li>
                            <li>Boiler replacement costs</li>
                            <li>Boiler replacement costs</li>
                            <li>Boiler service costs</li>
                            <li>Boiler repair costs</li>
                        </ul>
                    </article>
                </section>
            </div>
        </div>
    )
}