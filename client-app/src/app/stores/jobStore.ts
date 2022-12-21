import { runInAction } from "mobx";
import agent from "../api/agent";
import { Job, JobFormValues } from "../model/Job";

export default class JobStore {
  jobRegistry = new Map<string, Job>();
  selectedJob: Job | undefined = undefined;
  jobEditMode: boolean = false;
  invoiceEditMode: boolean = false;
  loadingJobs = false;

  loadJobs = async () => {
    this.setLoadingJobs(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Jobs.list();
      runInAction(() => {
        result.forEach(job => {
          this.setJob(job);
        });
        this.setLoadingJobs(false);
      });
    } catch (error) {
      runInAction(() => this.setLoadingJobs(false));
      console.log(error);
    }
  };

  createJob = async (newJob: JobFormValues) => {
    try {
      newJob.addedOn = new Date();
      await agent.Jobs.create(newJob);
      const newJobValues = new Job(newJob);
      this.setJob(newJobValues);
      runInAction(() => {
        this.selectedJob = newJobValues;
      });
    } catch (error) {
      throw error;
    }
  }

  updateJob = async (updatedJob: JobFormValues) => {
    try {
      await agent.Jobs.update(updatedJob);
      const updatedJobValues = new Job(updatedJob);
      this.setJob(updatedJobValues);
      runInAction(() => {
        this.selectedJob = updatedJobValues;
        this.jobEditMode = false;
      })
    } catch (error) {
      throw error;
    }
  }

  // set loading indicator
  setLoadingJobs = (state: boolean) => {
    this.loadingJobs = state;
  }

  // map jobs to registry
  private setJob = (job: Job) => {
    this.jobRegistry.set(job.id, job);
  };

  selectJob = (id: string) => {
    this.selectedJob = this.jobRegistry.get(id);
  }

  cancelSelectedJob = () => {
    this.selectedJob = undefined;
  }

  // prepare job for view
  get jobs() {
    return Array.from(this.jobRegistry.values());
  }
}