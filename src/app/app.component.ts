import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aircraft-queue';
  cargoSmall = [];
  cargoLarge = [];
  passengerSmall = [];
  passengerLarge = [];
  mergedQueue = [];
  showLastPlane = false;
  currentLaunch = {};
  select;
  selectSize;
  planeTypes = [
    { value: 'passenger', viewValue: 'passenger', asset: 'assets/cargo.png' },
    { value: 'cargo', viewValue: 'Cargo', asset: 'assets/cargo.png' }
  ];

  planeSize = [
    { value: 'large', viewValue: 'large' },
    { value: 'small', viewValue: 'small' }
  ];

  constructor() {}

  launch() {
    this.showLastPlane = true;
    this.currentLaunch = this.mergedQueue.shift();
    this.dequeue(this.currentLaunch);
  }

  dequeue(planeObject) {
    if (planeObject.type === 'cargo') {
      if (planeObject.size === 'small')
        this.cargoSmall.shift();
      else {
        this.cargoLarge.shift();
      }
    }
    else {
      if (planeObject.size === 'small')
        this.passengerSmall.shift();
      else {
        this.passengerLarge.shift();
      }
    }
  }

  enqueue(planeObject) {
    if (this.mergedQueue.length === 0){
      this.showLastPlane = false;
    }
    if (planeObject.type === 'cargo') {
      if (planeObject.size === 'small') {
          this.cargoSmall.push(planeObject);
      }
      else {
        this.cargoLarge.push(planeObject);
      }
    }
    else {
      if (planeObject.size === 'small')
        this.passengerSmall.push(planeObject);
      else {
        this.passengerLarge.push(planeObject);
      }
    }
    this.mergedQueue = [...this.passengerLarge, ...this.passengerSmall, ...this.cargoLarge, ...this.cargoSmall];
  }

  onSubmit(form) {
    if (this.mergedQueue.length === 0){
      this.currentLaunch = {};
    }
    this.enqueue({ type: this.select.value, size: this.selectSize, asset: this.select.asset, flightNumber: Math.floor(Math.random() * 100) })
    form.resetForm();
  }

}
