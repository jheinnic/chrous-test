import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Transcript } from '../models/transcript.model';

export enum TranscriptActionTypes {
  LoadTranscripts = '[Transcript] Load Transcripts',
  AddTranscript = '[Transcript] Add Transcript',
  UpsertTranscript = '[Transcript] Upsert Transcript',
  AddTranscripts = '[Transcript] Add Transcripts',
  UpsertTranscripts = '[Transcript] Upsert Transcripts',
  UpdateTranscript = '[Transcript] Update Transcript',
  UpdateTranscripts = '[Transcript] Update Transcripts',
  DeleteTranscript = '[Transcript] Delete Transcript',
  DeleteTranscripts = '[Transcript] Delete Transcripts',
  ClearTranscripts = '[Transcript] Clear Transcripts'
}

export class LoadTranscripts implements Action {
  readonly type = TranscriptActionTypes.LoadTranscripts;

  constructor(public payload: { transcripts: Transcript[] }) {}
}

export class AddTranscript implements Action {
  readonly type = TranscriptActionTypes.AddTranscript;

  constructor(public payload: { transcript: Transcript }) {}
}

export class UpsertTranscript implements Action {
  readonly type = TranscriptActionTypes.UpsertTranscript;

  constructor(public payload: { transcript: Transcript }) {}
}

export class AddTranscripts implements Action {
  readonly type = TranscriptActionTypes.AddTranscripts;

  constructor(public payload: { transcripts: Transcript[] }) {}
}

export class UpsertTranscripts implements Action {
  readonly type = TranscriptActionTypes.UpsertTranscripts;

  constructor(public payload: { transcripts: Transcript[] }) {}
}

export class UpdateTranscript implements Action {
  readonly type = TranscriptActionTypes.UpdateTranscript;

  constructor(public payload: { transcript: Update<Transcript> }) {}
}

export class UpdateTranscripts implements Action {
  readonly type = TranscriptActionTypes.UpdateTranscripts;

  constructor(public payload: { transcripts: Update<Transcript>[] }) {}
}

export class DeleteTranscript implements Action {
  readonly type = TranscriptActionTypes.DeleteTranscript;

  constructor(public payload: { id: string }) {}
}

export class DeleteTranscripts implements Action {
  readonly type = TranscriptActionTypes.DeleteTranscripts;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTranscripts implements Action {
  readonly type = TranscriptActionTypes.ClearTranscripts;
}

export type TranscriptActions =
 LoadTranscripts
 | AddTranscript
 | UpsertTranscript
 | AddTranscripts
 | UpsertTranscripts
 | UpdateTranscript
 | UpdateTranscripts
 | DeleteTranscript
 | DeleteTranscripts
 | ClearTranscripts;
