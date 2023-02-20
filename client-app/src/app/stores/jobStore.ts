import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Job, JobFormValues } from "../model/Job";
import { Pagination, PagingParams } from "../model/Pagination";

export default class JobStore {
  jobRegistry = new Map<string, Job>();
  selectedJob: Job | undefined = undefined;
  jobEditMode: boolean = false;
  invoiceEditMode: boolean = false;
  loadingJobs = false;
  loadingJob = false;

  // pagination and query
  loadingNext = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams(1, 12);
  nonExistentDate = new Date(1000, 10, 10,0,0,0);
  predicate = new Map().set("orderBy", "_").set("finishBy", this.nonExistentDate as Date); 

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        // restart from page 1
        this.pagingParams = new PagingParams(1, 12);
        this.jobRegistry.clear();
        this.loadJobs();
      }
    )
  }

  // PAGINATION START
  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  }

  setPredicate = (predicate: string, value: string | string[] | Date) => {
    switch (predicate) {
      case "orderBy":
        this.predicate.delete("orderBy");
        this.predicate.set("orderBy", value);
        break;
      case "searchTerm":
        this.predicate.delete("mapBounds");
        this.predicate.delete("searchTerm");
        this.predicate.set("searchTerm", value);
        break;
      case "serviceCategory":
        this.predicate.delete("serviceCategory");
        this.predicate.set("serviceCategory", value);
        break;
      case "minMaxPrice":
        this.predicate.delete("minMaxPrice");
        this.predicate.set("minMaxPrice", value);
        break;
      case "minMaxBeds":
        this.predicate.delete("minMaxBeds");
        this.predicate.set("minMaxBeds", value);
        break;
      case "mapBounds":
        this.predicate.delete("mapBounds");
        this.predicate.delete("searchTerm");
        this.predicate.set("mapBounds", value);
        break;
      case "finishBy":
        this.predicate.delete("finishBy");
        this.predicate.delete("mapBounds");
        this.predicate.delete("searchTerm");
        this.predicate.set("finishBy", value);
        break;
    }
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "finishBy") {
        params.append(key, (value as Date).toISOString())
      } else {
        params.append(key, value);
      }
    })
    return params;
  }

  setLoadingNext = (value: boolean) => {
    this.loadingNext = value;
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  }
  // PAGINATION END


  // LOAD JOBS START
  loadJobs = async () => {
    this.setLoadingJobs(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Jobs.list(this.axiosParams);
      result.data.forEach(job => {
        this.setJob(job);
      });
      this.setPagination(result.pagination);
      this.setLoadingJobs(false);
    } catch (error) {
      console.log(error);
      this.setLoadingJobs(false);
    }
  };

  loadAllJobs = async () => {
    this.setLoadingJobs(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Jobs.listAll();
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

  loadJobWithLeads = async (id: string) => {
    // using "let" instead of "const" means that we can modify what's inside the variable
    let job = this.getJob(id);
    if (job) {
      this.selectedJob = job;
      return job;
    }
    else {
      this.setLoadingJob(true);
      try {
        job = await agent.Jobs.detailsLeads(id);
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
  // LOAD JOBS END

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