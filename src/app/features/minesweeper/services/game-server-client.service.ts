import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {BeginNewGame, EndCurrentGame, MinesweeperActions, ReportPlayerLoses, ReportPlayerWins} from '../store/minesweeper.actions';
import {merge, Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../store/minesweeper.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';

@Injectable()
export class GameServerClient {

  public constructor(store: Store<State>, actions: Actions<MinesweeperActions>)

  private ingress: Subject<MinesweeperActions> = new Subject<MinesweeperActions>();

  @Effect({dispatch: true})
  public readonly commandTap: Observable<MinesweeperActions> =
    actions.pipe(
      ofType(BeginNewGame),
      switchMap(
        () => {
          this.ingress.asObservable().pipe(
            takeUntil(
              merge(
                this.actions.pipe(
                  ofType(ReportPlayerLoses)
                ),
                this.actions.pipe(
                  ofType(ReportPlayerWins)
                ),
                this.actions.pipe(
                  ofType(EndCurrentGame)
                )
              )
            )
          );
        }
      )
    );

  // @Effect({dispatch: true})
  cancelGame(): void // Observable<MinesweeperActions>
  {
    this.ingress.next(
      new EndCurrentGame()
    );
  }
}
