import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Job, JobFormValues } from "../model/Job";
import { Pagination, PagingParams } from "../model/Pagination";

export default class RemovalistJobStore {
  removalistJobRegistry = new Map<string, Job>();
  selectedJob: Job | undefined = undefined;
  jobEditMode: boolean = false;
  invoiceEditMode: boolean = false;
  loadingJobs = false;
  loadingJob = false;
  allJobs: Job[] = [];

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
        this.removalistJobRegistry.clear();
        this.loadRemovalsJobs();
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
  loadRemovalsJobs = async () => {
    this.setLoadingJobs(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Jobs.listRemovals(this.axiosParams);
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

  loadAllRemovalsJobs = async () => {
    this.setLoadingJobs(true);
    // Asynchronous code is inside Try Catch block
    try {
      const result = await agent.Jobs.listAllRemovals();
      this.allJobs = [];
      result.forEach(job => {
        this.allJobs.push(job);
      });
      this.setLoadingJobs(false);
    } catch (error) {
      console.log(error);
      this.setLoadingJobs(false);
    }
  };
  // LOAD JOBS END

  // set loading indicator
  setLoadingJobs = (state: boolean) => {
    this.loadingJobs = state;
  }

  setLoadingJob = (state: boolean) => {
    this.loadingJob = state;
  }

  // map jobs to registry
  private setJob = (job: Job) => {
    this.removalistJobRegistry.set(job.id, job);
  };

  private getJob = (id: string) => {
    return this.removalistJobRegistry.get(id);
  };

  selectJob = (id: string) => {
    this.selectedJob = this.removalistJobRegistry.get(id);
  }

  cancelSelectJob = () => {
    this.selectedJob = undefined;
  }

  // prepare job for view
  get jobs() {
    return Array.from(this.removalistJobRegistry.values());
  }
}