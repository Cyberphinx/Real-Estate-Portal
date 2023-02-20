import { history } from '../../index';
import { runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { CalendarEvent } from '../model/CalendarEvent';

export default class CalendarStore {
    events: CalendarEvent[] | null = null;
    loadingEvents = false;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadEvents = async (username: string) => {
        this.loadingEvents = true;
        try {
            const events = await agent.Calendar.list(username);
            runInAction(() => {
                this.events = events;
            });
            this.loadingEvents = false;
        } catch (error) {
            console.log(error);
            this.loadingEvents = false;
        }
    }

    createEvent = async (newEvent: CalendarEvent, username: string) => {
        this.loading = true;
        try {
            await agent.Calendar.create(newEvent, username);
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    deleteEvent = async (id: string, username: string) => {
        this.loading = true;
        try {
            await agent.Calendar.delete(id, username);
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        };
    }

}