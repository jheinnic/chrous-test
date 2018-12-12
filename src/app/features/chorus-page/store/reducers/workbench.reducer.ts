import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import * as Immutable from 'immutable';

import * as fromTranscript from './transcript.reducer';
import * as fromVideoMeta from './video-meta.reducer';
import * as fromVideoItem from './video-item.reducer';
import {
  SetCatalogVideoSelection, VideoWorkbenchActionTypes, WorkbenchActions
} from '../actions/workbench.actions';
import {
  CombinedVideo,
  DialogAvailability, OpenDocumentContext, StateAvailability, VideoWorkbench
} from '../models/workbench.model';
import {VideoMetadata} from '../models/video-meta.model';
import {Transcript} from '../models/transcript.model';

export const initialState: VideoWorkbench = {
  catalogLoadState: StateAvailability.UNAVAILABLE,
  viewTranscriptDialogState: DialogAvailability.UNAVAILABLE,
  viewTranscriptTarget: undefined,
  openVideoDocs: Immutable.Map<string, OpenDocumentContext>( ),
  openTranscripts: Immutable.Map<string, OpenDocumentContext>( ),
  selectedVideoId: '',
};

export type State = {
  workbench: {
    initialState: VideoWorkbench;
  }
}

export const featureKey = 'video-workbench';

export function reducer(state = initialState, action: WorkbenchActions): VideoWorkbench {
  switch (action.type) {

    case VideoWorkbenchActionTypes.RequestVideoCatalogCommand:
      return {
        ...state,
        catalogLoadState: StateAvailability.SUBSCRIBING
      };

    case VideoWorkbenchActionTypes.ReleaseVideoCatalogCommand:
      return {
        ...state,
        catalogLoadState: StateAvailability.RELEASING
      };

    case VideoWorkbenchActionTypes.VideoCatalogLoadCompleted:
      return {
        ...state,
        catalogLoadState: StateAvailability.AVAILABLE
      };

    case VideoWorkbenchActionTypes.VideoCatalogReleased:
      return {
        ...state,
        catalogLoadState: StateAvailability.UNAVAILABLE
      };

    case VideoWorkbenchActionTypes.VideoCatalogFailedToLoad:
      return {
        ...state,
        catalogLoadState: StateAvailability.ERROR
      };

    case VideoWorkbenchActionTypes.OpenTranscriptBySelection: {
      return {
        ...state,
        viewTranscriptDialogState: DialogAvailability.OPENING,
        viewTranscriptTarget: state.selectedVideoId
      }
    }

    case VideoWorkbenchActionTypes.OpenTranscriptByVideoId: {
      return {
        ...state,
        viewTranscriptDialogState: DialogAvailability.OPENING,
        viewTranscriptTarget: action.payload.id
      }
    }

    case VideoWorkbenchActionTypes.SetCatalogVideoSelection: {
      return {
        ...state,
        selectedVideoId: action instanceof SetCatalogVideoSelection ? action.payload.id : undefined
      }
    }

    case VideoWorkbenchActionTypes.ClearCatalogVideoSelection: {
      return {
        ...state,
        selectedVideoId: undefined
      }
    }

    case VideoWorkbenchActionTypes.RequestVideoMetadataCommand: {
      return {
        ...state,
        openVideoDocs: state.openVideoDocs.set(
          action.payload.id,
          {
            ...action.payload,
            availability: StateAvailability.SUBSCRIBING
          }
        )
      };
    }

    case VideoWorkbenchActionTypes.ReleaseVideoMetadataCommand: {
      return {
        ...state,
        openVideoDocs: state.openVideoDocs.set(
          action.payload.id,
          {
            ...state.openVideoDocs.get(action.payload.id),
            availability: StateAvailability.RELEASING
          }
        )
      }
    }

    case VideoWorkbenchActionTypes.VideoMetadataLoadCompleted: {
      return {
        ...state,
        openVideoDocs: state.openVideoDocs.set(
          action.payload.id,
          {
            ...state.openVideoDocs.get(action.payload.id),
            availability: StateAvailability.AVAILABLE
          }
        )
      };
    }

    case VideoWorkbenchActionTypes.VideoMetadataFailedToLoad: {
      return {
        ...state,
        openVideoDocs: state.openVideoDocs.set(
          action.payload.id,
          {
            ...state.openVideoDocs.get(action.payload.id),
            availability: StateAvailability.ERROR
          }
        )
      };
    }

    case VideoWorkbenchActionTypes.VideoMetadataReleased: {
      return {
        ...state,
        openVideoDocs: state.openVideoDocs.delete(
          action.payload.id,
        )
      };
    }

    case VideoWorkbenchActionTypes.RequestTranscriptCommand: {
      return {
        ...state,
        openTranscripts: state.openTranscripts.set(
          action.payload.id,
          {
            ...action.payload,
            availability: StateAvailability.SUBSCRIBING
          }
        )
      };
    }

    case VideoWorkbenchActionTypes.ReleaseTranscriptCommand: {
      return {
        ...state,
        openTranscripts: state.openTranscripts.set(
          action.payload.id,
          {
            ...state.openTranscripts.get(action.payload.id),
            availability: StateAvailability.RELEASING
          }
        )
      }
    }

    case VideoWorkbenchActionTypes.TranscriptLoadCompleted: {
      return {
        ...state,
        openTranscripts: state.openTranscripts.set(
          action.payload.id,
          {
            ...state.openTranscripts.get(action.payload.id),
            availability: StateAvailability.AVAILABLE
          }
        )
      };
    }

    case VideoWorkbenchActionTypes.TranscriptFailedToLoad: {
      return {
        ...state,
        openTranscripts: state.openTranscripts.set(
          action.payload.id,
          {
            ...state.openTranscripts.get(action.payload.id),
            availability: StateAvailability.ERROR
          }
        )
      };
    }

    case VideoWorkbenchActionTypes.TranscriptReleased: {
      return {
        ...state,
        openTranscripts: state.openTranscripts.delete(
          action.payload.id
        )
      };
    }

    default:
      return state;
  }
}

export const selectVideoWorkbenchFeatureState =
  createFeatureSelector<VideoWorkbench>(featureKey);

export const selectCatalogAvailability =
  createSelector(selectVideoWorkbenchFeatureState, (state) => state.catalogLoadState);

function combineFragments(videoId: string, metas: Dictionary<VideoMetadata>, transcripts: Dictionary<Transcript>): CombinedVideo
{
  const videoMetadata: Partial<VideoMetadata> =
    !!metas ? (metas[videoId] || {}) : {};
  const transcript: Partial<Transcript> =
    !!transcripts ? (transcripts[videoId] || {}) : {};

  const retVal = {
    ...videoMetadata,
    ...transcript,
    id: videoId
  };
  console.log(retVal);
  return retVal;
}

export const selectSelectedVideoId =
  createSelector(selectVideoWorkbenchFeatureState, (state) => state.selectedVideoId);

export const selectSelectedVideo =
  createSelector(
    [selectSelectedVideoId,
      fromVideoMeta.selectEntities,
      fromTranscript.selectEntities],
    combineFragments
  );

export const selectViewTranscriptVideoId =
  createSelector(
    selectVideoWorkbenchFeatureState, (state) => state.viewTranscriptTarget
  );

export const selectViewTranscriptVideo =
  createSelector(
    [selectViewTranscriptVideoId,
      fromVideoMeta.selectEntities,
      fromTranscript.selectEntities],
    combineFragments
  );

export const selectViewTranscriptAvailability =
  createSelector(selectVideoWorkbenchFeatureState,
    (state) => state.viewTranscriptDialogState);

export const selectOpenVideoMetadata =
  createSelector(selectVideoWorkbenchFeatureState, (state) => state.openVideoDocs);

export const selectOpenTranscripts =
  createSelector(selectVideoWorkbenchFeatureState, (state) => state.openTranscripts);
