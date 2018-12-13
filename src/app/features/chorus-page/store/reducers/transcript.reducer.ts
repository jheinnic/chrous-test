import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';

import {TranscriptActions, TranscriptActionTypes} from '../actions/transcript.actions';
import {TranscriptRecord} from '../models/transcript.model';

export interface State extends EntityState<TranscriptRecord>
{
  // additional entities state properties
}

export const adapter: EntityAdapter<TranscriptRecord> = createEntityAdapter<TranscriptRecord>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: TranscriptActions
): State
{
  switch (action.type) {
    case TranscriptActionTypes.AddTranscript:
    {
      return adapter.addOne(action.payload.transcript, state);
    }

    case TranscriptActionTypes.UpsertTranscript:
    {
      return adapter.upsertOne(action.payload.transcript, state);
    }

    case TranscriptActionTypes.AddTranscripts:
    {
      return adapter.addMany(action.payload.transcripts, state);
    }

    case TranscriptActionTypes.UpsertTranscripts:
    {
      return adapter.upsertMany(action.payload.transcripts, state);
    }

    case TranscriptActionTypes.UpdateTranscript:
    {
      return adapter.updateOne(action.payload.transcript, state);
    }

    case TranscriptActionTypes.UpdateTranscripts:
    {
      return adapter.updateMany(action.payload.transcripts, state);
    }

    case TranscriptActionTypes.DeleteTranscript:
    {
      return adapter.removeOne(action.payload.id, state);
    }

    case TranscriptActionTypes.DeleteTranscripts:
    {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TranscriptActionTypes.LoadTranscripts:
    {
      return adapter.addAll(action.payload.transcripts, state);
    }

    case TranscriptActionTypes.ClearTranscripts:
    {
      return adapter.removeAll(state);
    }

    default:
    {
      return state;
    }
  }
}

export const featureKey = 'transcript';

export const selectTranscriptsFeatureState = createFeatureSelector<State>(
  featureKey);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectTranscriptsFeatureState);

// export const selectTranscriptIds = selectIds;
// export const selectTranscriptEntities = selectEntities;
// export const selectAllTranscripts = selectAll;
// export const selectTotalTranscripts = selectTotal;

// export const selectTranscriptEntity =
//   createSelector(selectTranscriptsFeatureState)
