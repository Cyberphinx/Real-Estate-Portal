import { makeAutoObservable } from 'mobx';
import { Message } from "../model/Message";


export default class MessageStore {
    messages: Message[] = [];

    constructor() {
        makeAutoObservable(this);
    }

}