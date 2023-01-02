import './RegisterForm.css';
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';
import MyTextInput from '../../../app/common/form/MyTextInput';
import LoginForm from '../LoginForm';
import MySelectInput from '../../../app/common/form/MySelectInput';

export default observer(function RegisterIndividualForm() {
    const { userStore: { register }, featureStore: { setActiveFeature }, modalStore: { openModal, closeModal } } = useStore();
    
    const initialValues = {
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
        accountType: 0,
        addedOn: new Date(),
        country: 182,
        language: 1,
        displayName: "",
        companyAccessStatus: 0,
        companyLegalName: "",
        isMainCompany: true,
        legalCompanyAddress: {
            id: uuid(),
            displayAddress: "",
            propertyNumberOrName: "",
            streetName: "",
            locality: "",
            townOrCity: "",
            county: "",
            postalCode: "",
            country: 182,
            latitude: 0,
            longitude: 0,
        },
        invoiceDescription: "",
        invoiceAmount: 0,
        error: null
    }

    return (
        <div className="register-form">
            <div className="modal-content">
                <div className="close-container" onClick={() => closeModal()}>
                    <p className="close-modal-button">&times;</p>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { setErrors }) => {
                        register(values).catch(error => setErrors({ error }));
                        setActiveFeature(0);
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
                                <p style={{ textAlign: "left", fontSize: "18px", fontWeight: "600", padding: "0px 20px 0px 20px" }}>Sign Up</p>
                                <p style={{ textAlign: "left", fontSize: "12px", fontWeight: "400", padding: "0px 20px 20px 20px" }}>
                                    By continuing, you agree are setting up a Sanctum account and agree to our <span className='register-legal-text'>User Agreement</span> and <span className='register-legal-text'>Privacy Policy</span>.
                                </p>
                                <MySelectInput placeholder={''} name={''} options={undefined} selectclassname={'account-type-selection'}  />
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
                                    Continue
                                </button>
                                {/* <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                                <span className={"button-" + (isSubmitting ? "loading" : "text")}>Register</span>
                                </button> */}
                                {/* {errors.error && <ValidationErrors errors={errors.error} />} */}
                                {errors.error && <p className="register-form-submission-error">{errors.error}</p>}
                                <div className='register-suggestion'>Already on Sanctum? <button className='register-suggestion-button'
                                onClick={() => {
                                    {
                                        closeModal();
                                        openModal(<LoginForm />);
                                    }
                                }}>
                                    Log In</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>

        </div>

    )
});