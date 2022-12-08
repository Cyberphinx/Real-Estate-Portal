import React, { useState } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import ValidationErrors from './ValidationErrors';
import './TestError.css';
import { useStore } from '../../app/stores/store';

export default observer(function TestErrors() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState(null);
    const { modalStore: { closeModal } } = useStore();

    function handleNotFound() {
        axios.get(baseUrl + '/buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + '/buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + '/buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + '/buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + '/salesadverts/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + '/order', {}).catch(err => setErrors(err));
    }

    return (
        <div className='test-error-modal'>
            <div className="close-container" onClick={() => closeModal()}>
                <p className="close-modal-button">&times;</p>
            </div>
            <div>
                <h1>Test Error component</h1>
                <div>
                    <div>
                        <button onClick={handleNotFound}>Not Found</button>
                        <button onClick={handleBadRequest}>Bad Request</button>
                        <button onClick={handleValidationError}>Validation Error</button>
                        <button onClick={handleServerError}>Server Error</button>
                        <button onClick={handleUnauthorised}>Unauthorised</button>
                        <button onClick={handleBadGuid}>Bad Guid</button>
                    </div>
                </div>
                {errors &&
                    <ValidationErrors errors={errors} />
                }
            </div>

        </div>
    )
});