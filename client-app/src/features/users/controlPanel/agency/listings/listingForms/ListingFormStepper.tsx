import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { ListingFormValues } from "../../../../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../../../../app/stores/store";
import './ListingFormStepper.css';

interface Props {
    step: number;
    setStep: (value: number) => void;
    values?: ListingFormValues;
}

export default observer(function ListingFormStepper({ step, setStep, values }: Props) {
    const { listingStore } = useStore();
    const { setListingId } = listingStore;

    return (
        <div style={{ marginRight: '2rem' }}>
            <ol className="listingform-stepper__timeline">
                <li className="listingform-stepper__item">
                    <button className='listingform-stepper__button'>
                        <div className={
                            step === 0 ? 'listingform-stepper__dot-selected'
                                : (step > 0 ? 'listingform-stepper__dot-completed'
                                    : 'listingform-stepper__dot')
                        }>
                            {step > 0 ? <span>&#10003;</span> : <span>1</span>}
                            {step === 0 && <div className="listingform-stepper__dot-circle" />}
                        </div>

                        <span className="listingform-stepper__title"
                            style={step >= 0 ? { color: "#000", cursor: "default", fontWeight: "bold" } : {}}
                        >Address</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button className='listingform-stepper__button'>
                        <div className={
                            step === 1 ? 'listingform-stepper__dot-selected'
                                : (step > 1 ? 'listingform-stepper__dot-completed'
                                    : 'listingform-stepper__dot')
                        }>
                            {step > 1 ? <span>&#10003;</span> : <span>2</span>}
                            {step === 1 && <div className="listingform-stepper__dot-circle" />}
                        </div>

                        <span className="listingform-stepper__title"
                            style={step >= 1 ? { color: "#000", cursor: "default", fontWeight: "bold" } : {}}
                        >Basic info</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <div className='listingform-stepper__button'>
                        <div className={
                            step === 2 ? 'listingform-stepper__dot-selected'
                                : (step > 2 ? 'listingform-stepper__dot-completed'
                                    : 'listingform-stepper__dot')
                        }>
                            {step > 2 ? <span>&#10003;</span> : <span>3</span>}
                            {step === 2 && <div className="listingform-stepper__dot-circle" />}
                        </div>

                        <span className="listingform-stepper__title"
                            style={step >= 2 ? { color: "#000", cursor: "default", fontWeight: "bold" } : {}}
                        >Details</span>
                    </div>
                </li>
                <li className="listingform-stepper__item">
                    <div className='listingform-stepper__button'>
                        <div className={
                            step === 3 ? 'listingform-stepper__dot-selected'
                                : (step > 3 ? 'listingform-stepper__dot-completed'
                                    : 'listingform-stepper__dot')
                        }>
                            {step > 3 ? <span>&#10003;</span> : <span>4</span>}
                            {step === 3 && <div className="listingform-stepper__dot-circle" />}
                        </div>

                        <span className="listingform-stepper__title"
                            style={step >= 3 ? { color: "#000", cursor: "default", fontWeight: "bold" } : {}}
                        >Media</span>
                    </div>
                </li>
                <li className="listingform-stepper__item">
                    <div className='listingform-stepper__button'>
                        <div className={
                            step === 4 ? 'listingform-stepper__dot-selected'
                                : (step > 4 ? 'listingform-stepper__dot-completed'
                                    : 'listingform-stepper__dot')
                        }>
                            {step > 4 ? <span>&#10003;</span> : <span>5</span>}
                            {step === 4 && <div className="listingform-stepper__dot-circle" />}
                        </div>

                        <span className="listingform-stepper__title"
                            style={step === 4 ? { color: "#000", cursor: "default", fontWeight: "bold" } : {}}
                        >Preview</span>
                    </div>
                </li>
            </ol>
        </div>
    )
})