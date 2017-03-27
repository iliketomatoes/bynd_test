import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { VideoService } from './video.service';

@Component({
	templateUrl: 'video.component.html',
	styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewChecked {

	public video: any;
	public url: string;
	public baseUrl = 'https://www.youtube.com/embed/';
	public queryParams = '?autoplay=1';

	private iframeRatio = .61;

	constructor(
		public videoService: VideoService,
		private route: ActivatedRoute,
		private el: ElementRef,
		private location: Location) { }

	public ngOnInit(): void {

		this.route.params
			.switchMap((params: Params) => this.videoService.getVideo(params['id']))
			.subscribe((video) => {
				this.video = video;
				this.url =
					this.baseUrl +
					video.snippet.resourceId.videoId +
					this.queryParams;
			});
	}

	public ngAfterViewChecked() {
		this.appendIframe();
	}

	// Remove iframe onResize event because we need to recalculate the size of it
	public onResize(event) {
		this.removeIframe();
	}

	// Go back to list of videos
	public goBack(): void {
		this.location.back();
	}

	private appendIframe() {
		let frameCtr = this.el.nativeElement.querySelector('.video__iframe');
		let alreadyExistingiframe = this.el.nativeElement.querySelector('iframe');

		if (frameCtr !== null && alreadyExistingiframe === null) {
			let frameWidth = frameCtr.offsetWidth;
			let iframe = document.createElement('iframe');
			iframe.style.border = 'none';
			iframe.width = frameWidth;
			iframe.height = Math.round(frameWidth * this.iframeRatio).toString(10);
			iframe.src = this.url;
			frameCtr.append(iframe);
		}
	}

	private removeIframe() {
		let frameCtr = this.el.nativeElement.querySelector('.video__iframe');
		let iframe = this.el.nativeElement.querySelector('iframe');

		if (frameCtr !== null && iframe !== null) {
			frameCtr.removeChild(iframe);
		}
	}
}
