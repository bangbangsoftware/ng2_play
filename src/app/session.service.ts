import {
    Injectable,
    Output,
    EventEmitter
} from '@angular/core';
import {
    Member,
    Role,
    Project,
    Skill,
    StoryGroup,
    StoryItem,
    Acceptance,
    Task
} from './shared/models';
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-authentication'));

@Injectable()
export class SessionService {
    public userDB;
    public projectDB;
    public project: Project;
    public user: Member;
    constructor() {
        console.log("Hello from %cSession", "font-size:300%; color:orange");
    }

    login(ua: string, pw: string) {
        this.userDB = this.setupPouch("users", ua, pw);
        this.projectDB = this.setupPouch("waterbear", ua, pw);
        const tester = this.testingSetup();

        this.userDB.get(tester.user._id + "").then(doc => {
            this.user = doc;
        }).catch(err => {
            if (err.status === 404) {
                this.userDB.put(tester.user).then(d => {
                    console.log("New user inserted");
                }).catch(err => console.log(err));
            }
        });

        //@Tempory
        this.projectDB.putUser("mick", {
            metadata: tester.user
        }).then(doc => {}).catch(err => console.log(err));

        this.projectDB.get(tester.project._id + "").then(doc => {
            this.project = doc;
        }).catch(err => {
            if (err.status === 404) {
                this.projectDB.put(tester.project).then(d => {
                    console.log("New project inserted");
                }).catch(err => console.log(err));

            }
        });

    }

    syncError(err) {
        console.log(err);
    }

    setupPouch(name, user, pw) {
        const remoteCoach = "http://localhost:5984/" + name;
        var pouchOpts = {
            skipSetup: true,
            live: true
        };
        var db = new PouchDB(remoteCoach, pouchOpts, this.syncError);
        //  db.login("admin", "jiraisshit").then(me => {
        db.login(user, pw).then(me => {
            // const opts = {
            //     live: true
            // };
            //db.sync(remoteCoach, opts, syncError);
        });
        return db;
    }

    testingSetup() {
        const scrumMaster = new Role("Scrum Master");
        const skills = new Array < Skill > ();
        const fred = new Member("0", "Fred", scrumMaster, "cick.marter@gmail.com", skills, 0);

        const backlogStories = new Array < StoryItem > ();
        backlogStories.push(new StoryItem('Write a story', 'yellow', 'a po', 'to be able to input a story', 'the project can get features', -1, [new Acceptance("Should be able to do list of acceptance criteria")], []));
        backlogStories.push(new StoryItem('Order a story', 'yellow', 'a po', 'to be able to move a story up and down the backlog', 'features are in correct order', -1, [new Acceptance("This backlog should keep its order")], []));
        backlogStories.push(new StoryItem('Assign Points', 'yellow', 'the team', 'to be able to assign points to a story', 'velocity can be estimated', -1, [new Acceptance("Story should keep their points")], []));
        backlogStories.push(new StoryItem('Write tasks', 'yellow', 'a scrum master', 'to be able to add sub tasks to a story', 'sprints can be planned', -1, [new Acceptance("The sub tasks should be associated with the story")], []));
        backlogStories.push(new StoryItem('Create team', 'yellow', 'the team', 'to be able to enter team members', 'members are up to date', -1, [new Acceptance("a team member should have a role - dev,po or scrum master")], []));
        backlogStories.push(new StoryItem('Write defintion of done', 'yellow', 'the team', 'to be able to enter dod', 'we can have confidence the story has now fully shipable artifacts', -1, [new Acceptance("This be broken down for the lifecycle of a feature")], []));

        const backlog = new StoryGroup("backlog", backlogStories);
        const stories = new Array < StoryGroup > ();
        const team = new Array < Member > ();
        team.push(fred);
        stories.push(backlog);

        const project = new Project("0", "Tardigrade", "The best way to manage agile development", stories, team);

        return {
            user: fred,
            project
        };
    }


}
