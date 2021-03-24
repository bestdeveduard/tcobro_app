import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.page.html',
  styleUrls: ['./calculator-form.page.scss'],
})
export class CalculatorFormPage implements OnInit {

  capital; interes; cuotas; modalidad
  calc_val = 0;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  calculate() {
    if (this.modalidad && this.cuotas) {
      this.calc_val = (this.capital * this.interes) / (100 * Number(this.modalidad)) + this.capital / this.cuotas
    }    
  }

}
