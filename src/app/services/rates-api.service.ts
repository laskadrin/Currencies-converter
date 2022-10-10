import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatesApiService {
  ratesToShow: [string, string, string] = ["USD", "EUR", "UAH"];

  rates = new Map();

  constructor() { }

  async getCurrencies() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
    const data = await response.json();
    const currenciesInfo = await data;

    this.ratesToShow.slice(0, -1).forEach((rateName) => {

      this.rates.set(rateName, currenciesInfo.find((currency: any) => currency.cc == rateName).rate.toFixed(2));

    })
    return this.rates;
  }
  refreshingGetCurrencies() {
    this.getCurrencies();
    const obs$ = interval(600000);
    obs$.subscribe(() => this.getCurrencies())
  }
}
