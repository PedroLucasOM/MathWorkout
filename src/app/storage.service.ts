import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  quiz: any[] = [];

  constructor() { }
}
