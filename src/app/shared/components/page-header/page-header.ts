import { Component, input, output } from '@angular/core';
import { RouterLink } from "@angular/router";

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-page-header',
  imports: [RouterLink, NgIcon],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  title = input.required<string>();
  subTitle = input.required<string>();
  showAction = input<boolean>(false);
  buttonLink = input<string>();
  buttonText = input<string>();
  type = input<'link' | 'modal'>('link');

  openModal = output();
}
