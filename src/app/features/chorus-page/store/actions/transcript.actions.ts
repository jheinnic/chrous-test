import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TranscriptRecord } from '../models/transcript.model';

export enum TranscriptActionTypes {
  LoadTranscripts = '[TranscriptRecord] Load TranscriptRecords',
  AddTranscript = '[TranscriptRecord] Add TranscriptRecord',
  UpsertTranscript = '[TranscriptRecord] Upsert TranscriptRecord',
  AddTranscripts = '[TranscriptRecord] Add TranscriptRecords',
  UpsertTranscripts = '[TranscriptRecord] Upsert TranscriptRecords',
  UpdateTranscript = '[TranscriptRecord] Update TranscriptRecord',
  UpdateTranscripts = '[TranscriptRecord] Update TranscriptRecords',
  DeleteTranscript = '[TranscriptRecord] Delete TranscriptRecord',
  DeleteTranscripts = '[TranscriptRecord] Delete TranscriptRecords',
  ClearTranscripts = '[TranscriptRecord] Clear TranscriptRecords'
}

export class LoadTranscripts implements Action {
  readonly type = TranscriptActionTypes.LoadTranscripts;

  constructor(public payload: { transcripts: TranscriptRecord[] }) {}
}

export class AddTranscript implements Action {
  readonly type = TranscriptActionTypes.AddTranscript;

  constructor(public payload: { transcript: TranscriptRecord }) {}
}

export class UpsertTranscript implements Action {
  readonly type = TranscriptActionTypes.UpsertTranscript;

  constructor(public payload: { transcript: TranscriptRecord }) {}
}

export class AddTranscripts implements Action {
  readonly type = TranscriptActionTypes.AddTranscripts;

  constructor(public payload: { transcripts: TranscriptRecord[] }) {}
}

export class UpsertTranscripts implements Action {
  readonly type = TranscriptActionTypes.UpsertTranscripts;

  constructor(public payload: { transcripts: TranscriptRecord[] }) {}
}

export class UpdateTranscript implements Action {
  readonly type = TranscriptActionTypes.UpdateTranscript;

  constructor(public payload: { transcript: Update<TranscriptRecord> }) {}
}

export class UpdateTranscripts implements Action {
  readonly type = TranscriptActionTypes.UpdateTranscripts;

  constructor(public payload: { transcripts: Update<TranscriptRecord>[] }) {}
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
