import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finder',
  templateUrl: './app-finder.component.html',
  styleUrls: ['./app-finder.component.scss'],
})
export class AppFinderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('AppFinderComponent');
  }

}
