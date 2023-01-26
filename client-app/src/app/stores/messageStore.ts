import { makeAutoObservable, runInAction } from 'mobx';
import { Message } from "../model/Message";
import { store } from './store';


export default class MessageStore {
    messages: Message[] = [];

    constructor() {
        makeAutoObservable(this);
    }

}