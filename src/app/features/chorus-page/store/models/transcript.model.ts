import {isArray} from "util";

export interface TranscriptRecord
{
  readonly id: string;
  readonly transcript: Transcript;
}

export interface Transcript
{
  readonly entries: ReadonlyArray<TranscriptEntry>
}

export interface TranscriptEntry
{
  readonly snippet: string;
  readonly speaker: string;
  readonly time: number;
}

export function isTranscriptEntry(body: object): body is TranscriptEntry
{
  return body.hasOwnProperty('snippet') &&
    body.hasOwnProperty('speaker') &&
    body.hasOwnProperty('time');
}

export function isTranscript(body: object): body is Transcript
{
  if (
    body.hasOwnProperty('id') &&
    body.hasOwnProperty('entries') &&
    isArray(body['entries'])
  ) {
    return body['entries'].every(isTranscriptEntry);
  }

  return false;
}

export function isTranscriptRecord(body: object): body is TranscriptRecord
{
  return body.hasOwnProperty('id') &&
    body.hasOwnProperty('transcript');
}
