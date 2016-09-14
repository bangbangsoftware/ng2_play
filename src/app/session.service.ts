import { Injectable, Output, EventEmitter } from '@angular/core';
import { StoryItem, Member } from './shared';

@Injectable()
export class SessionService {

    titleChangeEvent: EventEmitter < string > = new EventEmitter < string > (true);
    stories: Array < StoryItem > = new Array < StoryItem > ();
    team: Array < Member > = new Array < Member > ();

    removeStory(item: StoryItem) {
        this.stories.splice(this.stories.indexOf(item), 1);
    }
    add(story: StoryItem) {
        this.stories.push(story);
    }
    getStories() {
        return this.stories;
    }

    moveStory(old_index, new_index) {
        if (new_index >= this.stories.length) {
            var k = new_index - this.stories.length;
//            while ((k--) + 1) {
//                this.stories.push(undefined);
//            }
        }
        this.stories.splice(new_index, 0, this.stories.splice(old_index, 1)[0]);
        return this.stories; // for testing purposes
    }

    moveUp(i) {
        this.moveStory(i,i-1);
    }
    moveDown(i) {
        this.moveStory(i,i+1);
    }

    constructor() {
        console.log("Hello from %cSession", "font-size:300%; color:orange");
    }

    setTitle(title) {
        console.log("broadcasted title as " + title);
        this.titleChangeEvent.emit(title);
    }

    getChanger() {
        return this.titleChangeEvent;
    }

}
