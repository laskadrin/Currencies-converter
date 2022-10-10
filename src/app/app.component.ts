import { Component } from '@angular/core';
import { RatesApiService } from './services/rates-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Currencies-converter';
  constructor(
    public ratesApiService: RatesApiService
  ) { }
  ngOnInit(): void {
    this.ratesApiService.refreshingGetCurrencies();

  }
}
