import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VideoService } from '../video/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';

@Component({
	templateUrl: 'playlist.component.html',
	styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

	public playlist: any[];
	public page: any[];
	public pages: number[];

	private routeSubscription: ISubscription;

	constructor(public videoService: VideoService, private route: ActivatedRoute) { }

	public ngOnInit(): void {

		this.videoService.getVideos().subscribe(
			(videos) => {
				this.playlist = videos;
				this.pages = Array(Math.round(videos.length / 5));

				this.routeSubscription = this.route.params
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

	public ngOnDestroy() {
		this.routeSubscription.unsubscribe();
	}

	private populatePage(page: number) {
		let index = (page - 1) * 5;
		this.page = this.playlist.slice(index, (index + 5));
	}
}
