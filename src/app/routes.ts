import { provideRouter, RouterConfig } from '@angular/router';

import { Story } from './story/story';
import { About } from './about';
import { Profile } from './profile';
import { OrderComponent } from './order/order.component';
import { PointsComponent } from './points/points.component';
import { TeamComponent } from './team/team.component';

import { AuthGuard} from './';

export const appRoutes: RouterConfig = [
	{ path: 'story/:storyID/:back', component: Story },
	{ path: 'story', component: Story },
	{ path: 'about/:id', component: About },
    { path: 'profile', component: Profile, canActivate:[AuthGuard]},
	{ path: 'order', component: OrderComponent },
	{ path: 'points', component: PointsComponent },
	{ path: 'team', component: TeamComponent }
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
