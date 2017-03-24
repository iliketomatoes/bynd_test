import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

@Component({
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

	constructor(public router: Router) { }

	public ngOnInit() {
		// TODO
	}
}
