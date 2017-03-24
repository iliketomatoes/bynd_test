import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';

const videoURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,
contentDetails,status&maxResults=
10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw`;

@Injectable()
export class VideoService {
	constructor(private http: Http) { }

	public getVideos(): Observable<any> {
		return this.http
			.get(videoURL)
			.catch((error: any) => {
				return this.handleError(error);
			})
			.map((resp: Response) => resp.json().items);
	}

	public getVideo(id: string): Observable<any> {
		return this.getVideos().map((videos: any) => {
			let video = videos.find((item, index, arr) => {
				return item.snippet.resourceId.videoId === id;
			});
			return video;
		});
	}

	protected extractData(res: Response) {
		let body = res.json();
		return body.data || {};
	}

	protected handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			errMsg = `${error.status} Lemonzie RestService - ${error.toString()}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(error);
	}
}
