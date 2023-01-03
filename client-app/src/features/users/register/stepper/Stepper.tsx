import './Stepper.css';
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';

interface Props {
    step: number;
    setStep: (value: number) => void;
}

export default observer(function Stepper({ step, setStep }: Props) {

    return (
        <div className="stepper-wrapper">
            <ol className="stepper-timeline">
                <li className="stepper-timeline__item">
                    <button
                        type='button'
                        className='stepper-dot'
                        style={step === 0 ? { backgroundColor: "#1F51FF" } : {}}
                        onClick={() => setStep(0)}
                        disabled={step === 2 ? true : false}
                    >1</button>
                    <h3 className="stepper-timeline__title">Account</h3>
                </li>
                <li className="stepper-timeline__item">
                    <button
                        type='button'
                        className='stepper-dot'
                        style={step === 1 ? { backgroundColor: "#1F51FF" } : {}}
                        disabled={step === 2 ? true : false}
                        onClick={() => setStep(1)}
                    >2</button>
                    <h3 className="stepper-timeline__title">Membership</h3>
                </li>
                <li className="stepper-timeline__item">
                    <button
                        type='button'
                        className='stepper-dot'
                        style={step === 2 ? { backgroundColor: "#1F51FF" } : {}}
                        disabled={true}
                    >3</button>
                    <h3 className="stepper-timeline__title">Payment</h3>
                </li>
            </ol>
        </div>


    )
});