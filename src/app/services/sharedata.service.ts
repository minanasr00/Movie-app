import { Injectable,signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {
  dataSignal = signal<string>("");
  readonly data = this.dataSignal.asReadonly();

  constructor() { }


  setData(data: string) {
    this.dataSignal.set(data);
  }

}
