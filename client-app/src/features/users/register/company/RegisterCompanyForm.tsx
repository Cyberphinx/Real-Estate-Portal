import React, { useEffect } from 'react';
import '.././SignUp.css';
import { observer } from "mobx-react-lite";
import { AccountType } from '../../../../app/model/User';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export default observer(function RegisterCompanyForm({setFieldValue}: Props) {

    useEffect(() => {
        setFieldValue("country", "United Kingdom");
        setFieldValue("language", "English");
        setFieldValue("accountType", AccountType.Company);
    }, [])

    return (
        <div>
            <br />
            <p style={{fontSize:"1.5rem", paddingTop:"40px", color:"grey"}}>COMING SOON!</p>
            <p style={{fontSize:"0.75rem", paddingBottom:"80px",color:"grey"}}>TRADESPERSON SIGNUP IS UNDER CONSTRUCTION.</p>
        </div>

    )
});