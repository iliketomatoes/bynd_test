import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Routes
import { ROUTES } from './app.routing';

import {
	removeNgStyles,
	createNewHosts,
	createInputTransfer
} from '@angularclass/hmr';

import { ENV_PROVIDERS } from './environment';

// Angular material design 2
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist';
import { VideoComponent, VideoService } from './video';
import { NoContentComponent } from './no-content';

import '../styles/app.scss';

// Application wide providers
const APP_PROVIDERS = [
	// ...APP_RESOLVER_PROVIDERS,
	AppState
];

type StoreType = {
	state: InternalStateType,
	restoreInputValues: () => void,
	disposeOldHosts: () => void
};

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(ROUTES),
		FormsModule,
		MaterialModule
	],
	declarations: [
		AppComponent,
		LoginComponent,
		PlaylistComponent,
		VideoComponent,
		NoContentComponent
	],
	bootstrap: [AppComponent],
	providers: [
		ENV_PROVIDERS,
		APP_PROVIDERS,
		VideoService
	]
})
export class AppModule {
	constructor(
		public appRef: ApplicationRef,
		public appState: AppState
	) { }

	public hmrOnInit(store: StoreType) {
		if (!store || !store.state) {
			return;
		}
		console.log('HMR store', JSON.stringify(store, null, 2));
		// set state
		this.appState._state = store.state;
		// set input values
		if ('restoreInputValues' in store) {
			let restoreInputValues = store.restoreInputValues;
			setTimeout(restoreInputValues);
		}

		this.appRef.tick();
		delete store.state;
		delete store.restoreInputValues;
	}

	public hmrOnDestroy(store: StoreType) {
		const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
		// save state
		const state = this.appState._state;
		store.state = state;
		// recreate root elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}

	public hmrAfterDestroy(store: StoreType) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}
}
