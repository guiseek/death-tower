import { MatDialog } from '@angular/material/dialog';
import { TipsComponent } from './tips.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tip {
  id: string;
  title: string;
  description: string;
  image?: string;
}

@Injectable({ providedIn: 'platform' })
export class TipsService {
  private _tips = new Map<string, Tip>([]);

  private _tip = new BehaviorSubject<Tip | null>(null);
  private tip$ = this._tip.asObservable();

  constructor(private dialog: MatDialog) {
    this.tip$.subscribe((data) => {
      if (data) {
        const ref = this.dialog.open(TipsComponent, { data });
        ref.afterClosed().subscribe(() => this._tip.next(null));
      }
    });
  }

  setTips(tips: Tip[] = []) {
    tips.forEach((tip) => {
      this._tips.set(tip.id, tip);
    });
  }

  nextTip(tip: string) {
    const tipData = this._tips.get(tip);
    if (tipData) this._tip.next(tipData);
  }
}
