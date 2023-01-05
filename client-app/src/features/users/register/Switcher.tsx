import './SignUp.css';
import { observer } from "mobx-react-lite";
import React from 'react';
import RegisterCustomerForm from './RegisterCustomerForm';
import RegisterAgentForm from './RegisterAgentForm';
import RegisterCompanyForm from './RegisterCompanyForm';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    handleChange: (e: any) => void;
    accountType: number;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    validateField: (field: string) => void;
    getFieldMeta: any;
    step: number;
    setStep: (value: number) => void;
}

export default observer(function Switcher({ isValid, dirty, isSubmitting, setFieldValue, 
    handleChange, accountType, setFieldTouched, validateField, getFieldMeta, step, setStep }: Props) {

    function getFormType(type: number) {
        switch (type) {
            case 0:
                return <RegisterCustomerForm
                    isValid={isValid}
                    dirty={dirty}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                />;
            case 1:
                return <RegisterAgentForm
                    isValid={isValid}
                    dirty={dirty}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    setFieldTouched={setFieldTouched}
                    validateField={validateField}
                    getFieldMeta={getFieldMeta}
                    step={step}
                    setStep={setStep}
                />;
            case 2:
                return <RegisterCompanyForm 
                isValid={isValid}
                    dirty={dirty}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                />;
            default:
                return <RegisterCustomerForm
                    isValid={isValid}
                    dirty={dirty}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                />;
        }
    }

    return (
        <div>
            {getFormType(accountType)}
        </div>

    )
});