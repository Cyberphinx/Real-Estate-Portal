import './SignUp.css';
import { observer } from "mobx-react-lite";
import { useStore } from '../../../app/stores/store';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useEffect } from 'react';
import { AccountType, Language } from '../../../app/model/User';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export default observer(function RegisterCustomerForm({isValid, dirty, isSubmitting, setFieldValue}: Props) {
    const { userStore: { register }, featureStore: { setActiveFeature }, modalStore: { openModal, closeModal } } = useStore();

    useEffect(() => {
        setFieldValue("accountType", AccountType.Customer);
        setFieldValue("country", "United Kingdom");
        setFieldValue("language", Language.English);
    }, [])

    return (
        <div>
            <br />
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="username" placeholder="Username" />
            <br />
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="email" placeholder="Email" />
            <br />
            <p className='form-section-value'>Minimum 8 characters, a mix of letters, number and special character: </p>
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="password" placeholder="Password" type="password" />
            <br />
            <button
                className={isSubmitting ? 'register-submitting-button' : 'register-button'}
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
            >
                {isSubmitting && <span className="register-submitting"></span>}
                Sign Up
            </button>
        </div>

    )
});