import { history } from './../../index';
import { runInAction } from 'mobx';
import { RoleFormValues, RegisterFormValues, LoginFormValues } from './../model/User';
import { makeAutoObservable } from 'mobx';
import { User } from "../model/User";
import agent from '../api/agent';
import { store } from './store';

export default class UserStore {
    user: User | null = null;
    users: User[] | null = null;
    loadingUsers = false;
    // loadingAvailable = false;
    // usernameAvailable: any;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: LoginFormValues, setSubmitting: any) => {
        setSubmitting(true);
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push("/");
            store.modalStore.closeModal();
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem("jwt");
        this.user = null;
        history.push("/");
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    getAllUsers = async () => {
        this.setLoadingUsers(true);
        try {
            const users = await agent.Account.list();
            runInAction(() => this.users = users);
            this.setLoadingUsers(false);
        } catch (error) {
            console.log(error);
            this.setLoadingUsers(false);
        }
    }

    setLoadingUsers = (state: boolean) => {
        this.loadingUsers = state;
      }

    register = async ( creds: RegisterFormValues, setSubmitting: any, formType: number, setStep?: any) => {
        setSubmitting(true);
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            switch (formType) {
                case 0:
                    history.push("/");
                    store.modalStore.closeModal();
                    break;
                case 1:
                    setStep(2);
                    break;
                case 2:
                    history.push("/");
                    store.modalStore.closeModal();
                    break;
                default:
                    history.push("/");
                    store.modalStore.closeModal();
                    break;
            }
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            throw error;
        }
    }

    assignrole = async (role: RoleFormValues) => {
        try {
            await agent.Account.assignrole(role);
            history.push("/");
        } catch (error) {
            throw error;
        }
    }

    // helper method to set main image
    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

    // checkUsernameAvailable = async (username: string) => {
    //     this.loadingAvailable = true;
    //     try {
    //         const result = await agent.Account.checkusername(username);
    //         runInAction(() => this.usernameAvailable = result);
    //         this.setLoadingUsers(false);
    //     } catch (error) {
    //         console.log(error);
    //         this.setLoadingUsers(false);
    //     }
    // }
}