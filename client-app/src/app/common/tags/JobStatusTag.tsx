import { format, parseISO } from "date-fns";
import React from "react";
import { Job, JobLifeCycle } from "../../model/JobAggregate/Job";
import './JobStatusTag.css';

interface Props {
    job: Job | null;
}

export default function JobStatusTag({ job }: Props) {
    const tagStyle = (job: Job) => {
        switch (job.jobLifeCycle) {
            case 0:
                return "order-tag processing"
            case 1:
                return "order-tag completed"
            case 2:
                return "order-tag cancelled"
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <span className={tagStyle(job!)} >
                {format(parseISO(job!.addedOn.toString()), "dd MMM yyyy")} | {JobLifeCycle[job!.jobLifeCycle]}
            </span>
        </div>

    );
}