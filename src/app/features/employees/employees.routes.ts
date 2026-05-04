import { Routes } from "@angular/router";

import { EmployeeList } from "./pages/employee-list/employee-list";
import { EmployeeForm } from "./pages/employee-form/employee-form";

export const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeeList
  },
  {
    path: 'add',
    component: EmployeeForm
  },
  {
    path: 'edit/:id',
    component: EmployeeForm
  },
];
