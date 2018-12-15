import {Store} from '@ngrx/store';
import * as fromCoreLayout from '../../core/store/reducers/layout.reducer';
import {NGXLogger} from 'ngx-logger';
import {AfterContentInit} from '@angular/core';
import {ModalTitleDirective} from './modal-title.directive';
import {CdkPortal} from '@angular/cdk/portal';

export class ModalRegistrationComponent implements AfterContentInit
{
  constructor(
    private store: Store<fromCoreLayout.State>,
    private logger: NGXLogger)
  {

  }



  public ngAfterContentInit(): void
  {
  }

  public injectTitle(title: CdkPortal)
  {

  }

  public injectStaticContent(title: CdkPortal)
  {

  }

  public injectScrollingContent(title: CdkPortal)
  {

  }
}
