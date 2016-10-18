export class Task {
    constructor(public title: string, public description: string, public assigned: Member, public subTask: Task) {}
}

export class StoryItem {
    constructor(public title: string, public colour:string,  public descriptionAs: string, public descriptionWant: string, public descriptionThat: string, public points: number, public acs: Array < string > , public tasks: Array < Task > ) {}
}

export class Member {
    constructor(public name: string, public role: Role, public email: string) {}
}

export class Role {
    constructor(public name: string) {}
}

export class Quote {
    constructor(public text: string) {}
}
