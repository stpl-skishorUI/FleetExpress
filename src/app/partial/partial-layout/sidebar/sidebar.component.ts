import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus: any = [];
  sidebarMenu=new Array();
  lightIcon: any;
  lightIcon1: any;
  constructor(public sidebarservice: SidebarService, public sharedService: SharedService) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit(): void {
    this.sharedService.getTheme().subscribe((res: any) => {
      res ? this.lightIcon = res : this.lightIcon = localStorage.getItem('themeColor');
    })
    this.getSidebarData();
  }
  getSidebarData(){
    let data:any=localStorage.getItem('loggedInData');
    this.sidebarMenu=JSON.parse(data).responseData2;
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu: any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element: any) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
