import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-karmafact',
  templateUrl: './karmafact.component.html',
  styleUrls: ['./karmafact.component.scss'],
})
export class KarmafactComponent implements OnInit {

  isToggled: boolean = true;
  title = 'RudraTech2014';
  constructor() { }

  ngOnInit(): void {
    this.isToggled = !this.isToggled;
  }

}
