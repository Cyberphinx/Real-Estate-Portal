import { makeAutoObservable, runInAction } from 'mobx';

export default class FeatureStore {
    activeFeature: number = 0;
    activeRegister: number = 0;
    activeAgencyPanel: number = 0;
    activeId: string | null = null;
    isLocked = true;
    listingFormStep: number = 0;

    companyEditMode = false;

    zoom: number = 13;

    toastMessage: string = "";
    toastClassName: string = "";


    constructor() {
        makeAutoObservable(this);
    }

    setActiveFeature = (index: number) => this.activeFeature = index;
    setActiveRegister = (index: number) => this.activeRegister = index;
    setActiveAgencyPanel = (index: number) => this.activeAgencyPanel = index;
    setListingFormStep = (index: number) => this.listingFormStep = index;

    setActiveId = (value: string | null ) => { this.activeId = value };

    setLocked = () => this.isLocked = !this.isLocked;

    setCompanyEditMode = (value: boolean) => { this.companyEditMode = value };

    setZoom = (value: number) => { this.zoom = value };

    setToast = (className: string, message: string) => {
        this.toastClassName = className;
        this.toastMessage = message;
        setTimeout(() => {
            runInAction(() => {
                this.toastClassName = "";
            })
        }, 3000);
    };
}