import React, { useEffect, useState } from "react";
import "./CreateRemovalsJob.css";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";
import { JobFormValues, JobLifeCycle } from "../../../app/model/Job";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Form, Formik } from "formik";
import Nav from "../../../app/layout/Nav";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import RemovalsJobForm from "./RemovalsJobForm";
import { router } from "../../../app/router/routes";


export default observer(function CreateRemovalsJob() {
    const { id } = useParams<string>();
    const { removalistJobStore, jobStore, userStore, calendarStore } = useStore();
    const { loadAllRemovalsJobs, loadingJobs } = removalistJobStore;
    const { loadJob, createJob, updateJob, loadingJob } = jobStore;
    const { isLoggedIn, user } = userStore;
    const { loadEvents } = calendarStore;

    const [currentRemovalsJobValues, setCurrentRemovalsJobValues] = useState<JobFormValues>(new JobFormValues());

    // this is for editing an existing job data
    useEffect(() => {
        if (id) loadJob(id).then(jobValues => setCurrentRemovalsJobValues(new JobFormValues(jobValues)));
    }, [id, loadJob]);

    // this is for the calender availability data
    useEffect(() => {
        loadAllRemovalsJobs();
        loadEvents("moving");
    }, [loadAllRemovalsJobs, loadEvents])

    function handleFormSubmit(job: JobFormValues) {
        if (!job.id) {
            let newJob = {
                ...job,
                id: uuid(),
                jobReference: nanoid(10),
                serviceCategories: ["Removals"],
                jobLifeCycle: JobLifeCycle.Open,
                title: `Relocation from ${job.jobLocations![0].townOrCity} ${job.jobLocations![0].postalCode} to ${job.jobLocations![1].townOrCity} ${job.jobLocations![1].postalCode}`
            };
            createJob(newJob).then(() => router.navigate(`/removals-job-confirmation/${newJob.id}`));
        } else {
            updateJob(job).then(() => router.navigate(`/removals-job-confirmation/${job.id}`));
        }
    }

    const initialValues = () => {
        if (!currentRemovalsJobValues.jobLocations || currentRemovalsJobValues.jobLocations.length < 1) {
            currentRemovalsJobValues.jobLocations?.push({
                id: uuid(),
                addressType: 'Pick up address',
                index: 0,
                displayAddress: '',
                propertyNumberOrName: '',
                streetName: '',
                locality: '',
                townOrCity: '',
                county: '',
                postalCode: '',
                country: '',
                latitude: 0,
                longitude: 0
            }, {
                id: uuid(),
                addressType: 'Drop off address',
                index: 1,
                displayAddress: '',
                propertyNumberOrName: '',
                streetName: '',
                locality: '',
                townOrCity: '',
                county: '',
                postalCode: '',
                country: '',
                latitude: 0,
                longitude: 0
            }
            )
        }
        if (isLoggedIn && user) {
            currentRemovalsJobValues.customerName = user.displayName;
            currentRemovalsJobValues.customerEmail = user.email;
            currentRemovalsJobValues.customerPhone = user.phoneNumber;
        }
        return currentRemovalsJobValues;
    }

    const validation = () => {
        if (isLoggedIn && user && user.accountType.toString() === "Customer") {
            let publicValidationSchema = Yup.object({
            });
            return publicValidationSchema;
        } else {
            let validationSchema = Yup.object({
                customerName: Yup.string().required("Name is required"),
                customerEmail: Yup.string().required("Email address is required").email('Please enter a valid email address'),
                customerPhone: Yup.string().required("Phone number is required"),
            });
            return validationSchema;
        }
    }

    return (
        <div>
            <Nav />
            <div className="removals-form__container">
                <Formik
                    initialValues={initialValues()}
                    enableReinitialize
                    onSubmit={(values) => handleFormSubmit(values)}
                    validationSchema={validation}
                >
                    {({ handleSubmit, isSubmitting, isValid, values, setFieldValue }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            {loadingJob || loadingJobs ?
                                <LoadingComponent content={'Loading listing form values...'} />
                                :
                                <div className="removals-form__contents">
                                    <div className="listing-form__toolbar">
                                        {id ? <p style={{ paddingTop: '2rem' }}>Edit moving company booking:
                                            <span style={{ fontWeight: 'normal', color: '#6807F9', paddingLeft: '1rem' }}>{values.jobReference}</span>
                                        </p>
                                            : <p style={{ paddingTop: '2rem' }}>Book moving company</p>}
                                    </div>
                                    <RemovalsJobForm
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        isValid={isValid}
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
})