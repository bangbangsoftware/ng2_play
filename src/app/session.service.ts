import { Injectable, Output, EventEmitter } from '@angular/core';
import { StoryItem } from './shared';

@Injectable()
export class SessionService {

    titleChangeEvent: EventEmitter<string> = new EventEmitter<string>(true);
    private stories: Array<StoryItem> = new Array <StoryItem>();
    removeStory(item:StoryItem){
        this.stories.splice(this.stories.indexOf(item), 1);
    }
    add(story:StoryItem){
        this.stories.push(story);
    }
    getStories(){
        return this.stories;
    }

    listeners = {};

    constructor() {
       console.log("Hello from %cSession","font-size:300%; color:orange");
    }


    setTitle(title){
       console.log("broadcasted title as "+title);      
       this.titleChangeEvent.emit(title);
    }

    getChanger(){
       return this.titleChangeEvent;
    }

    subscribe(name, fn) {
        console.log("subscribed to "+name);    
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(fn);
        console.log(this.listeners);
    }

    fire(name, value) {
        console.log(this.listeners);
        const list = this.listeners[name];
        if (list) {
            list.forEach((fn) => {
                if (fn) {
                    fn(value);
                }
            });
        } else {
            console.error("There is no listeners for " + name);
        }
    }

}
