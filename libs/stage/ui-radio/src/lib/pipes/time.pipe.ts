import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    const s = value % 60;
    const m = (value / 60) % 60;
    return `${m.toFixed()}:${s < 10 ? '0' : ''}${s.toFixed()}`;
  }
}
