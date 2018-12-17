import {InjectionToken, NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {PageContainerComponent} from './page-container/page-container.component';
import {getQueryParamGuardProvider} from '../../shared/guards/get-query-param-guard-provider.function';
import {getOnEntryQueryParamGuardProvider} from '../../shared/guards/get-on-entry-query-param-guard-provider.function';
import {CatalogLoaderResolver} from './guards/catalog-loader.resolver';
import {TiledPageContainerComponent} from './tiled-page-container/tiled-page-container.component';
import {LinkedPageContainerComponent} from './linked-page-container/linked-page-container.component';

const idRequiredGuard: InjectionToken<CanActivate> =
  new InjectionToken<CanActivate>('IdRequiredGuard<id>');

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [idRequiredGuard],
    component: PageContainerComponent
  },
  {
    path: 'tiled',
    pathMatch: 'full',
    canActivate: [],
    component: TiledPageContainerComponent
  },
  {
    path: 'linked',
    pathMatch: 'full',
    canActivate: [],
    component: LinkedPageContainerComponent
  },
  {
    path: '**',
    redirectTo: '/linked',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    getOnEntryQueryParamGuardProvider(idRequiredGuard, 'id'),
    CatalogLoaderResolver
  ],
  exports: [RouterModule]
})
export class ChorusPageRoutingModule { }
