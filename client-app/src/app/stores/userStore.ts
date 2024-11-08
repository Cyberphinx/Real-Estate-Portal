import { AccountType } from './../model/User';
import { runInAction } from 'mobx';
import { RoleFormValues, RegisterFormValues, LoginFormValues } from '../model/User';
import { makeAutoObservable } from 'mobx';
import { User } from "../model/User";
import agent from '../api/agent';
import { store } from './store';
import { router } from '../router/routes';

export default class UserStore {
    user: User | null = null;
    users: User[] | null = null;
    loadingUsers = false;
    refreshTokenTimeout: any;
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
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
            router.navigate("/control-panel");
            store.modalStore.closeModal();
            store.featureStore.setToast("show success", "Login successful!");
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
        router.navigate("/");
        store.featureStore.setToast("show info", "Successfully logged out!");
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            this.startRefreshTokenTimer(user);
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

    register = async ( creds: RegisterFormValues, setSubmitting: any, paymentModal: JSX.Element, successModal: JSX.Element) => {
        setSubmitting(true);
        try {
            await agent.Account.register(creds);

            switch (creds.accountType) {
                case AccountType.Customer:
                    store.modalStore.closeModal();
                    router.navigate(`/account/registerSuccess?email=${creds.email}`);
                    store.modalStore.openModal(successModal);
                    store.featureStore.setToast("show success", "Account successfully created!");
                    break;
                case AccountType.Agent:
                    store.modalStore.closeModal();
                    router.navigate(`/account/registerSuccess?email=${creds.email}`);
                    store.modalStore.openModal(successModal);
                    store.featureStore.setToast("show success", "Account successfully created!");
                    // store.modalStore.openModal(paymentModal);
                    // if (store.modalStore.formType !== 3) store.modalStore.setFormType(3);
                    break;
                case AccountType.Company:
                    router.navigate("/");
                    store.modalStore.closeModal();
                    break;
                default:
                    router.navigate("/");
                    store.modalStore.closeModal();
                    break;
            }
            setSubmitting(false);
        } catch (error: any) {
            setSubmitting(false);
            if (error?.response?.status === 400) throw error;
            store.modalStore.closeModal();
            console.log(500);
        }
    }

    assignrole = async (role: RoleFormValues) => {
        try {
            await agent.Account.assignrole(role);
            router.navigate("/");
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

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (300 * 1000); // refreshes every 5 minutes
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}