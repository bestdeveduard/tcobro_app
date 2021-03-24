import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { format } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  options: CalendarComponentOptions = {
    from: new Date('2010-01-01')
  };
  type: 'string';

  months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  date = new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  isSelected: boolean = false;
  selectedDateVal: string;
  displayDateVal: string

  constructor(
    private modalCtrl: ModalController
  ) {    
    this.isSelected = true;
    this.selectedDateVal = format(new Date(), "yyyy-MM-dd");
    this.displayDateVal = format(new Date(), "dd/MM/yyyy");

    this.date.getDay();
    this.date.getMonth();
    this.date.getDate();
    this.currentDate = this.weeks[this.date.getDay()] + ', ' + this.months[this.date.getMonth()] + ' ' + this.date.getDate();  //this.date.toDateString().substr(0, this.date.toDateString().lastIndexOf(' '));
    this.currentYear = this.date.getFullYear();
    console.log('formated date == ', this.currentDate)
  }

  ngOnInit() {    
    
  }

  onChange($event) {
    console.log('date == ', $event._d)
    var ddd = new Date($event._d);
    this.selectedDateVal = format(new Date($event._d), "yyyy-MM-dd");
    this.displayDateVal = format(new Date($event._d), "dd/MM/yyyy");
    // this.currentDate = ddd.toDateString().substr(0, ddd.toDateString().lastIndexOf(' '))//format(new Date(), "w, MMM dd");
    this.currentDate = this.weeks[ddd.getDay()] + ', ' + this.months[ddd.getMonth()] + ' ' + ddd.getDate();
    this.currentYear = ddd.getFullYear();
  }

  ngAfterViewInit() {
    this.monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    // this.getDaysOfMonth();
  }

  getDaysOfMonth() {   
    
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    
    // if(this.date.getMonth() === new Date().getMonth()) {
    //   this.currentDate = new Date().getDate();
    // }
  
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    console.log("-----------aaaaaaa---------", firstDayThisMonth, prevNumOfDays);
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
  
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < ( 6 - lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = ( 7 - lastDayThisMonth ); i < (( 7 - lastDayThisMonth ) + 7 ); i++) {        
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth(day?) {    
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
    if (day) {
      this.selectDate(day);
    } else {
      this.selectDate(this.currentDate);
    }
  }

  goToNextMonth(day?) {    
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
    if (day) {
      this.selectDate(day);
    } else {
      this.selectDate(this.currentDate);
    }
  }

  selectDate(day) {    
    this.currentDate = day;
    var selectedDate = this.date.getFullYear() + (this.date.getMonth() + 1 > 9 ? "-" + (this.date.getMonth() + 1) : "-0" + (this.date.getMonth() + 1)) + (+day > 9 ? '-' + day : "-0" + day);
    console.log('select date == ', selectedDate)
    this.isSelected = true;
    this.selectedDateVal = selectedDate;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  complete() {
    this.modalCtrl.dismiss({realDate: this.selectedDateVal, displayDate: this.displayDateVal}, 'select-date');
  }  

}
