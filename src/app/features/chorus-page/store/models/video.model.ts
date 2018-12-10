import {isArray} from 'util';
import {Omit, Required} from 'simplytyped';

export interface Video
{
  readonly id: string;
  readonly title: string;
  readonly needsMetadata: boolean;
  readonly speakers?: ReadonlyArray<Speaker>;
  readonly resolution?: VideoResolution;
}

export type VideoWithMetadata = Required<Video, 'speakers'|'resolution'>;

export function hasMetadata(video: Video): video is VideoWithMetadata
{
  return ! video.needsMetadata;
}

export interface Speaker
{
  readonly displayName: string;
  readonly transcriptKey: string;
  readonly highlightColor: string;
}

export interface VideoResolution
{
  readonly height: number;
  readonly width: number;
}

