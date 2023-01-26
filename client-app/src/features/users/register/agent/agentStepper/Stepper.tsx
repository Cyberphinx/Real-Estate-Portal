import './Stepper.css';
import { observer } from "mobx-react-lite";
import React from 'react';
import { useStore } from '../../../../../app/stores/store';

export default observer(function Stepper() {
    const {modalStore} = useStore();
    const {paymentForm, setPaymentForm, formType, setFormType} = modalStore;

    return (
        <div className="stepper-wrapper">
            <ol className="stepper-timeline">
                <li className="stepper-timeline__item">
                    <button
                        type='button'
                        className='stepper-dot'
                        style={formType === 1 && paymentForm === false ? { 
  background: 'linear-gradient(45deg, rgba(255,20,147, 0.8) 0%, rgba(220, 20, 60, 0.8) 100%)' } : {}}
                        onClick={() => {
                            setPaymentForm(false);
                            setFormType(1);
                        }}
                        // disabled={(paymentForm === true) ? true : false}
                    >1</button>
                    <h3 className="stepper-timeline__title">Account</h3>
                </li>
                <li className="stepper-timeline__item">
                    <button
                        type='button'
                        className='stepper-dot'
                        style={formType === 2 && paymentForm === false ? { 
  background: 'linear-gradient(45deg, rgba(255,20,147, 0.8) 0%, rgba(220, 20, 60, 0.8) 100%)' } : {}}
                        onClick={() => {
                            setPaymentForm(false);
                            setFormType(2);
                        }}
                        // disabled={(paymentForm === true) ? true : false}
                    >2</button>
                    <h3 className="stepper-timeline__title">Membership</h3>
                </li>
                <li className="stepper-timeline__item">
                    <button
                        type='button'
                        className='stepper-dot'
                        style={(formType === 3) ? { 
  background: 'linear-gradient(45deg, rgba(255,20,147, 0.8) 0%, rgba(220, 20, 60, 0.8) 100%)' } : {}}
                        disabled={true}
                    >3</button>
                    <h3 className="stepper-timeline__title">Payment</h3>
                </li>
            </ol>
        </div>
    )
});