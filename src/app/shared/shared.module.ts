import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PortalModule} from '@angular/cdk/portal';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatTabsModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';

// import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    FlexLayoutModule,
    PortalModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    // ColorPickerModule
  ],
  declarations: [ ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    FlexLayoutModule,
    PortalModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
  ]
})
export class SharedModule {
}
