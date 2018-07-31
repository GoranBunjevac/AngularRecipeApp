import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  event: string;
  recipes: string;

  onReceivedRecipe(event: string) {
    this.recipes = event;
  }
  onReceivedShopping(event: string) {
    this.recipes = event;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAksvMMMExJ5o8JKyHtz8toG2-d7RuqSl8',
      authDomain: 'recipe-book-8d4ec.firebaseapp.com'
    });
  }

}
