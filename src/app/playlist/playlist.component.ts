import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video/';
import 'rxjs/add/operator/switchMap';

@Component({
	templateUrl: 'playlist.component.html',
	styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

	public playlist: any[];

	constructor(public videoService: VideoService) {}

	public ngOnInit(): void {
		this.videoService.getVideos().subscribe(
			(resp) => {
				this.playlist = resp.items;
				console.log(this.playlist);
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
