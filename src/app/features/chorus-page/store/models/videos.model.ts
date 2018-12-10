import {isArray} from 'util';

export interface Videos {
  id: string;
}

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
