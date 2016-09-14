import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

declare var Auth0Lock;

@Component({
    selector: 'app-root',
    templateUrl: './app/app.html',
    styleUrls: ['./app/app.css'],
    providers: [SessionService]
})
export class AppComponent {
    //    lock = new Auth0Lock('T1wdQrDposGW5BisaKViC0Cu9CuxtR0c', 'towfeek.eu.auth0.com');
    lock = new Auth0Lock('jBd29779Oe3mrUOEugibMfAfGDnU6qIG', 'tardi.auth0.com');
    jwtHelper: JwtHelper = new JwtHelper();
    location: Location;
    ngZone: NgZone;
    router: Router;
    title: string = "Story Creation";

    constructor(location: Location, ngZone: NgZone, router: Router, private session: SessionService) {
        this.location = location;
        this.ngZone = ngZone;
        this.router = router;
        console.log("subscribing to title change");
        const what = session.titleChangeEvent.subscribe(title => this.titleChanged(title));
        console.log(what);
        const where = this.location.path();
        this.title = this.determineTitle(where);
    }

    titleChanged(title) {
        console.log("title changed to " + title);
        this.title = title;
    }

    login() {
        var self = this;
        this.lock.show((err: string, profile: string, id_token: string) => {
            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

            console.log(
                this.jwtHelper.decodeToken(id_token),
                this.jwtHelper.getTokenExpirationDate(id_token),
                this.jwtHelper.isTokenExpired(id_token)
            );

            this.ngZone.run(() => self.loggedIn());
        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');

        this.loggedIn();
    }

    loggedIn() {
        return tokenNotExpired();
    }

    isActive(path) {
        return this.location.path() === path;
    }

    titles = {
        '/points': "Story Points",
        '/order': "Putting the stories in order",
        '/team': "Define the team"
    };

    determineTitle(where) {
        const result = this.titles[where];
        if (result) {
            return result;
        }

        return "Story Creation";
    }

    team(sidenav) {
       this.closeAndGo(sidenav,'/team');    
    }

    create(sidenav) {
       this.closeAndGo(sidenav,'/story');    
    }

    order(sidenav) {
       this.closeAndGo(sidenav,'/order');    
    }

    points(sidenav) {
       this.closeAndGo(sidenav,'/points');    
    }

    closeAndGo(sidenav,path){    
       sidenav.close();
       this.router.navigate([path]);
       this.title = this.determineTitle(path);
    }

}
