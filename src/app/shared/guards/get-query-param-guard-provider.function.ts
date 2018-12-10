import {FactoryProvider, inject, InjectionToken, Provider} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

export function getQueryParamGuardProvider(
  injectionToken: InjectionToken<CanActivate>, paramName: string): FactoryProvider {
  return {
    provide: injectionToken,
    useFactory: () => new QueryParamGuard(paramName),
  };
}

class QueryParamGuard implements CanActivate {
  constructor(private readonly paramName: string) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return route.queryParamMap.has(this.paramName);
  }
}
