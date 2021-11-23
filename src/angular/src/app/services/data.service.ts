import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/interfaces/item.interface';
import { API_URL } from '../app.constants';
import { mapDtoToItem } from '../shared/app.utils';
import { ItemDto } from '../models/dto/item.dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public fetchAll(): Observable<Item[]> {
    return this.http.get(API_URL).pipe(map((data: ItemDto[]) => data.map(mapDtoToItem)));
  }

}
