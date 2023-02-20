import React, { useCallback, useEffect, useState } from "react";
import "./RemovalsJobForm.css"
import { observer } from "mobx-react-lite";
import DateInput from "../../../app/common/form/DateInput";
import "react-datepicker/dist/react-datepicker.css";
import RemovalsAddresses from "./RemovalsAddresses";
import { Job, JobFormValues } from "../../../app/model/Job";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { dateFormatterShort } from "../../../app/common/HelperFunctions";
import { CalendarEvent } from "../../../app/model/CalendarEvent";

interface Props {
    step: number;
    setStep: (value: number) => void;
    values: JobFormValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    isValid: boolean;
    isSubmitting: boolean;
}

export default observer(function RemovalsJobForm({ values, setFieldValue, step, setStep, isValid, isSubmitting }: Props) {
    const { featureStore, userStore, removalistJobStore, calendarStore } = useStore();
    const { setActiveFeature } = featureStore;
    const { user, isLoggedIn } = userStore;
    const { allJobs } = removalistJobStore;
    const { events } = calendarStore;

    const [marks, setMarks] = useState<Set<string>>(new Set());
    const greyDates = useCallback(() => {
        let marksSet: Set<string> = new Set();

        allJobs.forEach((job: Job) => {
            let jobDate = dateFormatterShort(job.finishBy);
            marksSet.add(jobDate);
        });

        events?.forEach((eve: CalendarEvent) => {
            let eventDate = dateFormatterShort(eve.eventDate);
            marksSet.add(eventDate);
        })

        setMarks(marksSet);
    }, [allJobs])

    useEffect(() => {
        if (allJobs && events) greyDates();
        return () => {
            setMarks(new Set());
        }
    }, [allJobs, events, greyDates])

    return (
        <div style={{ width: "60rem", padding: '0 2.5rem 1.5rem 2.5rem' }}>

            <RemovalsAddresses values={values} setFieldValue={setFieldValue} />

            <p className="removals-forms__title">Select a date for the move: </p>
            <section className="removals-forms__container">
                <div style={{ position: "relative" }}>
                    <span className='removals-forms__input-label' >Moving date</span>
                    <DateInput
                        placeholderText=''
                        name='finishBy'
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy'
                        minDate={new Date()}
                        dayClassName={(date: Date) => marks.has(dateFormatterShort(date)) ? "date-input__highlight" : null}
                    />
                    {/* <i className="listing-forms__tooltip" style={{ left: "7.5rem" }}>
                        (fully booked dates are in grey)
                    </i> */}
                </div>
            </section>

            <p className="listing-forms__title">Briefly describe the job requirements: </p>
            <section className="listing-forms__container">
                <MyTextArea
                    inputclassname="listing-forms__textarea-long"
                    labelclassname="listing-forms__textarea-label"
                    errorclassname="listing-forms__input-error"
                    placeholder=""
                    name="description"
                    label="Job description"
                    rows={5}
                    cols={144}
                />
            </section>

            {!isLoggedIn || user?.accountType.toString() !== "Customer" ?
                <>
                    <p className="removals-forms__title">Enter your contact details: </p>
                    <section className="listing-forms__container">
                        <div style={{ position: 'relative' }}>
                            <MyTextInput
                                inputclassname="listing-forms__input-medium"
                                labelclassname="listing-forms__input-label"
                                errorclassname="listing-forms__input-error"
                                name="customerName"
                                placeholder=""
                                label={`Name`}
                            />
                            <MyTextInput
                                inputclassname="listing-forms__input-medium"
                                labelclassname="listing-forms__input-label"
                                errorclassname="listing-forms__input-error"
                                name="customerEmail"
                                placeholder=""
                                label={`Email`}
                            />
                            <MyTextInput
                                inputclassname="listing-forms__input-medium"
                                labelclassname="listing-forms__input-label"
                                errorclassname="listing-forms__input-error"
                                name="customerPhone"
                                placeholder=""
                                label={`Phone`}
                            />
                        </div>
                    </section>
                </>
                : null
            }

            <section className="removals-forms__buttons-container" style={{ paddingTop: '4rem' }}>
                <button
                    type="button"
                    className="removals-forms__button"
                    onClick={() => setActiveFeature(0)}
                ><Link to={"/map"} style={{ color: '#fff', textDecoration: 'none' }}>Cancel</Link></button>
                <button
                    className="removals-forms__button"
                    disabled={!isValid || isSubmitting}
                    type="submit">
                    <span style={isSubmitting ? { visibility: 'hidden' } : {}}>Submit</span>
                    {isSubmitting && <span className="removals-forms__submitting" />}
                </button>
            </section>
        </div>
    )
})