import { Injectable, effect, signal } from '@angular/core';
import { Toast } from '../interfaces/Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast = signal<Toast[]>([]);
  constructor() {

    effect(() => {
      if (this.toast().length > 0)
        setTimeout(() => this.toast.set([]), 5000)
    }, { allowSignalWrites: true })
  }
}
