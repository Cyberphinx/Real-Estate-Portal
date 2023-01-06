import { makeAutoObservable } from 'mobx';

interface Modal {
    open: boolean;
    body: JSX.Element | null;
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null
    }
    formType: number = 0;
    paymentForm = false;

    constructor() {
        makeAutoObservable(this)
    }

    openModal = (content: JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }

    setFormType = (value: number) => this.formType = value;

    setPaymentForm = (value: boolean) => this.paymentForm = value;

}