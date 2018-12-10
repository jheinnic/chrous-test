import {FactoryProvider, inject, InjectionToken, Provider} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

export function getOnEntryQueryParamGuardProvider(
  injectionToken: InjectionToken<CanActivate>, paramName: string): FactoryProvider {
  return {
    provide: injectionToken,
    useFactory: (router: Router) => new OnEntryQueryParamGuard(router, paramName),
    deps: [Router]
  };
}

class OnEntryQueryParamGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly paramName: string) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    if (! route.queryParamMap.has(this.paramName)) {
      if ((Object.keys(route.queryParams).length > 0) !== window.location.href.includes('?')) {
        const url = new URL(window.location.href);
        this.router.navigateByUrl(url.pathname + url.search);
      }

      return false;
    }

    return true;
  }
}
