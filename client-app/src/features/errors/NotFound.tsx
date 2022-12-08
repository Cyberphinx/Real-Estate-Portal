import React from "react";
import './NotFound.css';
import { Link } from "react-router-dom";
import NavBar from "../../app/layout/NavBar";

export default function NotFound() {
    return (
        <div>
            <NavBar />
            <div className="not-found-container">
                <h1 className="error-code">404 ERROR</h1>
                <h5 className="error-message">Page Not Found</h5>
                <p className="error-description">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <Link className="back-home-button" to={"/"}>BACK TO HOME</Link>
            </div>
        </div>
    );
}