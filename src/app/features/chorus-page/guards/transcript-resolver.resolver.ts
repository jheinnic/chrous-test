import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Inject} from '@angular/core';
import {filter, map, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {isTranscript, Transcript} from '../store/models/transcript.model';
import {chorusApiUrl} from '../../../shared/di/config-di.tokens';

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

    console.log(`Resolver attempting to preload ${this.chorusApiUrl}/${videoId}`);

    return this.httpClient.get(
      `${this.chorusApiUrl}/${videoId}.json`,
      {
        observe: 'body',
        responseType: 'json'
      }
    ).pipe(
      map((value) => {return {id: '', entries: value}} ),
      take(1),
      tap((value) => {console.log(`Pre filter: ${JSON.stringify(value)}`); }),
      filter(isTranscript),
      tap((value) => {console.log(`Post filter: ${JSON.stringify(value)}`); }),
    );
  }
}
