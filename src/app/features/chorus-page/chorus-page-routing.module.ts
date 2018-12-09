import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MinesweeperComponent} from '../minesweeper/minesweeper.component';
import {PageContainerComponent} from './page-container/page-container.component';

const routes: Routes = [
  {
    path: 'chorus-page',
    pathMatch: 'full',
    component: PageContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChorusPageRoutingModule { }
