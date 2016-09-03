import { provideRouter, RouterConfig } from '@angular/router';

import { Story } from './story/story';
import { About } from './about';
import { Profile } from './profile';
import { OrderComponent } from './order/order.component';
import { PointsComponent } from './points/points.component';

import { AuthGuard} from './';

export const appRoutes: RouterConfig = [
	{ path: '', component: Story },
	{ path: 'about/:id', component: About },
    { path: 'profile', component: Profile, canActivate:[AuthGuard]},
	{ path: 'order', component: OrderComponent },
	{ path: 'points', component: PointsComponent }
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
