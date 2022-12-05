import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit  {

  stringData = 'qrCode';

  constructor() {}

  ngOnInit(): void {
    console.log('Pawan Kumar Gautam');
  }

  createQRCode() {
    console.log(this.stringData);
    //BEGIN:VCARDVERSION:3.0N:Jaiswal;RachitFN:Rachit JaiswalORG:Augmented Transformations Pvt LtdTITLE:Product ManagerADR:;;;Pune;;;IndiaTEL;WORK;VOICE:TEL;CELL:7985042017TEL;FAX:EMAIL;WORK;INTERNET:rachit.jaiswal@augtrans.comURL:augtrans.comEND:VCARD
  }

}
