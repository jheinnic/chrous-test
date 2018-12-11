import {InjectionToken, NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {PageContainerComponent} from './page-container/page-container.component';
import {getQueryParamGuardProvider} from '../../shared/guards/get-query-param-guard-provider.function';
import {getOnEntryQueryParamGuardProvider} from '../../shared/guards/get-on-entry-query-param-guard-provider.function';
import {TranscriptResolver} from './guards/transcript-resolver.resolver';
import {CatalogLoaderResolver} from './guards/catalog-loader.resolver';

const idRequiredGuard: InjectionToken<CanActivate> =
  new InjectionToken<CanActivate>('IdRequiredGuard<id>');

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [idRequiredGuard],
    resolve: {
      catalogPreload: CatalogLoaderResolver
    },
    component: PageContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    getOnEntryQueryParamGuardProvider(idRequiredGuard, 'id'),
    TranscriptResolver,
    CatalogLoaderResolver
  ],
  exports: [RouterModule]
})
export class ChorusPageRoutingModule { }
