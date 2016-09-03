import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

import { FORM_DIRECTIVES } from '@angular/forms'; 

import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

@Component({
  selector: 'app-points',
  templateUrl: './app/points/points.component.html',
  styleUrls: ['./app/points/points.component.css'],
  providers: [MdUniqueSelectionDispatcher]
})
export class PointsComponent implements OnInit {
  session:SessionService;
  storyPoints: number;

  constructor(session:SessionService) { 
     this.session = session;     
  }

  ngOnInit() {
  }

  showTasks(sp){
    console.log(sp);
    console.log("I DRANK TOO MUCH!!!!");
  }

}
