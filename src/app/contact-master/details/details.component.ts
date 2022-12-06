import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToasterService } from '../../toster.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any;
  contactData: any;

  constructor(private toster: ToasterService, private route: ActivatedRoute, private service: AppService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getData(this.id);
  }

  getData(match: number): void {
    this.service.getContactDetails(match).subscribe((res: any) => {
      if(res.status) {
        this.contactData = res.data;
        this.toster.success(res.message, "Success");
      } else {
        this.toster.error(res.message, "Error");
      }
    }),
    (error: any) => {
      this.toster.error(`Technical issue ${error}`, "Error");
    };
  }

}
