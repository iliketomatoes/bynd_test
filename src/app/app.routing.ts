import { Routes } from '@angular/router';

import { PlaylistComponent }   from './playlist';
import { VideoComponent }   from './video';

export const ROUTES: Routes = [
	{
		path: '',
		redirectTo: 'playlist/1',
		pathMatch: 'full'
	},

	{
		path: 'playlist/:page',
		component: PlaylistComponent
	},

	{
		path: 'video/:id',
		component: VideoComponent
	}
];
