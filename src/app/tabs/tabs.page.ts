import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  home_img = "assets/footer_menu/home_no_Active.png";
  route_img = "assets/footer_menu/ruta_active.png";
  client_img = "assets/footer_menu/cliente_no_active.png";
  menu_img = "assets/footer_menu/menu_no_Active.png";

  constructor() {}

  changedTabs(event) {
    console.log('event == ', event.tab)
    if (event.tab == "home") {
      this.home_img = "assets/footer_menu/home_active.png";
      this.route_img = "assets/footer_menu/ruta_active.png";
      this.client_img = "assets/footer_menu/cliente_no_active.png";
      this.menu_img = "assets/footer_menu/menu_no_Active.png";
    } else if (event.tab == "route-view") {
      this.home_img = "assets/footer_menu/home_no_Active.png";
      this.route_img = "assets/footer_menu/ruta_no_active.png";
      this.client_img = "assets/footer_menu/cliente_no_active.png";
      this.menu_img = "assets/footer_menu/menu_no_Active.png";
    } else if (event.tab == "customer-report") {
      this.home_img = "assets/footer_menu/home_no_Active.png";
      this.route_img = "assets/footer_menu/ruta_active.png";
      this.client_img = "assets/footer_menu/cliente_active.png";
      this.menu_img = "assets/footer_menu/menu_no_Active.png";
    } else if (event.tab == "menu-view") {
      this.home_img = "assets/footer_menu/home_no_Active.png";
      this.route_img = "assets/footer_menu/ruta_active.png";
      this.client_img = "assets/footer_menu/cliente_no_active.png";
      this.menu_img = "assets/footer_menu/menu_active.png";
    } else {
      this.home_img = "assets/footer_menu/home_no_Active.png";
      this.route_img = "assets/footer_menu/ruta_active.png";
      this.client_img = "assets/footer_menu/cliente_no_active.png";
      this.menu_img = "assets/footer_menu/menu_no_Active.png";
    }
  }

}
