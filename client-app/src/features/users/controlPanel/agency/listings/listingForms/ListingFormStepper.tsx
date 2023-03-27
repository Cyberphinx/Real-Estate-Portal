import React from "react";
import { observer } from "mobx-react-lite";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import './ListingFormStepper.css';
import { Link } from "react-router-dom";

interface Props {
    step: number;
    setStep: (value: number) => void;
    values?: ListingFormValues;
    dirty?: boolean;
}

export default observer(function ListingFormStepper({ step, setStep, values, dirty }: Props) {

    return (
        <div style={{ marginRight: '2rem' }}>
            <ol className="listingform-stepper__timeline">
                <li className="listingform-stepper__item">
                    <button
                        className='listingform-stepper__button'
                        type="button"
                        disabled={!values?.listingReference || step === 0}
                        style={values?.listingReference && step !== 0 ? { cursor: 'pointer' } : { cursor: 'default' }}
                        onClick={() => {
                            if (values?.listingReference) setStep(0);
                        }}
                    >
                        <div className={
                            step === 0 ? 'listingform-stepper__dot-selected'
                                : (step > 0 ? 'listingform-stepper__dot-completed'
                                    : 'listingform-stepper__dot')
                        }>
                            {step > 0 ? <span>&#10003;</span> : <span>1</span>}
                            {step === 0 && <div className="listingform-stepper__dot-circle" />}
                        </div>

                        <span className="listingform-stepper__title"
                            style={step >= 0 ? { color: "#000", fontWeight: "bold" } : {}}
                        >Address</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button
                        className='listingform-stepper__button'
                        type="button"
                        disabled={!values?.listingReference || step === 1}
                        style={values?.listingReference && step !== 1 ? { cursor: 'pointer' } : { cursor: 'default' }}
                        onClick={() => {
                            if (values?.listingReference) setStep(1);
                        }}
                    >
                        <div className={
                            step === 1 ? 'listingform-stepper__dot-selected'
                                : (step > 1 ? 'listingform-stepper__dot-completed'
                                    : 'listingform-stepper__dot')
                        }>
                            {step > 1 ? <span>&#10003;</span> : <span>2</span>}
                            {step === 1 && <div className="listingform-stepper__dot-circle" />}
                        </div>

                        <span className="listingform-stepper__title"
                            style={step >= 1 ? { color: "#000", fontWeight: "bold" } : {}}
                        >Basic info</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button
                        className='listingform-stepper__button'
                        type="button"
                        disabled={!values?.listingReference || step === 2}
                        style={values?.listingReference && step !== 2 ? { cursor: 'pointer' } : { cursor: 'default' }}
                        onClick={() => {
                            if (values?.listingReference) setStep(2);
                        }}
                    >
                        <div className={
                            step === 2 ? 'listingform-stepper__dot-selected'
                                : (step > 2 ? 'listingform-stepper__dot-completed'
                                    : 'listingform-stepper__dot')
                        }>
                            {step > 2 ? <span>&#10003;</span> : <span>3</span>}
                            {step === 2 && <div className="listingform-stepper__dot-circle" />}
                        </div>

                        <span className="listingform-stepper__title"
                            style={step >= 2 ? { color: "#000", fontWeight: "bold" } : {}}
                        >Details</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button
                        id='listingform-stepper__media-button'
                        className='listingform-stepper__button'
                        type="button"
                        disabled={!values?.listingReference || step === 3 || dirty}
                        style={values?.listingReference && step !== 3 && !dirty ? { cursor: 'pointer' } : { cursor: 'default' }}
                        onClick={() => {
                            if (values?.listingReference) setStep(3);
                        }}
                    >
                        <Link
                            to={`/add-listing-media/${values?.id}`}
                            style={!values?.listingReference || step === 3 || dirty ?
                                { color: '#fff', textDecoration: 'none', pointerEvents: 'none' }
                                : { color: '#fff', textDecoration: 'none' }}
                        >
                            <div className={
                                step === 3 ? 'listingform-stepper__dot-selected'
                                    : (step > 3 ? 'listingform-stepper__dot-completed'
                                        : 'listingform-stepper__dot')
                            }>
                                {step > 3 ? <span>&#10003;</span> : <span>4</span>}
                                {step === 3 && <div className="listingform-stepper__dot-circle" />}
                                {dirty && <span
                                    id="listingform-stepper__media-tooltip"
                                    className="listingform-stepper__tooltip">
                                    Please save changes before continue to media
                                </span>}
                            </div>
                        </Link>
                        <Link
                            to={`/add-listing-media/${values?.id}`}
                            style={!values?.listingReference || step === 3 || dirty ?
                                { color: '#fff', textDecoration: 'none', pointerEvents: 'none' }
                                : { color: '#fff', textDecoration: 'none' }}
                        >
                            <span className="listingform-stepper__title"
                                style={step >= 3 ? { color: "#000", fontWeight: "bold" } : {}}
                            >Media</span>
                        </Link>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button
                        id='listingform-stepper__preview-button'
                        className='listingform-stepper__button'
                        type="button"
                        disabled={!values?.listingReference || step === 4 || dirty}
                        style={values?.listingReference && step !== 4 && !dirty ? { cursor: 'pointer' } : { cursor: 'default' }}
                        onClick={() => {
                            if (values?.listingReference) setStep(4);
                        }}
                    >
                        <Link
                            to={`/preview/${values?.id}`}
                            style={!values?.listingReference || step === 4 || dirty ?
                                { color: '#fff', textDecoration: 'none', pointerEvents: 'none' }
                                : { color: '#fff', textDecoration: 'none' }}
                        >
                            <div className={
                                step === 4 ? 'listingform-stepper__dot-selected'
                                    : (step > 4 ? 'listingform-stepper__dot-completed'
                                        : 'listingform-stepper__dot')
                            }>
                                {step > 4 ? <span>&#10003;</span> : <span>5</span>}
                                {step === 4 && <div className="listingform-stepper__dot-circle" />}
                                {dirty && <span
                                    id="listingform-stepper__preview-tooltip"
                                    className="listingform-stepper__tooltip">
                                    Please save changes before continue to preview
                                </span>}
                            </div>
                        </Link>
                        <Link
                            to={`/preview/${values?.id}`}
                            style={!values?.listingReference || step === 4 || dirty ?
                                { color: '#fff', textDecoration: 'none', pointerEvents: 'none' }
                                : { color: '#fff', textDecoration: 'none' }}
                        >
                            <span className="listingform-stepper__title"
                                style={step === 4 ? { color: "#000", fontWeight: "bold" } : {}}
                            >Preview</span>
                        </Link>
                    </button>
                </li>
            </ol>
        </div>
    )
})