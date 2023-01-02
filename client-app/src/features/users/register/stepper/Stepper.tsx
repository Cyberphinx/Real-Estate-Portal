import './Stepper.css';
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';

interface Props {
    step: number;
}

export default observer(function Stepper({ step }: Props) {

    return (
        <div className="wrapper">
            <ol className="c-timeline">
                <li className="c-timeline__item">
                    <div className="c-timeline__content">
                        <h3 className="c-timeline__title">Design</h3>
                        <p className="c-timeline__desc">In Progress</p>
                    </div>
                    <time>10:03</time>
                </li>
                <li className="c-timeline__item">
                    <div className="c-timeline__content">
                        <h3 className="c-timeline__title">Development</h3>
                        <p className="c-timeline__desc">Todo</p>
                    </div>
                    <time>10:03</time>
                </li>
                <li className="c-timeline__item">
                    <div className="c-timeline__content">
                        <h3 className="c-timeline__title">QA Testing</h3>
                        <p className="c-timeline__desc">Todo</p>
                    </div>
                    <time>10:03</time>
                </li>
            </ol>
        </div>


    )
});