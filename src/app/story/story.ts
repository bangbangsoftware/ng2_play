import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StoryItem } from '../shared';
import { SessionService } from '../session.service';

@Component({
    selector: 'story',
    viewProviders: [FormBuilder],
    templateUrl: './app/story/story.html',
    styleUrls: ['./app/story/story.css']
})
export class Story implements OnInit {

    fb: FormBuilder;
    myForm: FormGroup;
    newTitle: FormControl;
    newDescription: FormControl;
    newAC: FormControl;
    acs: Array < string > ;
    needAcs: boolean;

    constructor(fb: FormBuilder, private session: SessionService) {
        this.fb = fb;
        this.session.add(new StoryItem('Write a story', 'Should be able to input a story', -1, ["Should be able to do list of acceptance criteria"]));

        this.newTitle = new FormControl('', Validators.required);
        this.newDescription = new FormControl('', Validators.required);
        this.acs = [];
        this.newAC = new FormControl("");
        this.needAcs = false;
        this.myForm = this.fb.group({
            'newTitle': this.newTitle,
            'newDescription': this.newDescription
        });
    }

    ngOnInit(): void {
        console.log('story component woke');
    }

    removeStory(item: StoryItem) {
        this.session.removeStory(item);
    }

    editStory(item: StoryItem) {
        this.newTitle.updateValue(item.title);
        this.newDescription.updateValue(item.description);
        this.newAC.updateValue("");
        this.acs = item.acs;
        this.needAcs = false;
    }

    clearStory() {
        //    this.newAC = new FormControl("");
        this.myForm.reset();
        this.acs = [];
        this.needAcs = false;
    }

    onSubmit(): void {
        this.addCriteria();
        if (this.acs.length === 0) {
            this.needAcs = true;
        } else if (this.myForm.valid) {
            this.session.add(new StoryItem(this.newTitle.value, this.newDescription.value, -1, this.acs));
            this.clearStory();
        }
    }

    removeCriteria(i): void {
        this.acs.splice(i, 1);
    }

    checkAC(): void {
        if (this.newAC.value) {
            this.needAcs = false;
        }
    }

    addCriteria(): void {
        if (this.newAC.value) {
            this.acs.push(this.newAC.value);
            this.newAC = new FormControl("");
        }
    }

    tab(e) {
        if (e.keyCode == 9) { // press tab 
            //el.focus();
            this.addCriteria();    
            var ul = e.target.parentNode;
            console.log(ul);
            ul.focus();
            console.log(ul);
            //ul.lastChild.querySelector('acceptance').focus();
        }
    }

}
