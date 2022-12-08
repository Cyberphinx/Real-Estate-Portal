import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../model/ServerError";

export default class CommonStore {
    token: string | null = window.localStorage.getItem("jwt");
    appLoaded = false;
    error: ServerError | null = null;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem("jwt", token)
                } else {
                    window.localStorage.removeItem("jwt")
                }
            }
        )
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {this.appLoaded = true};

    setServerError = (error: ServerError) => {
        this.error = error;
    }
    
}