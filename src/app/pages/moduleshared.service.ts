// module-state.service.ts

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModuleStateService {
  private _salesState = new BehaviorSubject<any>(null);
  private _currentStockItemState = new BehaviorSubject<any>(null);
  private _stockItemList = new BehaviorSubject<any>(null);

  get salesState$() {
    return this._salesState.asObservable();
  }

  get currentStockItemState$() {
    return this._currentStockItemState.asObservable();
  }

  get stockItemList$() {
    return this._stockItemList.asObservable();
  }

  setSalesState(newState: any) {
    this._salesState.next(newState);
  }

  setCurrentStockItemState(newState: any) {
    this._currentStockItemState.next(newState);
  }

  setStockItemListState(newState: any) {
    this._stockItemList.next(newState);
  }
}
