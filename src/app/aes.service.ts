import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AesService {

  constructor() { }

  encrypt(value: string, key: string): string {
    return CryptoJS.AES.encrypt(value, key.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    // return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
