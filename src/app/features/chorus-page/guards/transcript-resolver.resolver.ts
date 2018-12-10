import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {isTranscript, Transcript} from '../store/models/videos.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {chorusApiUrl} from '../../../shared/di/config-di.tokens';
import {Inject} from '@angular/core';
import {filter, take} from 'rxjs/operators';

export class TranscriptResolver implements Resolve<Transcript> {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(chorusApiUrl) private readonly chorusApiUrl: string) {

  }
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Transcript> | Promise<Transcript> | Transcript
  {
    const videoId = route.queryParamMap.get('id');

    return this.httpClient.get(
      `${this.chorusApiUrl}/${videoId}.json`,
      {
        observe: 'body',
        responseType: 'json'
      }
    ).pipe(
      take(1),
      filter(isTranscript)
    );
  }
}
