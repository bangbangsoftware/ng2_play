export class StoryItem {
  constructor(public title: string, public description: string, public points:number, public acs: Array<string>) {
  }
}

export class Quote  {
  constructor(public text: string) {
  }
}
