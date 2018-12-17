import {Store} from '@ngrx/store';
import * as fromCoreLayout from '../../core/store/reducers/layout.reducer';
import {NGXLogger} from 'ngx-logger';
import {
  AfterContentInit, ChangeDetectionStrategy, Component, Input, ViewEncapsulation
} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';
import {DialogConfiguration} from './dialog-configuration.interface';

@Component({
  selector: 'cai-register-modal',
  templateUrl: './modal-registration.component.html',
  styleUrls: [ './modal-registration.component.scss' ],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalRegistrationComponent implements AfterContentInit
{
  private titlePortal: CdkPortal;

  private staticContentPortal: CdkPortal;

  private scrollingContentPortal: CdkPortal;

  @Input()
  public config?: DialogConfiguration;

  constructor(
    private store: Store<fromCoreLayout.State>,
    private logger: NGXLogger)
  {
  }

  public ngAfterContentInit(): void
  {
  }

  public injectTitle(titlePortal: CdkPortal)
  {
    this.titlePortal = titlePortal;
  }

  public injectStaticContent(staticContentPortal: CdkPortal)
  {
    this.staticContentPortal = staticContentPortal;
  }

  public injectScrollingContent(scrollingContentPortal: CdkPortal)
  {
    this.scrollingContentPortal = scrollingContentPortal;
  }
}
