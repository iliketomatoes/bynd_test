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

	// Array containing all videos
	public playlist: any[];

	// Array containing only visible videos
	public page: any[];

	/**
	 * Dumb helper array needed for the the pagination,
	 * since *ngFor loop needs an iterable object to loop through.
	 * That means a simple number is not enough.
	 * The length of this array is equal to the number of total pages.
	 */
	public pages: number[];

	// Helpers variables needed in the view for "prev" and "next" pagination buttons
	public isFirstPage = true;
	public isLastPage = false;

	private routeSubscription: ISubscription;

	// Index of current page
	private currentPage: number;

	constructor(
		public videoService: VideoService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	public ngOnInit(): void {

		// Get the videos
		this.videoService.getVideos().subscribe(
			(videos) => {
				this.playlist = videos;
				this.pages = Array(Math.round(videos.length / 5));

				// Get the param from the route in order to know what page to show
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

		// Get the videos to show
		this.page = this.playlist.slice(index, (index + 5));

		// Update helpers variables for "next" and "prev" pagination buttons
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
