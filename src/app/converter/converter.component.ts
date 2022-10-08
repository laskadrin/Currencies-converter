import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  usdRate: number = 0;
  eurRate: number = 0;
  rates: { [name in string]: number } = {}
  constructor() { }

  ngOnInit(): void {
    this.getCurrencies();

  }

  async getCurrencies() {
    const responce = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
    const data = await responce.json();
    const currenciesInfo = await data;
    this.rates = {
      'EUR': currenciesInfo.find((currency: any) => currency.cc == 'USD').rate,
      'USD': currenciesInfo.find((currency: any) => currency.cc == 'EUR').rate,
      'UAH': 1
    }

  }
  selectLeft = 'UAH';
  selectRight = 'USD';
  inputLeft: number = 0;
  inputRight: number = 0;

  onSelectLeft(event: any) {
    this.selectLeft = event;
    this.leftRightCalculate()
  }
  onSelectRight(event: any) {
    this.selectRight = event;
    this.rightLeftCalculate();
  }
  onInputLeft(event: any) {
    this.inputLeft = parseFloat(event.target.value);
    this.leftRightCalculate()
  }
  onInputRight(event: any) {
    this.inputRight = parseFloat(event.target.value)
    this.rightLeftCalculate()
  }
  leftRightCalculate() {
    if (this.selectLeft == 'UAH') {
      this.inputRight = this.inputLeft / (this.rates[this.selectRight])
    }
    if (this.selectLeft == 'USD' || this.selectLeft == 'EUR') {
      this.inputRight = this.inputLeft * this.rates[this.selectLeft] / this.rates[this.selectRight]
    }
  }
  rightLeftCalculate() {
    if (this.selectRight == 'UAH') {
      this.inputLeft = this.inputRight / (this.rates[this.selectLeft])
    }
    if (this.selectRight == 'USD' || this.selectRight == 'EUR') {
      this.inputLeft = this.inputRight * this.rates[this.selectRight] / this.rates[this.selectLeft]
    }
  }

} 
