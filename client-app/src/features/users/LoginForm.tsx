import './LoginForm.css';
import { Formik, Form } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';

export default observer(function LoginForm() {
    const { userStore: { login }, modalStore: { closeModal } } = useStore();

    return (
        <div className="login-form">
            <div className="modal-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                <Formik
                    initialValues={{ email: "", password: "", error: null }}
                    onSubmit={(values, { setErrors }) => {
                        login(values).catch(errors => setErrors({ error: "Invalid email or password" }));
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().required().email(),
                        password: Yup.string().required()
                    })}
                >
                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <MyTextInput inputclassname='login-input-style' errorclassname='error-style' name="email" placeholder="Email" />
                            <br />
                            <MyTextInput inputclassname='login-input-style' errorclassname='error-style' name="password" placeholder="Password" type="password" />
                            <br />
                            <button className='login-button' type="submit">Login</button>
                            {/* <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                                <span className={"button-" + (isSubmitting ? "loading" : "text")}>Login</span>
                            </button> */}
                            {errors.error && <p className="login-error">{errors.error}</p>}
                        </Form>
                    )}
                </Formik>
            </div>

        </div>

    )
});