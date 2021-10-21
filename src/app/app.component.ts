import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import firebase from 'firebase/app';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { StringFormat } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ref: AngularFireStorageReference;
  info: string;
  path: string;
  key: string;
  data: StringFormat;

  constructor(public auth: AngularFireAuth, private storage: AngularFireStorage, private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user != null) {
        this.path = 'data/' + user.uid + '/default';
        this.ref = this.storage.ref(this.path);
      } else {
        this.info = '';
        this.path = '';
      }
    })
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

  load() {
    if (this.key === '') {
      alert("Please enter valid PIN");
      return;
    }
    this.ref.getDownloadURL().toPromise().then(url => {
      this.httpClient.get(url, { responseType: 'text' }).subscribe((d: string) => {
        this.info = CryptoJS.AES.decrypt(d, this.key.trim()).toString(CryptoJS.enc.Utf8);
      })
    }).catch(e => console.log(e))
  }

  save() {
    if (!this.key) {
      alert("Please enter valid PIN");
      return;
    }
    this.storage.upload(this.path, new Blob([CryptoJS.AES.encrypt(this.info, this.key.trim()).toString()]));
  }

}
