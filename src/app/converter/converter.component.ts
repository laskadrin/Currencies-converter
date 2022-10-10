import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { RatesApiService } from '../services/rates-api.service';



@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  fakeArr = new Array(2);
  constructor(
    public ratesApiService: RatesApiService,

  ) { }

  ngOnInit(): void {
    this.ratesApiService.refreshingGetCurrencies();

  }


  selectSell = 'UAH';
  selectBuy = 'USD';
  inputSell: number = 0;
  inputBuy: number = 0;

  onSelectSell(event: any) {
    this.selectSell = event;
    this.sellToBuyCalculate()
  }
  onSelectBuy(event: any) {
    this.selectBuy = event;
    this.buyToSellCalculate();
  }
  onInputSell(event: any) {
    this.inputSell = parseFloat(event.target.value);
    this.sellToBuyCalculate()
  }
  onInputBuy(event: any) {
    this.inputBuy = parseFloat(event.target.value);
    this.buyToSellCalculate()
  }
  sellToBuyCalculate() {
    if (this.selectSell == 'UAH') {
      this.inputBuy = this.inputSell / (this.ratesApiService.rates[this.selectBuy])
    }
    if (this.selectSell == 'USD' || this.selectSell == 'EUR') {
      this.inputBuy = this.inputSell * this.ratesApiService.rates[this.selectSell] / this.ratesApiService.rates[this.selectBuy]
    }
  }
  buyToSellCalculate() {
    if (this.selectBuy == 'UAH') {
      this.inputSell = this.inputBuy / (this.ratesApiService.rates[this.selectSell])
    }
    if (this.selectBuy == 'USD' || this.selectBuy == 'EUR') {
      this.inputSell = this.inputBuy * this.ratesApiService.rates[this.selectBuy] / this.ratesApiService.rates[this.selectSell]
    }
  }

} 
