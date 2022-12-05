import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit  {
  qrCodeSize: number = 350;
  stringData: any;
  qrData: any;

  constructor() {}

  ngOnInit(): void {
    this.qrData = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      faxNumber: new FormControl(''),
      phoneNumber: new FormControl(''),
      contactNumber: new FormControl(''),
      emailId: new FormControl(''),
      companyName: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pinCode: new FormControl(''),
      webSite: new FormControl('')
    });
  }

  createQRCode() {
    let contactDetails = this.qrData.value;
    // this.stringData = `BEGIN:VCARDVERSION:3.0N:Jaiswal;RachitFN:${contactDetails.name}ORG:Augmented Transformations Pvt LtdTITLE:Product ManagerADR:;;;Pune;;;IndiaTEL;WORK;VOICE:TEL;CELL:${contactDetails.contactNumber}TEL;FAX:EMAIL;WORK;INTERNET:rachit.jaiswal@augtrans.comURL:augtrans.comEND:VCARD`;
    this.stringData = `BEGIN:VCARDVERSION:3.0N:Jaiswal;RachitFN:Rachit JaiswalORG:Augmented Transformations Pvt LtdTITLE:Product ManagerADR:;;;Pune;;;IndiaTEL;WORK;VOICE:TEL;CELL:7985042017TEL;FAX:EMAIL;WORK;INTERNET:rachit.jaiswal@augtrans.comURL:augtrans.comEND:VCARD`;
    console.log(contactDetails);

  }

  qrSize(data: any) {
    this.qrCodeSize = data.value;
  }

}
