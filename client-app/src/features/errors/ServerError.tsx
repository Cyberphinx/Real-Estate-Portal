import { observer } from "mobx-react-lite";
import React from "react";
import './ServerError.css';
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import Nav from "../../app/layout/Nav";

export default observer(function ServerError() {
    const { commonStore } = useStore();

    return (
        <div>
            <Nav />
            <div className="server-error-container">
                <h1>500 Server Error</h1>
                <h5 style={{fontSize: "16px"}}>{commonStore.error?.message}</h5>
                <div>{commonStore.error?.details &&
                    <div style={{paddingBottom:'2rem'}}>
                        <h4 style={{fontSize: "16px"}}>Stack Trace</h4>
                        <code className="server-error" >
                            {commonStore.error.details}
                        </code>
                    </div>
                }</div>
                <Link className="back-home-button" to={"/"}>BACK TO HOME</Link>
            </div>
        </div>
    )
});