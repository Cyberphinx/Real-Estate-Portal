import React from 'react';
import '.././SignUp.css';
import { observer } from "mobx-react-lite";

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export default observer(function RegisterCompanyForm({setFieldValue}: Props) {

    return (
        <div>
            <br />
            <p style={{fontSize:"1.5rem", paddingTop:"40px", color:"grey"}}>COMING SOON!</p>
            <p style={{fontSize:"0.75rem", paddingBottom:"80px",color:"grey"}}>TRADESPERSON SIGNUP IS UNDER CONSTRUCTION.</p>
        </div>

    )
});