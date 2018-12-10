import {isArray} from "util";

export interface TranscriptEntry
{
  readonly snippet: string;
  readonly speaker: string;
  readonly time: number;
}

export interface Transcript {
  readonly id: string;
  readonly entries: ReadonlyArray<TranscriptEntry>
}

export function isTranscriptEntry(body: object): body is TranscriptEntry
{
  return (
    body.hasOwnProperty('snippet') &&
    body.hasOwnProperty('speaker') &&
    body.hasOwnProperty('time')
  );
}

export function isTranscript(body: object): body is Transcript
{
  if (
    (body.hasOwnProperty('id')) &&
    (body.hasOwnProperty('entries')) &&
    isArray(body['entries'])
  ) {
    return body['entries'].every(isTranscriptEntry);
  }

  return false;
}
