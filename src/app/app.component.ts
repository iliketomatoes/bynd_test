import {
	Component,
	OnInit
} from '@angular/core';
import { AppState } from './app.service';

@Component({
	selector: 'app',
	template: `
		<header>
			<div class="row">
				<div class="small-12 columns">
					<h1>BYND playlist test</h1>
				</div>
			</div>
		</header>
		<main role="main">
			<router-outlet></router-outlet>
		</main>`,
		styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		public appState: AppState
	) { }

	// tslint:disable-next-line
	public ngOnInit() {
		console.log('Initial App State', this.appState.state);
	}
}
