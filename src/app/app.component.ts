import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  calcForm: FormGroup;

  get invalidDeci(): boolean {
    return this.calcForm.controls.dec.invalid;
  }

  get invalidHex(): boolean {
    return this.calcForm.controls.hex.invalid;
  }
  get invalidBin(): boolean {
    return this.calcForm.controls.bin.invalid;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.calcForm = this.fb.group({
      bin: ['', [Validators.pattern(/^[01]{1,64}$/)]],
      hex: ['', Validators.pattern(/^[0-9A-Fa-f]{1,64}$/)],
      dec: ['', Validators.pattern(/^[0-9]{1,64}$/)],
    });

    this.initSubscribers();
  }

  private initSubscribers(): void {
    this.calcForm.controls.dec.valueChanges.subscribe((x) => {
      if (this.calcForm.controls.dec.invalid || !x) {
        x = 0;
      }
      this.calcForm.patchValue(
        {
          bin: x.toString(2),
          hex: x.toString(16).toUpperCase(),
        },
        { emitEvent: false }
      );
    });

    this.calcForm.controls.bin.valueChanges.subscribe((x) => {
      if (this.calcForm.controls.bin.invalid || !x) {
        x = '0';
      }
      this.calcForm.patchValue(
        {
          dec: parseInt(x, 2).toString(10),
          hex: parseInt(x, 2).toString(16).toUpperCase(),
        },
        { emitEvent: false }
      );
    });

    this.calcForm.controls.hex.valueChanges.subscribe((x) => {
      if (this.calcForm.controls.hex.invalid || !x) {
        x = '0';
      }
      this.calcForm.patchValue(
        {
          dec: parseInt(x, 16).toString(10),
          bin: parseInt(x, 16).toString(2),
        },
        { emitEvent: false }
      );
    });
  }
}

//  Useful Functions
// function checkBin(n){return/^[01]{1,64}$/.test(n)}
// function checkDec(n){return/^[0-9]{1,64}$/.test(n)}
// function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
// function pad(s,z){s=""+s;return s.length<z?pad("0"+s,z):s}
// function unpad(s){s=""+s;return s.replace(/^0+/,'')}

// //Decimal operations
// function Dec2Bin(n){if(!checkDec(n)||n<0)return 0;return parseInt(n).toString(2)}
// function Dec2Hex(n){if(!checkDec(n)||n<0)return 0;return parseInt(n).toString(16)}

// //Binary Operations
// function Bin2Dec(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(10)}
// function Bin2Hex(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(16)}

// //Hexadecimal Operations
// function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}
// function Hex2Dec(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(10)}
