import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item.model';

@Component({
  selector: 'app-menu-tile',
  templateUrl: './menu-tile.component.html',
  styleUrls: ['./menu-tile.component.css']
})
export class MenuTileComponent implements OnInit {

  @Input() item!: MenuItem;

  constructor() { }

  ngOnInit(): void {
  }

}
