import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StoryItem } from '../shared';
import { SessionService } from '../session.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'story',
    viewProviders: [FormBuilder],
    templateUrl: 'story.html',
    styleUrls: ['story.css'],
})
export class Story implements OnInit {

    fb: FormBuilder;
    storyForm: FormGroup;
    newTitle: FormControl;
    newDescriptionAs: FormControl;
    newDescriptionWant: FormControl;
    newDescriptionThat: FormControl;
    newColour: FormControl;
    newAC: FormControl;
    acs: Array < string > ;
    needAcs: boolean;
    storyID: number;
    back: string;
    ac;
    colours: Array < string > = ["yellow", "red", "blue", "orange", "black", "green", "white", "brown"];
    coloursClass: Array < string > = ["yellow", "red", "blue", "orange", "black", "green", "white", "brown"];
    selectedColour: number = 6;

    constructor(fb: FormBuilder, private session: SessionService, private route: ActivatedRoute, private router: Router) {
        this.fb = fb;
        this.session.addStory(new StoryItem('Write a story', 'yellow', 'a po', 'to be able to input a story','the project can get features', -1, ["Should be able to do list of acceptance criteria"], []));
        this.session.addStory(new StoryItem('Order a story', 'yellow', 'a po','to be able to move a story up and down the backlog', 'features are in correct order', -1, ["This backlog should keep its order"], []));
        this.session.addStory(new StoryItem('Assign Points', 'yellow', 'the team','to be able to assign points to a story','velocity can be estimated', -1, ["Story should keep their points"], []));
        this.session.addStory(new StoryItem('Write tasks', 'yellow', 'a scrum master', 'to be able to add sub tasks to a story', 'sprints can be planned', -1, ["The sub tasks should be associated with the story"], []));
        this.session.addStory(new StoryItem('Create team', 'yellow', 'the team','to be able to enter team members', 'members are up to date', -1, ["a team member should have a role - dev,po or scrum master"], []));
        this.session.addStory(new StoryItem('Write defintion of done', 'yellow', 'the team','to be able to enter dod', 'we can have confidence the story has now fully shipable artifacts', -1, ["This be broken down for the lifecycle of a feature"], []));

        this.newTitle = new FormControl('', Validators.required);
        this.newDescriptionAs = new FormControl('', Validators.required);
        this.newDescriptionWant = new FormControl('', Validators.required);
        this.newDescriptionThat = new FormControl('', Validators.required);
        this.newColour = new FormControl('white');
        this.acs = [];
        this.newAC = new FormControl("");
        this.needAcs = false;
        this.storyForm = this.fb.group({
            'newTitle': this.newTitle,
            'newDescriptionAs': this.newDescriptionAs,
            'newDescriptionWant': this.newDescriptionWant,
            'newDescriptionThat': this.newDescriptionThat,
            'newColour': this.newColour
        });

    }

    ngOnInit(): void {
        console.log('story component woke....');
        this.storyID = this.route.snapshot.params['storyID'];
        this.back = this.route.snapshot.params['back'];
        if (this.storyID) {
            this.editStory(this.session.getStories()[this.storyID]);
        }
        this.selectedColour = -1;
    }

    selectColour(c) {
        this.selectedColour = c;
        this.newColour.setValue(this.coloursClass[c]);
    }

    buttonFocus() {
        this.ac.focus();
    }

    removeStory(item: StoryItem) {
        this.session.removeStory(item);
    }

    editStory(item: StoryItem) {
        this.newTitle.setValue(item.title);
        this.newDescriptionAs.setValue(item.descriptionAs);
        this.newDescriptionWant.setValue(item.descriptionWant);
        this.newDescriptionThat.setValue(item.descriptionThat);
        this.newColour.setValue(item.colour);
        this.selectedColour = this.colours.indexOf(item.colour);
        this.newAC.setValue("");
        this.acs = item.acs;
        this.needAcs = false;
    }

    clearStory() {
        this.storyForm.reset();
        this.acs = [];
        this.needAcs = false;
    }

    onSubmit(): void {
        this.addCriteria();
        if (this.acs.length === 0) {
            this.needAcs = true;
        } else if (this.storyForm.valid) {
            this.session.addStory(new StoryItem(this.newTitle.value, this.newColour.value, this.newDescriptionAs.value, this.newDescriptionWant.value, this.newDescriptionThat.value, -1, this.acs, []));
            this.clearStory();
            if (this.back) {
                this.router.navigate([this.back]);
            }
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
            this.newAC.reset();
        }
    }

    tab(e) {
        if (e.keyCode == 9) { // press tab 
            this.addCriteria();
            this.ac = e.target.parentNode.firstElementChild;
        }
    }

}
