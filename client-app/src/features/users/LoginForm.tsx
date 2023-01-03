import './LoginForm.css';
import { Formik, Form } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import RegisterForm from './register/RegisterForm';

export default observer(function LoginForm() {
    const { userStore: { login }, modalStore: { openModal, closeModal } } = useStore();

    return (
        <div className="login-form">
            <div className="modal-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                <Formik
                    initialValues={{ email: "", password: "", error: null }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        login(values, setSubmitting).catch(errors => setErrors({ error: "Invalid email or password" }));
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().required("The email is required").email("The email must be a valid email"),
                        password: Yup.string().required("The password is required")
                    })}
                >
                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <p style={{ textAlign: "left", fontSize: "18px", fontWeight: "600", padding: "0px 20px 0px 20px" }}>Log In</p>
                            <p style={{ textAlign: "left", fontSize: "12px", fontWeight: "400", padding: "0px 20px 20px 20px" }}>
                                By continuing, you agree are setting up a Sanctum account and agree to our <span className='login-legal-text'>User Agreement</span> and <span className='login-legal-text'>Privacy Policy</span>.
                            </p>
                            <MyTextInput inputclassname='login-input-style' errorclassname='login-form-error' name="email" placeholder="Email" />
                            <br />
                            <MyTextInput inputclassname='login-input-style' errorclassname='login-form-error' name="password" placeholder="Password" type="password" />
                            <br />
                            <div className='login-suggestion'>Forget your <button type="button" className='login-suggestion-button'>password</button> ?</div>
                            <button className={isSubmitting ? 'login-submitting-button' : 'login-button'} type="submit">
                                {isSubmitting && <span className="login-submitting"></span>}
                                Log In
                            </button>
                            {/* <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                                <span className={"button-" + (isSubmitting ? "loading" : "text")}>Login</span>
                            </button> */}
                            {errors.error && <p className="login-form-submission-error">{errors.error}</p>}
                            <div className='login-suggestion'>New to Sanctum? <button className='login-suggestion-button'
                                type="button"
                                onClick={() => {
                                    closeModal();
                                    openModal(<RegisterForm />);
                                }}
                            >
                                Sign Up
                            </button></div>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>

    )
});