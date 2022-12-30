import React from "react";
import '../RegisterLoginForm.css';
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import ValidationErrors from "../../errors/ValidationErrors";

export default observer(function RegisterIndividualForm() {
    const { userStore: { register }, featureStore: {setActiveFeature} } = useStore();

    return (
        <Formik
            initialValues={{ username: "", email: "", password: "", agency: false, error: null }}
            onSubmit={(values, { setErrors }) => {
                register(values).catch(error => setErrors({ error }));
                setActiveFeature(2);
        }}
            validationSchema={Yup.object({
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => {
                return (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput inputclassname='register-input-style' errorclassname='register-error-style'  name="username" placeholder="Username" />
                        <br />
                        <MyTextInput inputclassname='register-input-style' errorclassname='register-error-style'  name="email" placeholder="Email" />
                        <br />
                        <MyTextInput inputclassname='register-input-style' errorclassname='register-error-style'  name="password" placeholder="Password" type="password" />
                        <br />

                        <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                            <span className={"button-" + (isSubmitting ? "loading" : "text")}>Register</span>
                        </button>
                        {errors.error && <ValidationErrors errors={errors.error} />}
                    </Form>
                );
            }}
        </Formik>
    )
});