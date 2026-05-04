import { Component, forwardRef, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true
    }
  ],
})
export class Input implements ControlValueAccessor {
  id = input.required<string>();
  type = input<string>('text');
  label = input.required<string>();
  errors = input<{[key: string]: string}>({});
  control = input<AbstractControl | null>(null);
  placeholder = input<string>();

  value!: string;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  get objectKeys() {
    return Object.keys(this.errors());
  }
}
