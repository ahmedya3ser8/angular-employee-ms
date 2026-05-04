import { inject, Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

type Severity = 'success' | 'info' | 'warn' | 'error' | 'contrast' | 'secondary';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  showToast(severity: Severity, title: string, content: string) {
    this.messageService.add({
      severity: severity,
      summary: title,
      detail: content
    })
  }
}
