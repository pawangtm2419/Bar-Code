import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeComponent } from './qr-code.component';

const routes: Routes = [
  {path: '', component: QrCodeComponent}
];

@NgModule({
  declarations: [
    QrCodeComponent
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class QrCodeModule { }
