import './RegisterForm.css';
import { observer } from "mobx-react-lite";
import { useStore } from '../../../app/stores/store';
import MyTextInput from '../../../app/common/form/MyTextInput';

interface Props {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
}

export default observer(function RegisterCustomerForm({isValid, dirty, isSubmitting}: Props) {
    const { userStore: { register }, featureStore: { setActiveFeature }, modalStore: { openModal, closeModal } } = useStore();

    return (
        <div>
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="username" placeholder="Username" />
            <br />
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="email" placeholder="Email" />
            <br />
            <MyTextInput inputclassname='register-input-style' errorclassname='register-form-error' name="password" placeholder="Password" type="password" />
            <br />
            <button
                className='register-button'
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
            >
                Sign Up
            </button>
        </div>

    )
});