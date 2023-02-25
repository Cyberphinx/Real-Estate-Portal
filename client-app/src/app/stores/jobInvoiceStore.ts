import { runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { JobInvoice, JobInvoiceFormValues } from '../model/Invoice';

export default class JobInvoiceStore {
    invoiceRegistry = new Map<string, JobInvoice>();
    selectedInvoice: JobInvoice | undefined = undefined;
    invoice: JobInvoice | null = null;
    loadingInvoice = false;
    loadingInvoices = false;
    clientSecret: string | undefined = "";

    constructor() {
        makeAutoObservable(this)
    }

    // loadInvoice = async (id: string) => {
    //     this.loadingInvoice = true;
    //     try {
    //         const invoice = await agent.Invoices.details(id);
    //         runInAction(() => {
    //             this.invoice = invoice;
    //             this.setClientSecret(invoice.clientSecret);
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         this.loadingInvoice = false;
    //     }
    // }

    private setClientSecret = (clientSecret: string | undefined) => {
        this.clientSecret = clientSecret;
    };

    createInvoice = async (newInvoice: JobInvoiceFormValues, jobId: string) => {
        try {
            newInvoice.invoiceDate = new Date();
            await agent.Invoices.createJobInvoice(newInvoice, jobId);
            const newInvoiceValues = new JobInvoice(newInvoice);
            this.setInvoice(newInvoiceValues);
            runInAction(() => {
                this.selectedInvoice = newInvoiceValues;
            });
        } catch (error) {
            throw error;
        }
    }

    loadInvoices = async () => {
        this.setLoadingInvoices(true);
        // Asynchronous code is inside Try Catch block
        try {
          const result = await agent.Invoices.list();
          result.forEach(invoice => {
            this.setInvoice(invoice);
          });
          this.setLoadingInvoices(false);
        } catch (error) {
          console.log(error);
          this.setLoadingInvoices(false);
        }
      };

    // updateInvoice = async (updatedInvoice: JobInvoiceFormValues) => {
    //     try {
    //         await agent.Invoices.update(updatedInvoice);
    //         const updatedInvoiceValues = new Invoice(updatedInvoice);
    //         this.setInvoice(updatedInvoiceValues);
    //         runInAction(() => {
    //             this.selectedInvoice = updatedInvoiceValues;
    //             // this.invoiceEditMode = false;
    //         })
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // set loading indicator
    setLoadingInvoices = (state: boolean) => {
        this.loadingInvoices = state;
    }

    setLoadingInvoice = (state: boolean) => {
        this.loadingInvoice = state;
    }

    // map jobs to registry
    private setInvoice = (invoice: JobInvoice) => {
        this.invoiceRegistry.set(invoice.id, invoice);
    };

    private getInvoice = (id: string) => {
        return this.invoiceRegistry.get(id);
    };

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