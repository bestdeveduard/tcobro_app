import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { CurrencyPipe } from "@angular/common";

@Pipe({
  name: 'myCurrency'
})
@Injectable({
  providedIn: 'root'
})
export class MyCurrencyPipe extends CurrencyPipe implements PipeTransform {

  constructor() {
    super("en");
  }

  transform(
    value: any,
    code = "USD",
    display = "symbol",
    digitsInfo = "1.2-2",
    locale = ""
  ): any {
    return super.transform(value, code, display, digitsInfo, locale);
  }

}
