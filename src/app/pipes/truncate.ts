import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'myTruncate'
})
export class TruncatePipe implements PipeTransform {
	public transform(value: string, limit: number = 160): string {
		return value.length > limit ? value.substring(0, limit) + '...' : value;
	}
}
