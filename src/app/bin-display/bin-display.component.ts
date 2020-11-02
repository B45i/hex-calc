import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bin-display',
  templateUrl: './bin-display.component.html',
  styleUrls: ['./bin-display.component.scss'],
})
export class BinDisplayComponent implements OnInit {
  @Input() bin = '0';
  private _binArray: Array<string>;

  get binArray(): Array<string> {
    if (!this.bin) {
      return;
    }
    this._binArray = this.bin.match(/.{1,8}/g);

    const lastItem = this._binArray.length - 1;
    if (this._binArray[lastItem].length < 8) {
      this._binArray[lastItem] =
        '0'.repeat(8 - this._binArray[lastItem].length) +
        this._binArray[lastItem];
    }

    return this._binArray;
  }

  constructor() {}

  ngOnInit(): void {}
}
