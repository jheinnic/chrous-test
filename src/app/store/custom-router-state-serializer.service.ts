import {RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';

import {RouterStateModels} from './models';
import RouterStateUrl = RouterStateModels.RouterStateUrl;


export class CustomRouterStateSerializerService
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const {/*queryParams, params,*/ queryParamMap, paramMap, data} = routerState.root;

    return {url, /*queryParams, params,*/ queryParamMap, paramMap, data};
  }
}
