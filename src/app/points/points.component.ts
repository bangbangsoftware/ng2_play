import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

import { FORM_DIRECTIVES } from '@angular/forms'; 

import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-points',
  templateUrl: './app/points/points.component.html',
  styleUrls: ['./app/points/points.component.css'],
  providers: [MdUniqueSelectionDispatcher]
})
export class PointsComponent implements OnInit {
  session:SessionService;
  storyPoints: number;
  listTasks: Array<boolean>; 

  constructor(session:SessionService, private router: Router) { 
     this.session = session;     
     this.listTasks = Array<boolean>(this.session.stories.length);
  }

  ngOnInit() {
  }

  showTasks(i,e){
     this.listTasks[i] = true;     
  }

  edit(i){
    this.router.navigate(['story/',i,'points']);
  }

  moveUp(i){
    this.session.moveUp(i);
  }

  moveDown(i){
    this.session.moveDown(i);
  }


}
