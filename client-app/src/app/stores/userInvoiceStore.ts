import { runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { UserInvoice } from '../model/Invoice';

export default class UserInvoiceStore {
    invoiceRegistry = new Map<string, UserInvoice>();
    selectedInvoice: UserInvoice | undefined = undefined;
    invoice: UserInvoice | null = null;
    loadingInvoice = false;
    loadingInvoices = false;
    clientSecret: string | undefined = "";

    constructor() {
        makeAutoObservable(this)
    }

    loadFirstInvoice = async () => {
        this.loadingInvoice = true;
        try {
            const invoice = await agent.Invoices.getFirstUserInvoice();
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


    // set loading indicator
    setLoadingInvoices = (state: boolean) => {
        this.loadingInvoices = state;
    }

    setLoadingInvoice = (state: boolean) => {
        this.loadingInvoice = state;
    }

    selectInvoice = (id: string) => {
        this.selectedInvoice = this.invoiceRegistry.get(id);
    }

    cancelSelectInvoice = () => {
        this.selectedInvoice = undefined;
    }

    // prepare job for view
    get invoices() {
        return Array.from(this.invoiceRegistry.values());
    }
}