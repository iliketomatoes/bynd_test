import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VideoService } from '../video/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
	templateUrl: 'playlist.component.html',
	styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

	public playlist: any[];
	public page: any[];
	public pages: number;

	constructor(public videoService: VideoService, private route: ActivatedRoute) { }

	public ngOnInit(): void {

		this.videoService.getVideos().subscribe(
			(videos) => {
				this.playlist = videos;
				this.pages = Math.round(videos / 5);

				this.route.params
					.switchMap((params: Params) => {
						return Observable.of(params);
					})
					.subscribe((param) => {
						this.populatePage(+param.page);
					});
			},
			(err) => {
				console.log(err);
			}
		);
	}

	private populatePage(page: number) {
		let index = (page - 1) * 5;
		this.page = this.playlist.slice(index, (index + 5));
	}
}
