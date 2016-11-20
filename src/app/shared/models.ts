// First building for a sprint, maybe needs Epic and brain storm
export class StoryItem {
    constructor(public title: string, public colour:string,  public descriptionAs: string, public descriptionWant: string, public descriptionThat: string, public points: number, public acs: Array < string > , public tasks: Array < Task > ) {}
}


// Tasks with Skilli, timelogs etc
export class Task {
    constructor(public title: string, public description: string, public assigned: Member, public subTask: Task, public timeLog: Array<TimeLog>, public skills: Array<Skill>) {}
}
export class Skill {
    constructor(public title: string, public description) {}
}
export class TimeLog {
    constructor(public created:Date, public hoursLeft: number, public hoursSpent: number,member:Member, comments: string, githash: string){}
}


// Countdown to events like demos, major releases etc...
export class Countdown {
    constructor(public title: string, public description, date: Date) {}
}


// Users with Roles, Skills and avaliablity
export class Member {
    constructor(public name: string, public role: Role, public email: string, public skills: Array<Skill>) {}
}
export class Role {
    constructor(public name: string) {}
}
export class Absent {
    constructor(public member: Member,from: Date, to: Date, comments: string) {}
}

// Technical stack with associated test frameworks
// Eg angular...
export class Tech{
    constructor(public name: string, deployment: Deployment) {}
}
export class Deployment{ // Linked to a script to deploy somehow
    constructor(public name){}
}
export class Bug{
    constructor(public tech: Tech, title: string, description: string, assigned: Member, state: BugState) {}
}
export class BugState { 
    constructor(public name: string) {}
} 
export class Stack {
    constructor(public tech:Tech, order: number, test: Test) {}
}
export class Test{ // Linked to a script to test somehow
    constructor(public name){}
}


// ????
export class Quote {
    constructor(public text: string) {}
}
