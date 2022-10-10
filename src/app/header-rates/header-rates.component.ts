import { Component, OnInit } from '@angular/core';
import { RatesApiService } from '../services/rates-api.service';

@Component({
  selector: 'app-header-rates',
  templateUrl: './header-rates.component.html',
  styleUrls: ['./header-rates.component.css']
})
export class HeaderRatesComponent implements OnInit {
  constructor(
    public ratesApiService: RatesApiService
  ) { }

  ngOnInit(): void {
    this.ratesApiService.refreshingGetCurrencies();
  }

}
