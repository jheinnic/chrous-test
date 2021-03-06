import {combineLatest, Observable, SubscribableOrPromise} from 'rxjs';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';

export function muteFirst<T>(
  fromRemote$: SubscribableOrPromise<any>,
  fromStore$: SubscribableOrPromise<T>
): Observable<T>
{
  return combineLatest(fromRemote$, fromStore$)
    .pipe(
      map((pair: [any, T]): T => pair[1]),
      tap((value) => { console.log('muteFirst', value);}),
  distinctUntilChanged(),
    );
}
