import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatesApiService {
  ratesToShow: [string, string, string] = ['USD', 'EUR', 'UAH'];
  rates: { [name in string]: number } = {}

  constructor() { }

  async getCurrencies() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
    const data = await response.json();
    const currenciesInfo = await data;

    this.rates = {

      'EUR': currenciesInfo.find((currency: any) => currency.cc == 'USD').rate.toFixed(2),
      'USD': currenciesInfo.find((currency: any) => currency.cc == 'EUR').rate.toFixed(2),
      'UAH': 1
    }

  }
  refreshingGetCurrencies() {
    this.getCurrencies();
    const obs$ = interval(600000);
    obs$.subscribe(() => this.getCurrencies())
  }
}
