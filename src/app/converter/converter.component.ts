import { Component, OnInit } from '@angular/core';
import { RatesApiService } from '../services/rates-api.service';



@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css', './../app.component.css']
})
export class ConverterComponent implements OnInit {

  fakeArr = new Array(2);
  constructor(
    public ratesApiService: RatesApiService,

  ) { }

  ngOnInit(): void {

  }


  currencyToSell = 'UAH';
  currencyToBuy = 'USD';
  amountToSell: number = 0;
  amountToBuy: number = 0;

  onCurrencySellChange(event: any) {
    this.currencyToSell = event;
    this.sellToBuyCalculate()
  }
  onCurrencyBuyChange(event: any) {
    this.currencyToBuy = event;
    this.buyToSellCalculate();
  }
  onAmountSellChange(event: any) {
    this.amountToSell = parseFloat(event.target.value);
    this.sellToBuyCalculate()
  }
  onAmountBuyChange(event: any) {
    this.amountToBuy = parseFloat(event.target.value);
    this.buyToSellCalculate()
  }
  sellToBuyCalculate() {
    if (this.currencyToSell == 'UAH') {
      this.amountToBuy = this.amountToSell / (this.ratesApiService.rates.get(this.currencyToBuy))
    }
    if (this.currencyToSell == 'USD' || this.currencyToSell == 'EUR') {
      this.amountToBuy = this.amountToSell * this.ratesApiService.rates.get(this.currencyToSell) / this.ratesApiService.rates.get(this.currencyToBuy)
    }
  }
  buyToSellCalculate() {
    if (this.currencyToBuy == 'UAH') {
      this.amountToSell = this.amountToBuy / (this.ratesApiService.rates.get(this.currencyToSell))
    }
    if (this.currencyToBuy == 'USD' || this.currencyToBuy == 'EUR') {
      this.amountToSell = this.amountToBuy * this.ratesApiService.rates.get(this.currencyToBuy) / this.ratesApiService.rates.get(this.currencyToSell)
    }
  }

} 
