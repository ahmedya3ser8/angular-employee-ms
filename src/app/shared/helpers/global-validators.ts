import { Validators } from "@angular/forms";

export const globalValidator = {
  email: [Validators.required, Validators.email],
  password: [Validators.required, Validators.minLength(6)],
  firstName: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
  lastName: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
  phoneNumber: [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
  bio: [Validators.maxLength(500)],
  department: [Validators.required],
  position: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
  basicSalary: [Validators.required],
  role: [Validators.required],
  type: [Validators.required],
  startDate: [Validators.required],
  endDate: [Validators.required],
  reason: [Validators.required],
  month: [Validators.required],
  year: [Validators.required],
  employee: [Validators.required],
  currentPassword: [Validators.required],
  newPassword: [Validators.required, Validators.minLength(6)],
}
