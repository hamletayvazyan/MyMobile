import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flickr, RequestParams} from "../_interfaces/flickr_photos";

/*
* url to get api_key => https://www.flickr.com/services/api/explore/flickr.photos.search
*
* type something  example: qwerty in TEXT field and click the --> Call Method.. button
*
* after that you will get some URL where you have an api_key
*
* copy that key and set api_key variable value
* */
const api_key = '9369bd0daf6b359bd2205c952ccd7f99';
const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  searchPhotos(req: RequestParams): Observable<Flickr> {
    return this.httpClient.get<Flickr>(`${apiUrl}&text=${req.text}&format=json&extras=url_c,owner_name&page=${req.page}&per_page=${req.perPage}&nojsoncallback=1`);
  }
}
