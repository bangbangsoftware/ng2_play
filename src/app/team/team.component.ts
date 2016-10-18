import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SessionService } from '../session.service';
import { Role, Member } from '../shared';

@Component({
  selector: 'app-team',
  templateUrl: 'team.component.html',
  styleUrls: ['team.component.css']
})
export class TeamComponent implements OnInit {

  roleMap: {[key:string]:Role} = {};
  roles: Array<Role> = new Array<Role>();
  teamForm: FormGroup;
  newRole: string;
  newEmail: FormControl;
  newName: FormControl;

  mapItOut(){
    this.roles.map((role)=>{      
       this.roleMap[role.name] = role;
    });
  }

  constructor(private fb: FormBuilder, private session: SessionService) { 
      this.roles.push(new Role("Product Owner"));
      this.roles.push(new Role("Scrum Master"));
      this.roles.push(new Role("Tester"));
      this.roles.push(new Role("Front end dev"));
      this.roles.push(new Role("Back end dev"));
      this.roles.push(new Role("UX"));
      this.roles.push(new Role("Trainer"));
      this.roles.push(new Role("Operation"));
      this.mapItOut();


      this.newName = new FormControl('', Validators.required);
      this.newEmail = new FormControl('', Validators.required);
      this.newRole = "";
      this.teamForm = this.fb.group({
         'newName': this.newName,
         'newEmail': this.newEmail
      });


  }

  pickRole(value){
     this.newRole = value;     
  }

  ngOnInit() {
  }

  onSubmit() {
      const name = this.newName.value;
      const role = this.roleMap[this.newRole];    
      const email = this.newEmail.value;
      this.session.team.push(new Member(name,role,email));
      this.newName.setValue("");
      this.newEmail.setValue("");
      this.newRole = "";
  }

  removeMember(i) {
      this.session.team.splice(i, 1);
  }

  editMember(i){
      const memb = this.session.team[i];    
      this.newName.setValue(memb.name);
      this.newEmail.setValue(memb.email);
      this.newRole = memb.role.name;
  }

}
