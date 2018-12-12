import {Required} from 'simplytyped';

export interface VideoMetadata
{
  readonly id: string;
  readonly title: string;
  readonly speakers: ReadonlyArray<Speaker>;
  readonly resolution: VideoResolution;
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

