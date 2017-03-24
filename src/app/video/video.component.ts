import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'video',
	templateUrl: 'video.component.html',
	styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

	public video: any;

	public ngOnInit(): void {
		// TODO
	}

}
