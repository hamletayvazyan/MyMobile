import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flickr, RequestParams} from "../_interfaces/flickr_photos";

import {environment} from '../../../environments/environment'

/*
* url to get api_key => https://www.flickr.com/services/api/explore/flickr.photos.search
*
* type something in TEXT field ex: qwerty and click the --> Call Method.. button
*
* after that you will get some URL where you have an api_key
*
* copy that key and set api_key variable value
*
* in /src/environment/environment.ts
*
* after clone use npm i
*
* ionic serve
* */
const api_key = environment.api_key;
const api_point = environment.api_point;
const apiUrl = `${api_point}${api_key}`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  searchPhotos(req: RequestParams): Observable<Flickr> {
    return this.httpClient.get<Flickr>(`${apiUrl}&text=${req.text}&format=json&extras=url_c,owner_name&page=${req.page}&per_page=${req.perPage}&nojsoncallback=1`);
  }
}
