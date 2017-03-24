import { Routes } from '@angular/router';

import { PlaylistComponent }   from './playlist';
import { VideoComponent }   from './video';
import { LoginComponent }       from './login/login.component';

export const ROUTES: Routes = [
	{
		path: '',
		redirectTo: 'playlist',
		pathMatch: 'full'
	},

	{
		path: 'playlist',
		component: PlaylistComponent
	},

	{
		path: 'video/:id',
		component: VideoComponent
	},

	{
		path: 'login',
		component: LoginComponent
	}
];
