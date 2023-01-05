import { history } from './../../index';
import { runInAction } from 'mobx';
import { RoleFormValues, RegisterFormValues, LoginFormValues } from './../model/User';
import { makeAutoObservable } from 'mobx';
import { User } from "../model/User";
import agent from '../api/agent';
import { store } from './store';
import { Invoice } from '../model/Profile';

export default class InvoiceStore {
    invoice: Invoice | null = null;
    loadingInvoice = false;
    clientSecret: string | undefined = "";

    constructor() {
        makeAutoObservable(this)
    }

    loadFirstInvoice = async () => {
        this.loadingInvoice = true;
        try {
            const invoice = await agent.Invoices.getFirstInvoice();
            runInAction(() => {
                this.invoice = invoice;
                this.setClientSecret(invoice.clientSecret);
            });
            this.loadingInvoice = false;
        } catch (error) {
            console.log(error);
            this.loadingInvoice = false;
        }
    }

    private setClientSecret = (clientSecret: string | undefined) => {
        this.clientSecret = clientSecret;
    };


}