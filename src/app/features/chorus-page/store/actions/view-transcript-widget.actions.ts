import { Action } from '@ngrx/store';

export enum ViewTranscriptWidgetActionTypes {
  LoadViewTranscriptWidgets = '[ViewTranscriptWidget] Load ViewTranscriptWidgets'
}

export class LoadViewTranscriptWidgets implements Action {
  readonly type = ViewTranscriptWidgetActionTypes.LoadViewTranscriptWidgets;
}

export type ViewTranscriptWidgetActions = LoadViewTranscriptWidgets;
