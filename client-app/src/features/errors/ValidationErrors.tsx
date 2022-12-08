import React from "react";
import './ValidationErrors.css';

interface Props {
    errors: any;
}

export default function ValidationErrors({errors}: Props) {
    return (
        <div>
            {errors && (
                <div className="errors-container">
                    {errors.map((err:any, i: any) => (
                        <p className="error-element" key={i}>{err}</p>
                    ))}
                </div>
            )}
        </div>
    );
}