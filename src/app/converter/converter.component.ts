import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  usdRate: number = 0;
  eurRate: number = 0;
  ratesToShow: [string, string, string] = ['USD', 'EUR', 'UAH'];
  rates: { [name in string]: number } = {}
  fakeArr = new Array(2);
  constructor() { }

  ngOnInit(): void {
    this.getCurrencies();
    const obs$ = interval(600000);
    obs$.subscribe(() => this.getCurrencies())


  }

  async getCurrencies() {
    const responce = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
    const data = await responce.json();
    const currenciesInfo = await data;

    this.rates = {

      'EUR': currenciesInfo.find((currency: any) => currency.cc == 'USD').rate.toFixed(2),
      'USD': currenciesInfo.find((currency: any) => currency.cc == 'EUR').rate.toFixed(2),
      'UAH': 1
    }

  }
  selectSell = 'UAH';
  selectBuy = 'USD';
  inputSell: number = 0;
  inputBuy: number = 0;

  onSelectSell(event: any) {
    this.selectSell = event;
    this.leftRightCalculate()
  }
  onSelectBuy(event: any) {
    this.selectBuy = event;
    this.rightLeftCalculate();
  }
  onInputSell(event: any) {
    this.inputSell = parseFloat(event.target.value);
    this.leftRightCalculate()
  }
  onInputBuy(event: any) {
    this.inputBuy = parseFloat(event.target.value);
    this.rightLeftCalculate()
  }
  leftRightCalculate() {
    if (this.selectSell == 'UAH') {
      this.inputBuy = this.inputSell / (this.rates[this.selectBuy])
    }
    if (this.selectSell == 'USD' || this.selectSell == 'EUR') {
      this.inputBuy = this.inputSell * this.rates[this.selectSell] / this.rates[this.selectBuy]
    }
  }
  rightLeftCalculate() {
    if (this.selectBuy == 'UAH') {
      this.inputSell = this.inputBuy / (this.rates[this.selectSell])
    }
    if (this.selectBuy == 'USD' || this.selectBuy == 'EUR') {
      this.inputSell = this.inputBuy * this.rates[this.selectBuy] / this.rates[this.selectSell]
    }
  }

} 
