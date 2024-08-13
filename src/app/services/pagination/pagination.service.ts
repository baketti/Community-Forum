import { Pagination } from '@/utils/types';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private _pagination = new BehaviorSubject<Pagination>({
    totalItems: 0,
    per_page: 0,
    page: 0
  });
  public readonly pagination$ = this._pagination.asObservable();

  public setPagination(totalItems: number, per_page: number, page:number) {
    const pagination = this._pagination.getValue();
    pagination.totalItems = totalItems;
    pagination.per_page = per_page;
    pagination.page = page;
    this._pagination.next(pagination);
  }

  public updatePagination(page: number, per_page: number) {
    const pagination = this._pagination.getValue();
    pagination.page = page;
    pagination.per_page = per_page;
    this._pagination.next(pagination);
  }

  public setPaginationAfterDelete() {
    const pagination = this._pagination.getValue();
    pagination.totalItems -= 1;
    this._pagination.next(pagination);
  }

  setPaginationAfterCreate() {
    const pagination = this._pagination.getValue();
    pagination.totalItems += 1;
    this._pagination.next(pagination);
  }

  constructor() { }
}
