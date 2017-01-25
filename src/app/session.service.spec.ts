/* tslint:disable:no-unused-variable */
/* tslint:disable:all */
//import { addProviders, async, inject } from '@angular/core/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';

describe('Service: Session', () => {
    
    let fakeRouter : any = {};
    let fakeLocation : any = {};
    let fakeDirection : any = {};
        
    let service:any;    
    
    beforeEach(() => {
        service = new SessionService(fakeRouter,fakeLocation,fakeDirection);
    });

    it('should exists...', () => {
        expect(service).toBeTruthy();
    })

    it('should be able to tell if the app is logged in', () => {
        expect(service.isIn()).toBe(false);
    });
});
