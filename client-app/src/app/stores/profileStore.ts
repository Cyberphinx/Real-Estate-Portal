import { UserCompanyDto } from './../model/Profile';
import { runInAction, reaction } from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { Profile, UserJobDto, WatcherListingDto } from '../model/Profile';
import { store } from './store';

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    activeTab = 0;
    userJobs: UserJobDto[] = [];
    userListings: WatcherListingDto[] = [];
    userCompanies: UserCompanyDto[] = [];
    loadingUserJobs = false;
    loadingUserListings = false;
    loadingUserCompanies = false;

    constructor() {
        makeAutoObservable(this);

        // reaction(
        //     () => this.activeTab,
        //     activeTab => {
        //         if (activeTab === 3 || activeTab === 4) {
        //             const predicate = activeTab === 3 ? "followers" : "following";
        //             this.loadFollowings(predicate);
        //         } else {
        //             this.followings = [];
        //         }
        //     }
        // )
    }

    setActiveTab = (activeTab: any) => {
        this.activeTab = activeTab;
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        } 
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try{
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !== store.userStore.user?.displayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = {...this.profile, ...profile as Profile};
                this.loading = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    // uploadPhoto = async (file: Blob) => {
    //     this.uploading = true;
    //     try {
    //         const response = await agent.Profiles.uploadPhoto(file);
    //         const photo = response.data;
    //         runInAction(() => {
    //             if (this.profile) {
    //                 this.profile.photos?.push(photo);
    //                 if (photo.isMain && store.userStore.user) {
    //                     // update the photo in several places if its the main photo
    //                     store.userStore.setImage(photo.url);
    //                     this.profile.image = photo.url;
    //                 }
    //             }
    //             this.uploading = false;
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => this.uploading = false);
    //     }
    // }

    // setMainPhoto = async (photo: Photo) => {
    //     this.loading = true;
    //     try {
    //         await agent.Profiles.setMainPhoto(photo.id);
    //         store.userStore.setImage(photo.url);
    //         runInAction(() => {
    //             if (this.profile && this.profile.photos) {
    //                 this.profile.photos.find(p => p.isMain)!.isMain = false;
    //                 this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
    //                 this.profile.image = photo.url;
    //                 this.loading = false;
    //             }
    //         })
    //     } catch (error) {
    //         runInAction(() => this.loading = false);
    //         console.log(error);
    //     }
    // }

    // deletePhoto = async (photo: Photo) => {
    //     this.loading = true;
    //     try {
    //         await agent.Profiles.deletePhoto(photo.id);
    //         runInAction(() => {
    //             if (this.profile) {
    //                 this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
    //                 this.loading = false;
    //             }
    //         })
    //     } catch (error) {
    //         runInAction(() => this.loading = false);
    //         console.log(error);
    //     }
    // }

    loadUserJobs = async (username: string, predicate?: string) => {
        this.loadingUserJobs = true;
        try {
            const jobs = await agent.Profiles.listUserJobs(username, predicate!);
            runInAction(() => {
                this.userJobs = jobs;
                this.loadingUserJobs = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingUserJobs = false);
        }
    }

    loadUserListings = async (username: string, predicate?: string) => {
        this.loadingUserListings = true;
        try {
            const listings = await agent.Profiles.listUserListings(username, predicate!);
            runInAction(() => {
                this.userListings = listings;
                this.loadingUserListings = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingUserListings = false);
        }
    }

    loadUserCompanies = async (username: string, predicate?: string) => {
        this.loadingUserCompanies = true;
        try {
            const companies = await agent.Profiles.listUserCompanies(username, predicate!);
            runInAction(() => {
                this.userCompanies = companies;
                this.loadingUserCompanies = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingUserCompanies = false);
        }
    }

    
}
