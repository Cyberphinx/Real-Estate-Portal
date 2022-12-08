import { makeAutoObservable } from "mobx";

export default class CalendarStore {
  date: any = new Date();
  range: any;
  calendarEditMode = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCalendarEditMode = (value: boolean) => { this.calendarEditMode = value };

  setDate = (date: any) => { this.date = date };
  setRange = (range: any) => { this.range = range };
  

}
