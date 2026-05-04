import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPayslip } from '../../models/payslip';

@Component({
  selector: 'app-payslip-details',
  imports: [DatePipe],
  templateUrl: './payslip-details.html',
  styleUrl: './payslip-details.scss',
})
export class PayslipDetails implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  payslipId: WritableSignal<string> = signal('');
  payslip: WritableSignal<IPayslip> = signal({} as IPayslip);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.activatedRoute.data.subscribe({
      next: (res) => {
        this.payslip.set(res['payslipData'].data);
      }
    })
  }

  print() {
    window.print();
  }
}
