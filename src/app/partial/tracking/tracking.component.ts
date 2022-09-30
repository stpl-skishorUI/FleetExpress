import{Component,OnInit}from '@angular/core'
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CommanService } from 'src/app/services/comman.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { SharedService } from 'src/app/services/shared.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  popContent:any = "Hello World";
  lat: number = 52.488328;
  lng: number = 8.717017;
  totalVehicle:any;
  allVehiclelData:any[]=[];
  subscription !:Subscription;
  allRunningVehiclelData :any[]=[];
  allStoppedVehiclelData:any[]=[];
  allIdleVehiclelData :any[]=[];
  allOfflineVehiclelData :any[]=[];
  selectedIndex:any;
  selectedTab:any;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  searchContent = new FormControl();
  constructor(private sharedService:SharedService,
    private common:CommanService,
    private error:ErrorsService) { }

  ngOnInit(): void {
    this.sharedService.vehicleCount().subscribe({
      next: (ele: any) => {
       this.totalVehicle=ele.responseData.responseData2.totalRecords;
      }
    })
    this.getAllVehicleListData();
    this.setIndex(0)
  }
  ngAfterViewInit(){
    this.searchContent.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((x:any)=>{
      this.getAllVehicleListData();
    });
 }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
  selectionTab(lable: any) {
    this.selectedTab = lable;
  }

  getAllVehicleListData(){
    this.allVehiclelData=[]
    this.common.setHttp('get', 'tracking/get-vehicles-current-location?UserId='+this.common.getUserId()+'&VehicleNo='+ (!this.searchContent.value?'':this.searchContent.value)+'&GpsStatus=', true, false, false, 'vehicletrackingBaseUrlApi');
    this.subscription = this.common.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          res.responseData.map((x:any)=>{
            x.deviceDatetime=new Date(x.deviceDatetime);
          })
          
          this.allVehiclelData = res.responseData ;
          this.allRunningVehiclelData = res.responseData.filter((x:any)=> x.gpsStatus=='Running');
          this.allStoppedVehiclelData = res.responseData.filter((x:any)=> x.gpsStatus=='Stopped'); 
          this.allIdleVehiclelData = res.responseData.filter((x:any)=> x.gpsStatus=='Idle'); 
          this.allOfflineVehiclelData = res.responseData.filter((x:any)=> x.gpsStatus=='Offline');
        } else {
          if (res.statusCode != "404") {
            this.allVehiclelData=[];
            this.error.handelError(res.statusCode)
          }else  if (res.statusCode == "404"){
              this.allVehiclelData=[];
              this.error.handelError(res.statusCode)
          }
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    });
  }
  mapClicked(){
    
  }

}
