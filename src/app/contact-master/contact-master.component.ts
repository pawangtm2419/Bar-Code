import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { ToasterService } from '../toster.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-contact-master',
  templateUrl: './contact-master.component.html',
  styleUrls: ['./contact-master.component.css']
})
export class ContactMasterComponent implements OnInit {
  qrCodeSize: number = 350;
  stringData: any;
  qrData: any;
  listData: any;
  searchData: any;
  pageData = 1;
  limits = [{ key: '50', value: 50 }, { key: '100', value: 100 }, { key: '250', value: 250 }, { key: '500', value: 500 }];
  limit: any = 50;
  isExcelDownload: boolean = false;
  id: any;

  constructor( private common: AppService, private toster: ToasterService) { }

  ngOnInit(): void {
    this.getDataList();
    this.qrData = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      faxNumber: new FormControl(''),
      phoneNumber: new FormControl(''),
      contactNumber: new FormControl(''),
      email: new FormControl(''),
      companyName: new FormControl(''),
      jobProfile: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pinCode: new FormControl(''),
      webSite: new FormControl('')
    });
  }

  createQRCode() {
    let contdata = this.qrData.value;
    let keys = Object.keys(contdata);
    let match: any = {};
    keys.forEach((item: any) => {
      if(contdata[item]) {
        match[item] = contdata[item];
      }
    });
    this.common.createContact(match).subscribe((res: any) => {
      if(res.status) {
        this.toster.success(res.message, "Success");
      } else {
        this.toster.error(res.message, "Error");
      }
    }),
    (error: any) => {
      this.toster.error(`Technical issue ${error}`, "Error");
    };
  }

  getDataList(): void {
    this.common.getContactList().subscribe((res: any) => {
      if(res.status) {
        this.listData = res.data;
        this.isExcelDownload = true;
        this.limits = [{ key: 'ALL', value: this.listData.length }];
        this.toster.success(res.message, "Success");
      } else {
        this.toster.error(res.message, "Error");
      }
    }),
    (error: any) => {
      this.toster.error(`Technical issue ${error}`, "Error");
    };
  }

  viewQRCode(data: number): void {
    this.stringData = `http://172.16.15.21/contact-master/${data}`;
    this.id = data;
  }

  qrSize(data: any) {
    this.qrCodeSize = data.value;
  }

  refresh(): void {
    this.ngOnInit();
  }

  dataLimit(): void{
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "customerReport.xlsx");
  }

}
