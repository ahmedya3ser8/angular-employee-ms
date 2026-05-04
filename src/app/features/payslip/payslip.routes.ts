import { Routes } from "@angular/router";

import { Payslip } from "./pages/payslip/payslip";
import { PayslipDetails } from "./pages/payslip-details/payslip-details";
import { payslipDetailsResolver } from "../../core/resolvers/payslip-details-resolver";

export const payslipsRoutes: Routes = [
  {
    path: '',
    component: Payslip
  },
  {
    path: 'print/:id',
    component: PayslipDetails,
    resolve: { payslipData: payslipDetailsResolver }
  }
];
