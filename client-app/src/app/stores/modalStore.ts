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
    step: number = 0;

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

    setStep = (value: number) => this.step = value;
}