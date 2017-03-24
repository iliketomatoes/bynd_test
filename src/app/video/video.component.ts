import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from './video.service';

@Component({
	templateUrl: 'video.component.html',
	styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

	public video: any;
	public url: SafeResourceUrl;
	public baseUrl: string = 'https://www.youtube.com/embed/';

	constructor(
		public videoService: VideoService,
		private route: ActivatedRoute,
		private location: Location,
		private sanitizer: DomSanitizer) { }

	public ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.videoService.getVideo(params['id']))
			.subscribe((video) => {
				this.video = video;
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.snippet.resourceId.videoId);
			});
	}

	public goBack(): void {
		this.location.back();
	}
}
