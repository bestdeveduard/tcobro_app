import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-change-route',
  templateUrl: './change-route.page.html',
  styleUrls: ['./change-route.page.scss'],
})
export class ChangeRoutePage implements OnInit {

  selected_route;
  routes = []

  constructor(
    public navCtrl: NavController,
    private comService: CommonService,
    private api: ApiService,
    private storage: Storage
  ) { }

  ngOnInit() {
    
  }

  async ngAfterViewInit() {
    await this.comService.presentLoading()
    if (this.comService.networkStatus == 'off') {
      this.storage.get(`all_routes_${this.comService.currentUser.business_id}`).then(routes => {
        this.comService.hideLoading();
        if (routes) {
          this.routes = routes;
        }
      });
    } else {      
      this.api.requestPostData('getRoutes', { business_id: this.comService.currentUser.business_id }).subscribe(result => {
        console.log('routes == ', result);
        this.comService.hideLoading();
        if (result.status == 200) {
          this.routes = result.all_routes;
          this.storage.set(`all_routes_${this.comService.currentUser.business_id}`, this.routes);
        }
      });
    }
  }

  selectRoute(route) {    
    this.comService.route_id = this.selected_route = route.id
    this.comService.route_name = route.name;
    this.comService.selected_route = route
    setTimeout(() => {
      this.navCtrl.navigateForward('tabs/home')
    }, 700);
  }

}
