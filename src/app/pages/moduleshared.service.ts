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
  private _stockSalesList = new BehaviorSubject<any>(null);
  private _currentStock = new BehaviorSubject<any>(null);

  get salesState$() {
    return this._salesState.asObservable();
  }

  get currentStockItemState$() {
    return this._currentStockItemState.asObservable();
  }

  get stockItemList$() {
    return this._stockItemList.asObservable();
  }

  get stockSalesList$() {
    return this._stockSalesList.asObservable();
  }

  get currentStock$() {
    return this._currentStock.asObservable();
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

  setStockSalesListState(newState: any) {
    this._stockSalesList.next(newState);
  }

  setCurrentStockState(newState: any) {
    this._currentStock.next(newState);
  }
}
