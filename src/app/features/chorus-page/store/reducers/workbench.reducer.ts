import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import * as Immutable from 'immutable';

import * as fromTranscript from './transcript.reducer';
import * as fromVideoMeta from './video-meta.reducer';
import {
  SetCatalogVideoSelection, VideoWorkbenchActionTypes, WorkbenchActions
} from '../actions/workbench.actions';
import {
  CombinedVideo, DecoratedTranscript, DialogActivity, OpenDocumentContext, RenderReadySpeaker,
  StateAvailability, VideoWorkbench
} from '../models/workbench.model';
import {Speaker, VideoMetadata} from '../models/video-meta.model';
import {TranscriptEntry, TranscriptRecord} from '../models/transcript.model';
import {from, Observable} from 'rxjs';
import {endWith, filter, map, scan, toArray} from 'rxjs/operators';

export const initialState: VideoWorkbench = {
  catalogLoadState: StateAvailability.UNAVAILABLE,
  viewTranscriptDialogState: DialogActivity.INACTIVE,
  viewTranscriptTarget: undefined,
  openVideoDocs: Immutable.Map<string, OpenDocumentContext>(),
  openTranscripts: Immutable.Map<string, OpenDocumentContext>(),
  selectedVideoId: '',
};

export type State = {
  workbench: {
    initialState: VideoWorkbench;
  }
}

export const featureKey = 'video-workbench';

export function reducer(state = initialState, action: WorkbenchActions): VideoWorkbench
{
  switch (action.type) {

    case VideoWorkbenchActionTypes.RequestVideoCatalogCommand:
      return {
        ...state,
        catalogLoadState: StateAvailability.LOADING
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

    case VideoWorkbenchActionTypes.SetViewTranscriptTargetVideoId:
    {
      return {
        ...state,
        viewTranscriptDialogState: DialogActivity.OPENING,
        viewTranscriptTarget: action.payload.id
      }
    }

    case VideoWorkbenchActionTypes.ClearViewTranscriptTargetVideoId:
    {
      return {
        ...state,
        viewTranscriptDialogState: DialogActivity.INACTIVE,
        viewTranscriptTarget: undefined
      }
    }

    case VideoWorkbenchActionTypes.SetCatalogVideoSelection:
    {
      return {
        ...state,
        selectedVideoId: action instanceof SetCatalogVideoSelection ? action.payload.id : undefined
      }
    }

    case VideoWorkbenchActionTypes.ClearCatalogVideoSelection:
    {
      return {
        ...state,
        selectedVideoId: undefined
      }
    }

    case VideoWorkbenchActionTypes.RequestVideoMetadataCommand:
    {
      return {
        ...state,
        openVideoDocs: state.openVideoDocs.set(
          action.payload.id,
          {
            ...action.payload,
            availability: StateAvailability.LOADING
          }
        )
      };
    }

    case VideoWorkbenchActionTypes.ReleaseVideoMetadataCommand:
    {
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

    case VideoWorkbenchActionTypes.VideoMetadataLoadCompleted:
    {
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

    case VideoWorkbenchActionTypes.VideoMetadataFailedToLoad:
    {
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

    case VideoWorkbenchActionTypes.VideoMetadataReleased:
    {
      return {
        ...state,
        openVideoDocs: state.openVideoDocs.delete(
          action.payload.id,
        )
      };
    }

    case VideoWorkbenchActionTypes.RequestTranscriptCommand:
    {
      return {
        ...state,
        openTranscripts: state.openTranscripts.set(
          action.payload.id,
          {
            ...action.payload,
            availability: StateAvailability.LOADING
          }
        )
      };
    }

    case VideoWorkbenchActionTypes.ReleaseTranscriptCommand:
    {
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

    case VideoWorkbenchActionTypes.TranscriptLoadCompleted:
    {
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

    case VideoWorkbenchActionTypes.TranscriptFailedToLoad:
    {
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

    case VideoWorkbenchActionTypes.TranscriptReleased:
    {
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

function combineFragments(
  videoId: string, metas: Dictionary<VideoMetadata>,
  transcripts: Dictionary<TranscriptRecord>): undefined|CombinedVideo
{
  if (! videoId) {
    return undefined;
  }

  const videoMetadata: Partial<VideoMetadata> =
    !!metas ? (
      metas[videoId] || {}
    ) : {};
  const transcript: Partial<TranscriptRecord> =
    !!transcripts ? (
      transcripts[videoId] || {}
    ) : {};

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
    [
      selectSelectedVideoId,
      fromVideoMeta.selectEntities,
      fromTranscript.selectEntities
    ],
    combineFragments
  );

export const selectViewTranscriptVideoId =
  createSelector(
    selectVideoWorkbenchFeatureState, (state) => state.viewTranscriptTarget
  );

export const selectViewTranscriptVideo =
  createSelector(
    [
      selectViewTranscriptVideoId,
      fromVideoMeta.selectEntities,
      fromTranscript.selectEntities
    ],
    combineFragments
  );

function decorateTranscriptForDisplay(transcriptMetaCombo: CombinedVideo): undefined | Observable<DecoratedTranscript>
{
  interface Accumulator
  {
    lastSpeaker: string,
    previousValue: Array<TranscriptEntry> /* N-2nd accumulator */
    currentValue: Array<TranscriptEntry>  /* N-1th accumulator */
  }

  if (!transcriptMetaCombo || !transcriptMetaCombo.speakers || !transcriptMetaCombo.transcript) {
    return undefined;
  }

  // Build up a Map of Speaker Metadata by SpeakerKey for consolidation as we sort out
  // consecutive runs.
  const speakerMap: Map<string, RenderReadySpeaker> = transcriptMetaCombo.speakers.reduce(
    function (map: Map<string, RenderReadySpeaker>, speaker: Speaker) {
      map.set(speaker.transcriptKey, {
        displayName: speaker.displayName,
        transcriptKey: speaker.transcriptKey,
        inlineStyle: {
          color: speaker.highlightColor
        }
      });
      return map;
    },
    new Map<string, RenderReadySpeaker>()
  );

  // Map the list of all entries plus a trailing null into the list of all consecutive
  // pairs and perform a reducing scan on the result.  The accumulator in this case has
  // two slots representing accumulations for the (N-1)th and (N-2)nd elements before
  // the current one.  If the N-1th and N-2nd elements belonged to the same speaker,
  // they will be in a list together at the slot for N-1, and the N-2nd element will
  // be empty.  IF they had different speakers, the N-2nd element will have the
  // accumulated snippets for the previous speaker.
  // On each iteration, compare current speaker to speaker in slot N-1.  If they are
  // identical, Nth element is appended to list in N-1th slot, and N-2 slot is empty.
  // Otherwise, N-1th element is placed in N-2 and current element begins a new list
  // in slot N-1.
  // The extra null at the end of the list ensures no elements will be lost in the
  // next sweep, which filters out any accumulated result from the scan with an empty
  // value in slot N-2, and returns aggregated MultiSnippet block for anything with
  // 1 or more elements in slot N-2.
  return from(transcriptMetaCombo.transcript.entries)
    .pipe(
      endWith(undefined),
      scan(
        function (acc: Accumulator, key: TranscriptEntry): Accumulator {
          if (!acc) {
            return {
              lastSpeaker: key.speaker,
              previousValue: undefined,
              currentValue: [key]
            };
          } else if (!key) {
            return {
              lastSpeaker: undefined,
              previousValue: acc.currentValue,
              currentValue: undefined
            };
          } else if (key.speaker === acc.lastSpeaker) {
            return {
              lastSpeaker: acc.lastSpeaker,
              previousValue: undefined,
              currentValue: [...acc.currentValue, key]
            };
          }
          return {
            lastSpeaker: key.speaker,
            previousValue: acc.currentValue,
            currentValue: [key]
          };
        }, undefined as Accumulator),
      filter((candidate) => !!candidate.previousValue),
      map((singleSpeakerRun) => {
        const snippetList = singleSpeakerRun.previousValue;
        let speaker: RenderReadySpeaker =
          speakerMap.get(
            snippetList[0].speaker);
        if (!!speaker) {
          console.warn('Caution: filling in blanks for an unmatched speaker!');
          speaker = {
            displayName: '',
            transcriptKey: '',
            inlineStyle: {
              color: ''
            }
          };
        }
        return {
          ...speakerMap.get(
            snippetList[0].speaker
          ),
          snippets: snippetList.map((entry) => entry.snippet),
          snippetCount: snippetList.length
        };
      }),
      toArray(),
      map((entries) => {
        return {
          id: transcriptMetaCombo.id,
          title: transcriptMetaCombo.title,
          width: transcriptMetaCombo.resolution.width,
          height: transcriptMetaCombo.resolution.height,
          entries
        };
      })
    );
}

export const selectDecoratedViewTranscriptVideo =
  createSelector(selectViewTranscriptVideo, decorateTranscriptForDisplay);

export const selectViewTranscriptAvailability =
  createSelector(
    selectVideoWorkbenchFeatureState,
    (state) => state.viewTranscriptDialogState);

export const selectOpenVideoMetadata =
  createSelector(selectVideoWorkbenchFeatureState, (state) => state.openVideoDocs);

export const selectOpenTranscripts =
  createSelector(selectVideoWorkbenchFeatureState, (state) => state.openTranscripts);

