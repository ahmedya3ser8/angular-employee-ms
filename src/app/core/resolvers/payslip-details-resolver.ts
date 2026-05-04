import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { PayslipService } from '../../features/payslip/services/payslip';
import { IPayslipResponse } from '../../features/payslip/models/payslip';

export const payslipDetailsResolver: ResolveFn<IPayslipResponse> = (route, state) => {
  const payslipService = inject(PayslipService);
  return payslipService.getPayslip(route.paramMap.get('id') as string);
};
