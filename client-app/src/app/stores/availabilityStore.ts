import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Availability } from '../model/Availability';

export default class AvailabilityStore {
  availabilityDates: any;

  constructor() {
    makeAutoObservable(this);
  }
  
  addDate = async (entry: Availability) => {
    try {
       await agent.Availabilities.create(entry);
      runInAction(() => this.availabilityDates = entry)
    } catch (error) {
      throw error;
    }
  }

  deleteDate = async (id: number) => {
    try {
      await agent.Availabilities.delete(id);
    } catch (error) {
      console.log(error);
    };
  }

}
