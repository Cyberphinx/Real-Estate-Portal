import './SignUp.css';
import { observer } from "mobx-react-lite";
import React from 'react';
import RegisterCustomerForm from './customer/RegisterCustomerForm';
import RegisterCompanyForm from './company/RegisterCompanyForm';
import RegisterAgentStepOne from './agent/RegisterAgentStepOne';
import RegisterAgentStepTwo from './agent/RegisterAgentStepTwo';
import Stepper from './agent/agentStepper/Stepper';
import PaymentWrapper from './payment/PaymentWrapper';
import { useStore } from '../../../app/stores/store';
import { AccountType } from '../../../app/model/User';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    handleChange: (e: any) => void;
    formType: number;
    setFormType: (value: number) => void;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    validateField: (field: string) => void;
    getFieldMeta: any;
}

export default observer(function Switcher({ isValid, dirty, isSubmitting, setFieldValue,
    handleChange, formType, setFieldTouched, validateField, getFieldMeta, setFormType }: Props) {

    const { modalStore } = useStore();
    const { closeModal } = modalStore;

    const accountIndex = getFieldMeta("accountType").value.toString();

    function selectForm() {
        switch (accountIndex) {
            case '1':
                switch (formType) {
                    case 1:
                        return (
                            <>
                                <Stepper />
                                <RegisterAgentStepOne
                                    isValid={isValid}
                                    dirty={dirty}
                                    isSubmitting={isSubmitting}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    setFieldTouched={setFieldTouched}
                                    validateField={validateField}
                                    getFieldMeta={getFieldMeta}
                                    formType={formType}
                                    setFormType={setFormType}
                                />
                            </>
                        );
                    case 2:
                        return (
                            <>
                                <Stepper />
                                <RegisterAgentStepTwo setFormType={setFormType} isValid={isValid} dirty={dirty}
                                    isSubmitting={isSubmitting} setFieldValue={setFieldValue} />
                            </>
                        )
                    default:
                        return (
                            <>
                                <Stepper />
                                <RegisterAgentStepOne
                                    isValid={isValid}
                                    dirty={dirty}
                                    isSubmitting={isSubmitting}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    setFieldTouched={setFieldTouched}
                                    validateField={validateField}
                                    getFieldMeta={getFieldMeta}
                                    formType={formType}
                                    setFormType={setFormType}
                                />
                            </>
                        );
                };

            case '2':
                return <RegisterCompanyForm
                    isValid={isValid}
                    dirty={dirty}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                />;


            case '3':
                return <RegisterCustomerForm
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
            {selectForm()}
        </div>

    )
});