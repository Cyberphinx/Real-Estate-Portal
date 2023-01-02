import './RegisterForm.css';
import { observer } from "mobx-react-lite";
import React from 'react';
import RegisterCustomerForm from './RegisterCustomerForm';
import RegisterAgentForm from './RegisterAgentForm';
import RegisterCompanyForm from './RegisterCompanyForm';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any) => void;
    handleChange: (e: any) => void;
    accountType: number;
}

export default observer(function Switcher({ isValid, dirty, isSubmitting, setFieldValue, handleChange, accountType }: Props) {

    function getFormType(type: number) {
        switch (type) {
            case 0:
                return <RegisterAgentForm
                    isValid={isValid}
                    dirty={dirty}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                />;
            case 1:
                return <RegisterCompanyForm />;
            case 2:
                return <RegisterCustomerForm
                    isValid={isValid}
                    dirty={dirty}
                    isSubmitting={isSubmitting} />;
            default:
                return <RegisterCustomerForm
                    isValid={isValid}
                    dirty={dirty}
                    isSubmitting={isSubmitting} />;
        }
    }

    return (
        <div>
            {getFormType(accountType)}
        </div>

    )
});