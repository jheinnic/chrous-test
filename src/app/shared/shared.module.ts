import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PortalModule} from '@angular/cdk/portal';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatGridListModule,
  MatDialogModule,
  MatCardModule,
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
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    PortalModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    // ColorPickerModule
  ],
  declarations: [ ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    PortalModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
  ]
})
export class SharedModule {
}
