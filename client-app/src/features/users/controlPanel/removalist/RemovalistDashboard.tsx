import React, { useCallback, useEffect, useState } from "react";
import './RemovalistDashboard.css';
import { observer } from "mobx-react-lite";
import { v4 as uuid } from 'uuid';
import { accountTypeSwitch, User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import Calendar, { Detail } from "react-calendar";
import { Job } from "../../../../app/model/Job";
import { dateFormatterShort } from "../../../../app/common/HelperFunctions";
import { CalendarEvent } from "../../../../app/model/CalendarEvent";

interface Props {
    user: User | null;
    jobs: Job[];
    allJobs: Job[];
}

export default observer(function RemovalistDashboard({ user, jobs, allJobs }: Props) {
    const { profileStore, removalistJobStore, calendarStore } = useStore();
    const { headquarter } = profileStore;
    const { setPredicate, predicate, nonExistentDate, loadingJobs } = removalistJobStore;
    const { events, createEvent, deleteEvent, loading } = calendarStore;




    // LEAFLET START
    // const apikey = process.env.REACT_APP_LOCATION_IQ;
    // const locationIQLink = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apikey}`;

    // const apikeyTomtom = process.env.REACT_APP_TOMTOM;
    // const tomtomLink = `https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${apikeyTomtom}`;

    // const mapView = L.tileLayer(locationIQLink, { attribution: '&copy <a href="https://locationiq.com/?ref=maps">LocationIQ</a>' });
    // const satelliteView = L.tileLayer(tomtomLink, { attribution: '&copy <a href="https://www.tomtom.com/products/satellite-imagery/">TomTom</a>' });

    // var baseMaps = {
    //     "Map view": mapView,
    //     "Satellite view": satelliteView
    // };
    // var layerControl = L.control.layers(baseMaps);

    // const provider = new LocationIQProvider({
    //     params: {
    //         key: apikey!,
    //         countrycodes: "gb",
    //         addressdetails: 1,
    //         normalizeaddress: 1,
    //     },
    // });

    // const customIcon = L.icon({
    //     iconUrl: 'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674084107/Icons/here_celvne.png',
    //     iconSize: [60, 60],
    //     iconAnchor: [30, 60]
    // });

    // const searchControl = new (GeoSearchControl as any)({
    //     provider: provider,
    //     style: 'bar',
    //     showMarker: true,
    //     marker: {
    //         icon: customIcon,
    //         draggable: false,
    //     },
    // });

    // useEffect(() => {
    //     var map = L.map('agencymap').setView([51.505, -0.09], 13);
    //     mapView.addTo(map);
    //     map.addControl(searchControl);


    //     return () => {
    //         map.removeControl(searchControl);
    //         map.off();
    //         map.remove();
    //     };
    // }, [])

    // LEAFLET END

    const [marks, setMarks] = useState<Set<string>>(new Set());
    const [unavailables, setUnavailables] = useState<Set<string>>(new Set());

    const addJobsToCalendar = useCallback(() => {
        let marksSet: Set<string> = new Set();
        let unavailablesSet: Set<string> = new Set();

        allJobs.forEach((job: Job) => {
            let jobDate = dateFormatterShort(job.finishBy);
            marksSet.add(jobDate);
        });

        events?.forEach((eve: CalendarEvent) => {
            let eventDate = dateFormatterShort(eve.eventDate);
            unavailablesSet.add(eventDate);
        })

        setMarks(marksSet);
        setUnavailables(unavailablesSet);
    }, [allJobs])

    useEffect(() => {
        if (allJobs && events) addJobsToCalendar();
        return () => {
            setMarks(new Set());
            setUnavailables(new Set());
        }
    }, [allJobs, events, addJobsToCalendar])

    function highlightDates(date: Date, view: Detail) {
        if (view === 'month' && marks.has(date.toLocaleDateString())) {
            return 'calendar__highlight';
        }
        if (view === 'month' && unavailables.has(date.toLocaleDateString())) {
            return 'calendar__unavailable';
        }
        return null;
    }

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [showLength, setShowLength] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    function showJobsOfDate(date: Date, length: number) {
        setSelectedDate(date);

        let theTitle: string = '';

        if (marks.has(date.toLocaleDateString())) {
            setPredicate("finishBy", date as Date);
            setShowLength(true);
            theTitle = ` on ${dateFormatterShort(date)}`;
        }

        if (unavailables.has(date.toLocaleDateString())) {
            setShowLength(false);
            theTitle = `Unavailable on ${dateFormatterShort(date)}`;
        }

        if (!marks.has(date.toLocaleDateString()) && !unavailables.has(date.toLocaleDateString())) {
            setShowLength(false);
            theTitle = `No jobs on ${dateFormatterShort(date)}`;
        }

        setTitle(theTitle);
    }

    const address = `${headquarter?.companyAddress.propertyNumberOrName && (headquarter?.companyAddress.propertyNumberOrName + ", ")}
    ${headquarter?.companyAddress.streetName && (headquarter?.companyAddress.streetName + ", ")}
    ${headquarter?.companyAddress.locality && (headquarter?.companyAddress.locality + ", ")}
    ${headquarter?.companyAddress.townOrCity && (headquarter?.companyAddress.townOrCity + ", ")}
    ${headquarter?.companyAddress.county && (headquarter?.companyAddress.county + ", ")}
    ${headquarter?.companyAddress.postalCode && (headquarter?.companyAddress.postalCode)}
    `;

    return (
        <div className="removalist-dashboard">
            {/* <div id="agencymap" /> */}

            <div className="removalist-dashboard__section-one">
                {/* {selectedDate && <>
                    <h1>toLocaleDateString: {selectedDate.toLocaleDateString()}</h1>
                    <h1>toDateString: {selectedDate.toDateString()}</h1>
                    <h1>toISOString: {selectedDate.toISOString()}</h1>
                    <h1>toUTCString: {selectedDate.toUTCString()}</h1>
                    <h1>toString: {selectedDate.toString()}</h1>
                    <h1>{marks.has(selectedDate.toLocaleDateString()) ? 'yes' : 'no'}</h1>
                </>}
                <h3>marks has:</h3>
                {Array.from(marks).map((item, index) => (
                    <div key={index}>
                        <h4>{item}</h4>
                    </div>
                ))} */}

                <Calendar
                    onClickDay={(date, event) => showJobsOfDate(date, jobs.length)}
                    tileClassName={({ date, view }) => highlightDates(date, view)}
                />
            </div>

            <div className="removalist-dashboard__section-two" >
                {loadingJobs ?
                    <p className="removalist-dashboard__title">Loading jobs...</p>
                    :
                    <>
                        {title.length > 0 && <p className="removalist-dashboard__title">
                            {showLength && <b>{jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} </b>}
                            <span>{title}</span>
                        </p>}
                        <p className="removalist-dashboard__title">{allJobs.length} jobs in total</p>
                    </>}
            </div>

            <div className="removalist-dashboard__section-three">
                <button
                    className="calendar__reset-button"
                    onClick={() => {
                        setPredicate("finishBy", nonExistentDate as Date);
                        setShowLength(false);
                    }}
                    disabled={predicate.has("finishBy") && predicate.get("finishBy") === nonExistentDate as Date}
                >
                    Show all jobs</button>

                {selectedDate && !marks.has(dateFormatterShort(selectedDate)) &&
                    (unavailables.has(dateFormatterShort(selectedDate)) ?
                        <button
                            className="calendar__available-button"
                            onClick={() => {
                                if (user && selectedDate && events) {
                                    // remove the event
                                    let eventToBeDeleted = events.find(x => dateFormatterShort(x.eventDate) === dateFormatterShort(selectedDate));
                                    if (eventToBeDeleted) deleteEvent(eventToBeDeleted.id, user.username);

                                    // changing the state to match
                                    let toBeDeleted = dateFormatterShort(selectedDate);
                                    setUnavailables((existingValues: Set<string>) => {
                                        existingValues.delete(toBeDeleted);
                                        return existingValues;
                                    });
                                }
                            }}
                        >
                            <span style={loading ? { visibility: 'hidden' } : {}}>Mark as available</span>
                            {loading && <span className="removalist-dashboard__submitting" />}
                        </button>
                        : <button
                            className="calendar__unavailable-button"
                            onClick={() => {


                                if (user && selectedDate) {
                                    // make sure the British Summer Time does not offset the hours by 1 hour backwards in summer dates
                                    let correctDate = new Date(selectedDate);
                                    correctDate.setTime(correctDate.getTime() - correctDate.getTimezoneOffset() * 60 * 1000);

                                    // create the event
                                    let newEvent: CalendarEvent = {
                                        id: uuid(),
                                        eventDate: correctDate,
                                        eventDescription: "Unavailable",
                                        username: user.username
                                    }
                                    createEvent(newEvent, user.username);

                                    // adding it to the state to match
                                    let newDate = dateFormatterShort(correctDate);
                                    setUnavailables((existingValues: Set<string>) => existingValues.add(newDate));
                                }
                            }}
                        >
                            <span style={loading ? { visibility: 'hidden' } : {}}>Mark as unavailable</span>
                            {loading && <span className="removalist-dashboard__submitting" />}
                        </button>)}

            </div>

            <div className="removalist-dashboard__section-four">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0', margin: '0' }}>
                    {user?.displayName ? user.displayName : user?.username}
                </h1>
                <p>Country: {user?.country}</p>
                <p>Language: {user?.language}</p>
                <p>Membership: Active</p>
                <p>Account email: {user?.email}</p>
                <p>Account type: {user && accountTypeSwitch(user!)}</p>
                {/* <button>Edit account settings</button> */}
                <hr style={{margin:'2.5rem'}} />
                <p>{headquarter?.legalName}</p>
                <p>{address}</p>
                {/* <button>View company</button> */}
                {/* <button>Edit company</button> */}
            </div>
        </div>
    )
})