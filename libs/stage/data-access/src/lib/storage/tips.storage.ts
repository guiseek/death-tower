import { BehaviorSubject } from 'rxjs';

export interface Tip {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export class TipsStorage {
  static storageKey = 'tips';

  static value: Tip[] = [];

  onShow = new BehaviorSubject<Tip[]>([]);

  store(value: Tip) {
    try {
      localStorage.setItem(TipsStorage.storageKey, JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }

    this.onShow.next([value]);
  }

  getStoredValue(): Tip | null {
    try {
      const key = TipsStorage.storageKey;
      const obj = localStorage.getItem(key);
      return JSON.parse(`${obj}`);
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      localStorage.removeItem(TipsStorage.storageKey);
    } catch (err) {
      console.log(err);
    }
  }
}
