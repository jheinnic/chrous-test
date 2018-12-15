import {InitialPositionStrategy} from './initial-position-strategy.enum';
import {MixedContentHandlingStrategy} from './mixed-content-handling-strategy.interface';
import {ModalRegistrationComponent} from './modal-registration.component';
import {InjectionToken} from '@angular/core';

export class ModalTypeConfiguration {
  readonly identifier: InjectionToken<ModalRegistrationComponent>;

    /**
     * Maximum region of viewport dialog should accept if available.
     */
    readonly maxDialogWidth;

  /**
   * Maximum region of viewport dialog should accept if available.
   */
  readonly maxDialogHeight;

  /**
   * Minimum region of viewport dialog must receive before breaking to a
   * full-page vertical List that fills the entire region that would be
   * masked by an overlay (whether or not an overlay is used).
   */
  readonly minDialogWidth;

  /**
   * Minimum region of viewport dialog must receive before breaking to a
   * full-page vertical List that fills the entire region that would be
   * masked by an overlay (whether or not an overlay is used).
   */
  readonly minDialogHeight;

  /**
   * True if an overlay is requested; false otherwise.
   */
  readonly useOverlayMask: boolean;
    /**
     *
     */
    readonly positioningStrategy: InitialPositionStrategy;

  /**
   * If both a scrolling and a static content block is present; describe how they
   * are to be combined by supplying an instance of a MixedTypeConfiguration.  There
   * are three strategy types available.  IF one or no content types are used; then
   * this property should be left undefined.
   */
  readonly mixedContentStrategy?: MixedContentHandlingStrategy;
}
