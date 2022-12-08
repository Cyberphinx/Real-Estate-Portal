import React from "react";
import '../RegisterLoginForm.css';
import { Formik, Form} from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";

export default observer(function RegisterAgencyForm() {
    const { userStore: { register }, featureStore: {setActiveFeature} } = useStore();

    return (
        <Formik
            initialValues={{ username: "", email: "", password: "", agency: true, error: null }}
            onSubmit={(values, { setErrors }) => {
                register(values).catch(error => setErrors({ error }));
                setActiveFeature(2);
        }}
            validationSchema={Yup.object({
                username: Yup.string().required("Username is required"),
                email: Yup.string().required().email("Email is required"),
                password: Yup.string().required("Password is required"),
                companyName: Yup.string().required("Company name is required"),
                companyPostalCode: Yup.string().required("Company postcode is required"),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput inputclassname='input-style' errorclassname='error-style'  name="username" placeholder="Username" />
                    <br />
                    <MyTextInput inputclassname='input-style' errorclassname='error-style'  name="email" placeholder="Email" />
                    <br />
                    <MyTextInput inputclassname='input-style' errorclassname='error-style'  name="password" placeholder="Password" type="password" />
                    <br />
                    <MyTextInput inputclassname='input-style' errorclassname='error-style'  name="companyName" placeholder="Company name" />
                    <br />
                    <MyTextInput inputclassname='input-style' errorclassname='error-style'  name="companyPostalCode" placeholder="Company postcode" />
                    <br />

                    <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                        <span className={"button-" + (isSubmitting ? "loading" : "text")}>Register</span>
                    </button>
                    {errors.error && <ValidationErrors errors={errors.error} />}
                </Form>
            )}
        </Formik>
    )
});