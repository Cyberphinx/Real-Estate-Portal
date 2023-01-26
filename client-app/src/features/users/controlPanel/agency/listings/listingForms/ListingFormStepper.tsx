import React from "react";
import './ListingFormStepper.css';


interface Props {
    step: number;
    setStep: (value: number) => void;
}

export default function ListingFormStepper({ step, setStep }: Props) {

    return (
        <div>
            <ol className="listingform-stepper__timeline">
                <li className="listingform-stepper__item">
                    <button
                        type='button'
                        className='listingform-stepper__button'
                        onClick={() => setStep(0)}
                        disabled={step === 0 ? true : false}
                    >
                        <span className='listingform-stepper__dot'
                            style={step === 0 ? { backgroundColor: "#000", cursor:"default" } : {}}
                        >1</span>
                        <span className="listingform-stepper__title"
                            style={step === 0 ? { color: "#000", cursor:"default",fontWeight:"bold" } : {}}
                        >Address</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button
                        type='button'
                        className='listingform-stepper__button'
                        onClick={() => setStep(1)}
                        disabled={step === 1 ? true : false}
                    >
                        <span className='listingform-stepper__dot'
                            style={step === 1 ? { backgroundColor: "#000", cursor:"default" } : {}}
                        >2</span>
                        <span className="listingform-stepper__title"
                            style={step === 1 ? { color: "#000", cursor:"default",fontWeight:"bold" } : {}}
                        >Basic info</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button
                        type='button'
                        className='listingform-stepper__button'
                        onClick={() => setStep(2)}
                        disabled={step === 2 ? true : false}
                    >
                        <span className='listingform-stepper__dot'
                            style={step === 2 ? { backgroundColor: "#000", cursor:"default" } : {}}
                        >3</span>
                        <span className="listingform-stepper__title"
                            style={step === 2 ? { color: "#000", cursor:"default",fontWeight:"bold" } : {}}
                        >Details</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button
                        type='button'
                        className='listingform-stepper__button'
                        onClick={() => setStep(3)}
                        disabled={step === 3 ? true : false}
                    >
                        <span className='listingform-stepper__dot'
                            style={step === 3 ? { backgroundColor: "#000", cursor:"default" } : {}}
                        >4</span>
                        <span className="listingform-stepper__title"
                            style={step === 3 ? { color: "#000", cursor:"default",fontWeight:"bold" } : {}}
                        >Media</span>
                    </button>
                </li>
                <li className="listingform-stepper__item">
                    <button
                        type='button'
                        className='listingform-stepper__button'
                        onClick={() => setStep(4)}
                        disabled={step === 4 ? true : false}
                    >
                        <span className='listingform-stepper__dot'
                            style={step === 4 ? { backgroundColor: "#000", cursor:"default" } : {}}
                        >5</span>
                        <span className="listingform-stepper__title"
                            style={step === 4 ? { color: "#000", cursor:"default",fontWeight:"bold" } : {}}
                        >Preview</span>
                    </button>
                </li>
            </ol>
        </div>
    )
}