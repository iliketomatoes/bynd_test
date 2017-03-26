import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
	public isFirstPage = true;
	public isLastPage = false;

	private routeSubscription: ISubscription;
	private currentPage: number;

	constructor(
		public videoService: VideoService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	public ngOnInit(): void {

		this.videoService.getVideos().subscribe(
			(videos) => {
				console.log(videos[0]);
				this.playlist = videos;
				this.pages = Array(Math.round(videos.length / 5));

				this.routeSubscription = this.route.params
					.switchMap((params: Params) => {
						return Observable.of(params);
					})
					.subscribe((param) => {
						this.currentPage = +param.page;
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

	public goToNext() {
		if (!this.isLastPage) {
			let nextPage = (this.currentPage) + 1;
			this.router.navigate(['/playlist', nextPage]);
		}
	}

	public goToPrev() {
		if (!this.isFirstPage) {
			let prevPage = this.currentPage - 1;
			this.router.navigate(['/playlist', prevPage]);
		}
	}

	private populatePage(page: number) {
		let index = (page - 1) * 5;
		this.page = this.playlist.slice(index, (index + 5));
		if (page === 1) {
			this.isFirstPage = true;
			this.isLastPage = false;
		} else {
			if (page === this.pages.length) {
				this.isFirstPage = false;
				this.isLastPage = true;
			} else {
				this.isFirstPage = false;
				this.isLastPage = false;
			}
		}
	}
}
