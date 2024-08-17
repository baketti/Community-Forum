import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisHelperService {

  constructor() { }

  addXSpinnerIdHeader = (spinnerId: string) => {
    return {
      headers:{
        "X-Spinner-ID": spinnerId
      }
    }
  }
}
