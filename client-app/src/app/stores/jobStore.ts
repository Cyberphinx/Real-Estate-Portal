import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Job, JobFormValues } from "../model/Job";

export default class JobStore {
  jobRegistry = new Map<string, Job>();
  selectedJob: Job | undefined = undefined;
  jobEditMode: boolean = false;
  invoiceEditMode: boolean = false;
  loadingJobs = false;
  loadingJob = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadJobs = async () => {
    this.setLoadingJobs(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Jobs.list();
      result.forEach(job => {
        this.setJob(job);
      });
      this.setLoadingJobs(false);
    } catch (error) {
      console.log(error);
      this.setLoadingJobs(false);
    }
  };

  loadJob = async (id: string) => {
    // using "let" instead of "const" means that we can modify what's inside the variable
    let job = this.getJob(id);
    if (job) {
      this.selectedJob = job;
      return job;
    }
    else {
      this.setLoadingJob(true);
      try {
        job = await agent.Jobs.details(id);
        this.setJob(job);
        runInAction(() => this.selectedJob = job);
        this.setLoadingJob(false);
        return job;
      } catch (error) {
        console.log(error);
        this.setLoadingJob(false);
      }
    }
  }

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

  setLoadingJob = (state: boolean) => {
    this.loadingJob = state;
  }

  // map jobs to registry
  private setJob = (job: Job) => {
    this.jobRegistry.set(job.id, job);
  };

  private getJob = (id: string) => {
    return this.jobRegistry.get(id);
  };

  selectJob = (id: string) => {
    this.selectedJob = this.jobRegistry.get(id);
  }

  cancelSelectJob = () => {
    this.selectedJob = undefined;
  }

  // prepare job for view
  get jobs() {
    return Array.from(this.jobRegistry.values());
  }
}