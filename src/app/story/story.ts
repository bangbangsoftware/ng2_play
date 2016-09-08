import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StoryItem } from '../shared';
import { SessionService } from '../session.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
    storyID: number;
    back:string;
    ac;

    constructor(fb: FormBuilder, private session: SessionService,private route: ActivatedRoute, private router: Router) {
        this.fb = fb;
        this.session.add(new StoryItem('Write a story', 'Should be able to input a story', -1, ["Should be able to do list of acceptance criteria"]));
        this.session.add(new StoryItem('Order a story', 'Should be able to move a story up and down the backlog', -1, ["This backlog should keep its order"]));
        this.session.add(new StoryItem('Assign Points', 'Should be able to assign points to a story', -1, ["Story should keep their points"]));
        this.session.add(new StoryItem('Write tasks', 'Should be able to add sub tasks to a story', -1, ["The sub tasks should be associated with the story"]));
        this.session.add(new StoryItem('Create team', 'Should be able to enter team members', -1, ["a team member should have a role - dev,po or scrum master"]));
        this.session.add(new StoryItem('Write defintion of done', 'Should be able to enter dod', -1, ["This be broken down for the lifecycle of a feature"]));

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
        console.log('story component woke....');
        this.storyID = this.route.snapshot.params['storyID'];
        this.back = this.route.snapshot.params['back'];
         if (this.storyID){
             this.editStory(this.session.getStories()[this.storyID]);       
        }
    }

    buttonFocus(){
        this.ac.focus();
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
            if (this.back){
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
