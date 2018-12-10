import {isArray} from 'util';
import {
  ArrayNotEmpty, IsArray, IsDefined, IsHexColor, IsInt, IsNotEmpty, IsPositive, IsUUID, ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';

export class Video {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  readonly id: string;

  @IsNotEmpty()
  @IsDefined()
  readonly title: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Speaker)
  readonly speakers: ReadonlyArray<ISpeaker>;

  @IsDefined()
  @ValidateNested()
  @Type(() => VideoResolution)
  readonly resolution: IVideoResolution;

  constructor(base: Partial<IVideo> = {}, overrides: Partial<IVideo> = {}) {
    Object.assign(this, base, overrides);
  }
}

export class Speaker {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  readonly id: string;

  @IsNotEmpty()
  @IsDefined()
  readonly displayName: string;

  @IsNotEmpty()
  @IsDefined()
  readonly transcriptKey: string;

  @IsNotEmpty()
  @IsDefined()
  @IsHexColor()
  readonly highlightColor: string;

  constructor(base: Partial<ISpeaker> = {}, overrides: Partial<ISpeaker> = {}) {
    Object.assign(this, base, overrides);
  }
}

export class VideoResolution {
  @IsPositive()
  @IsDefined()
  @IsInt()
  readonly height: number;

  @IsPositive()
  @IsDefined()
  @IsInt()
  readonly width: number;

  constructor(base: Partial<IVideoResolution> = {}, overrides: Partial<IVideoResolution> = {}) {
    Object.assign(this, base, overrides);
  }
}

export interface IVideo extends Video { }

export interface ISpeaker extends Speaker { }

export interface IVideoResolution extends VideoResolution { }

export interface TranscriptEntry {
  snippet: string;
  speaker: string;
  time: number;
}

export type Transcript = Array<TranscriptEntry>

export function isTranscriptEntry(body: object): body is TranscriptEntry {
  return (
    body.hasOwnProperty('snippet') &&
    body.hasOwnProperty('speaker') &&
    body.hasOwnProperty('time')
  );
}

export function isTranscript(body: object): body is Transcript
{
  if (isArray(body)) {
    return body.every(isTranscriptEntry);
  }

  return false;
}
