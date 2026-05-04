import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-portal',
  imports: [NgIcon, RouterLink],
  templateUrl: './portal.html',
  styleUrl: './portal.scss',
})
export class Portal {
  fullYear = new Date().getFullYear();
}
