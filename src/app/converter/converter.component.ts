import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  usdRate: number = 0;
  eurRate: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.getCurrencies();


  }

  async getCurrencies() {
    const responce = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
    const data = await responce.json();
    const currenciesInfo = await data;
    this.usdRate = currenciesInfo.find((currency: any) => currency.cc == 'USD').rate
    this.eurRate = currenciesInfo.find((currency: any) => currency.cc == 'EUR').rate
  }
  selectLeft = 'UAH';
  selectRight = 'USD';
  inputLeft: number = 0;
  inputRight: number = 0;

  onSelectLeft(event: any) {
    this.selectLeft = event;
  }
  onSelectRight(event: any) {
    this.selectRight = event;
  }
  onInputLeft(event: any) {
    this.inputLeft = parseFloat(event.target.value)
  }
  onInputRight(event: any) {
    this.inputRight = parseFloat(event.target.value)
  }

} 
