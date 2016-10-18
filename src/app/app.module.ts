import { BrowserModule  } from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { AppComponent }   from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment} from './';
import { routing, appRoutingProviders } from './routes.ts';

import { enableProdMode } from '@angular/core';
//import { bind, provide } from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import {AuthGuard} from './';
import {DataService} from './shared';
//import {HTTP_PROVIDERS, Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { Story } from './story/story';
import { About } from './about';
import { Profile } from './profile';
import { OrderComponent } from './order/order.component';
import { PointsComponent } from './points/points.component';
import { TeamComponent } from './team/team.component';

if (environment.production) {
  enableProdMode();
}

@NgModule({
    declarations: [
      AppComponent,
      Story,
      About,
      Profile,
      OrderComponent,
      PointsComponent,
      TeamComponent
    ],
    providers: [
//      APP_ROUTER_PROVIDER,
//      bind(LocationStrategy).toClass(HashLocationStrategy),
//      provide(AuthConfig, { useFactory: () => {
//        return new AuthConfig();
//      }}),
//      AuthHttp,
      AuthGuard,
      DataService,
      appRoutingProviders        
    ],
    imports:      [
      BrowserModule,
      HttpModule, 
      ReactiveFormsModule,
      RouterModule,
      MaterialModule.forRoot(),
      routing
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
