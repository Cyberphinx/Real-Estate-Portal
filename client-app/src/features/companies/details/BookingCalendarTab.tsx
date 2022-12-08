import React from "react";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import CalendarCore from "../../../app/common/CalendarCore";
import { Company } from "../../../app/model/CompanyAggregate/Company";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import "./BookingCalendarTab.css"
import MyTextInput from "../../../app/common/form/MyTextInput";
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { useState } from "react";
import { OrderStatus } from "../../../app/model/OrderAggregate/OrderStatus";

interface Props {
    company: Company | undefined;
}

export default observer(function BookingCalendarTab({ company }: Props) {
    const { calendarStore, userStore, orderStore } = useStore();
    const { date, setDate } = calendarStore;
    const { register } = userStore;
    const { createOrder, selectedOrder } = orderStore;
    const [registerTab, setRegisterTab] = useState<boolean>(false);

    // useEffect(() => {
    //     if (date) {
    //         setRegisterTab(false);
    //     }
    // }, [date])

    const initialValues = {
        id: uuid(),
        buyerId: "",
        buyerName: "",
        buyerEmail: "",
        buyerPhone: "",
        buyerMessage: "",
        orderDate: new Date(),
        orderStatus: OrderStatus.Processing,
        serviceCategory: company!.serviceCategory,
        addresses: [
            {
                isCurrentAddress: true,
                fullName: "",
                address1: "",
                address2: "",
                address3: "",
                city: "",
                state: "",
                zip: "",
                country: "",
            },
            {
                isCurrentAddress: false,
                fullName: "",
                address1: "",
                address2: "",
                address3: "",
                city: "",
                state: "",
                zip: "",
                country: "",
            }
        ],
        startTime: new Date(),
        endTime: new Date(),
        bookingFee: 0,
        quote: 0,
        deposit: 0,
        finalPrice: 0,
        marginPercentage: 0,
        marginFee: 0,
        serviceSchedule: "",
        note: "",
        companyId: company!.id,

        error: null,
    }

    const validationSchema = Yup.object({
        buyerName: Yup.string().required("The name is required"),
        category: Yup.string().required(),
        buyerEmail: Yup.string().required("The email is required").email(),
    })

    return (
        <div>
            {date ?
                <div className="calendar-text-container">
                    <div>
                        {date.length > 0 ? (
                            <p>
                                <span className='bold'>Start:</span>{' '}
                                {date[0].toDateString()}
                                &nbsp;|&nbsp;
                                <span className='bold'>End:</span> {date[1].toDateString()}
                            </p>
                        ) : (
                            <p>
                                <span onClick={() => setDate(null)}>Selected date:</span>{' '}
                                {format(date, "EEEE dd MMM yyyy")}
                            </p>
                        )}
                    </div>
                    <div>
                        <button className="booking-tab-cancel-button" onClick={() => setDate(null)}>Cancel</button>
                    </div>
                </div> : <p>Select a date to book the service: </p>}
            <div>
                <CalendarCore company={company} />
            </div>

            <br />
            {date ?
                (<div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { setErrors }) => createOrder(values).catch(error => setErrors({ error })).then(() => { setDate(null); setRegisterTab(true); })}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, isSubmitting, isValid, dirty, errors }) => (
                            <Form onSubmit={handleSubmit} autoComplete="off">
                                <p>Contact details: </p>
                                <MyTextInput inputclassname="" errorclassname="" name="buyerName" placeholder="Full Name" />
                                <MyTextInput inputclassname="" errorclassname="" name="buyerEmail" placeholder="Email" />
                                <MyTextInput inputclassname="" errorclassname="" name="buyerPhone" placeholder="Phone" />
                                <p>Brief description of the job on {format(date, "EEEE dd MMM yyyy")}: </p>
                                <MyTextArea placeholder={"Please describe the job briefly"} name={"buyerMessage"} rows={5} cols={30} />

                                {company?.serviceCategory === 0 &&
                                    <div>
                                        <p>Moving from: </p>
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].address1" placeholder="Address1" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].address2" placeholder="Address2 (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].address3" placeholder="Address3 (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].city" placeholder="City" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].state" placeholder="State (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].zip" placeholder="Zip" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].country" placeholder="Country" />
                                        <p>Moving to:</p>
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[1].address1" placeholder="Address1" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[1].address2" placeholder="Address2 (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[1].address3" placeholder="Address3 (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[1].city" placeholder="City" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[1].state" placeholder="State (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[1].zip" placeholder="Zip" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[1].country" placeholder="Country" />
                                    </div>
                                }

                                {company!.serviceCategory > 0 &&
                                    <div>
                                        <p>Property Address: </p>
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].address1" placeholder="Address1" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].address2" placeholder="Address2 (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].address3" placeholder="Address3 (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].city" placeholder="City" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].state" placeholder="State (optional)" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].zip" placeholder="Zip" />
                                        <MyTextInput inputclassname="" errorclassname="" name="addresses[0].country" placeholder="Country" />
                                    </div>
                                }


                                <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                                    <span className={"button-" + (isSubmitting ? "loading" : "text")}>Book</span>
                                </button>
                                {errors.error && <ValidationErrors errors={errors.error} />}
                            </Form>
                        )}
                    </Formik>
                </div>)
                : null
            }

            {registerTab && (<div>
                <h3>Thank you <b>{selectedOrder?.buyerName}</b>!</h3>
                <p>Your request is successfully sent to <b>{company?.companyName}</b>!</p>
                <p>A confirmation email has been sent to <b>{selectedOrder?.buyerEmail}</b>!</p>
                <p><b>{company?.companyName}</b> will contact you shortly, meanwhile you can create an account to get access to:</p>
                <ul>
                    <li>Orders history & status</li>
                    <li>Shortlist properties</li>
                    <li>Create property alerts</li>
                    <li>Faster check-out next time</li>
                </ul>
                <Formik
                    initialValues={{ username: "", email: selectedOrder!.buyerEmail, password: "", error: null }}
                    onSubmit={(values, { setErrors }) => register(values).catch(error => setErrors({ error }))}
                    validationSchema={Yup.object({
                        username: Yup.string().required(),
                        email: Yup.string().required().email(),
                        password: Yup.string().required(),
                    })}
                >
                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <MyTextInput inputclassname="" errorclassname="" name="username" placeholder="Username" />
                            <MyTextInput inputclassname="" errorclassname="" name="password" placeholder="Password" type="password" />
                            <button disabled={!isValid || !dirty || isSubmitting} className="button" type="submit">
                                <span className={"button-" + (isSubmitting ? "loading" : "text")}>Register</span>
                            </button>
                            {errors.error && <ValidationErrors errors={errors.error} />}
                        </Form>
                    )}
                </Formik>
            </div>)
            }
        </div>
    );
});
