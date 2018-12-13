import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {filter, map, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {isTranscript, TranscriptRecord} from '../store/models/transcript.model';
import {chorusApiUrl} from '../../../shared/di/config-di.tokens';
import {VideoWorkbenchService} from '../services/video-workbench.service';
import {VideoItem} from '../store';
import {Dictionary} from '@ngrx/entity';
import {chorusVideoApiClient, videoWorkbenchService} from '../chorus-page-di.tokens';

@Injectable()
export class CatalogLoaderResolver implements Resolve<Dictionary<VideoItem>>
{
  constructor(
    @Inject(videoWorkbenchService) private readonly catalogService: VideoWorkbenchService)
  {
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Dictionary<VideoItem>> | Promise<Dictionary<VideoItem>> | Dictionary<VideoItem>
  {
    const videoId = route.queryParamMap.get('id');

    return this.catalogService.selectVideoDictionary$.pipe(
      tap((dictionary: Dictionary<VideoItem>) => {
        console.log(`Resolver pre-loaded ${JSON.stringify(dictionary)}`);
      }),
      take(1)
    )
      .toPromise();
  }
}
